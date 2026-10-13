import path from "node:path";
import { fileURLToPath } from "node:url";

import User from "../DBModels/StudentProfile.js";
import {
  badRequest,
  removeUpload,
} from "../services/studentUpload.service.js";
import { storeStudentProfileImage } from "./profileImage.controller.js";
import { storeLatestEducationDocument } from "./studentDocument.controller.js";

const CURRENT_YEAR = new Date().getFullYear();
const UPLOADS_DIR = path.resolve(
  fileURLToPath(new URL("../uploads/", import.meta.url)),
);

function requiredText(value, label, maxLength = 150) {
  if (typeof value !== "string" || !value.trim()) {
    throw badRequest(`${label} is required.`);
  }

  const cleaned = value.trim();

  if (cleaned.length > maxLength) {
    throw badRequest(`${label} must be ${maxLength} characters or fewer.`);
  }

  return cleaned;
}

function requiredNumber(value, label) {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw badRequest(`${label} is required.`);
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw badRequest(`${label} must be a valid number.`);
  }

  return number;
}

function parseProfile(req) {
  try {
    const profile = JSON.parse(req.body?.profile || "");

    if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
      throw new Error();
    }

    return profile;
  } catch {
    throw badRequest("Profile data must be valid JSON in the 'profile' field.");
  }
}

async function removePreviousUpload(relativePath) {
  if (!relativePath) return;

  const absolutePath = path.resolve(UPLOADS_DIR, relativePath);

  // Stored path ko uploads directory ke andar hi allow karo.
  if (!absolutePath.startsWith(`${UPLOADS_DIR}${path.sep}`)) {
    return;
  }

  await removeUpload(absolutePath);
}

export async function saveStudentProfile(req, res, next) {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Please log in to save your student profile.",
      });
    }

    const profileData = parseProfile(req);
    const studentId = req.user._id;

    const age = requiredNumber(profileData.age, "Age");
    if (!Number.isInteger(age) || age < 13 || age > 100) {
      throw badRequest("Age must be a whole number between 13 and 100.");
    }

    const percentageMarks = requiredNumber(
      profileData.latestEducation?.percentageMarks,
      "Latest education percentage marks",
    );

    if (percentageMarks < 0 || percentageMarks > 100) {
      throw badRequest("Percentage marks must be between 0 and 100.");
    }

    const completionYear = requiredNumber(
      profileData.latestEducation?.completionYear,
      "Latest education completion year",
    );

    if (
      !Number.isInteger(completionYear) ||
      completionYear < 1950 ||
      completionYear > CURRENT_YEAR
    ) {
      throw badRequest("Enter a valid latest education completion year.");
    }

    const fullName = requiredText(profileData.fullName, "Full name", 100);
    const province = requiredText(profileData.location?.province, "Province", 100);
    const district = requiredText(profileData.location?.district, "District", 100);
    const city = requiredText(profileData.location?.city, "City", 100);
    const educationLevel = requiredText(
      profileData.latestEducation?.level,
      "Latest education level",
      100,
    );
    const latestRollNumber = requiredText(
      profileData.latestEducation?.rollNumber,
      "Latest education roll number",
      50,
    );

    const allowedGenders = ["female", "male", "prefer-not-to-say"];
    const gender = profileData.gender || null;

    if (gender !== null && !allowedGenders.includes(gender)) {
      throw badRequest("Select a valid gender option.");
    }

    const currentlyStudying =
      profileData.currentlyStudying === true ||
      profileData.currentlyStudying === "true";

    let currentEducation = null;

    if (currentlyStudying) {
      const expectedCompletionYear = requiredNumber(
        profileData.currentEducation?.expectedCompletionYear,
        "Expected completion year",
      );

      if (
        !Number.isInteger(expectedCompletionYear) ||
        expectedCompletionYear < CURRENT_YEAR ||
        expectedCompletionYear > 2100
      ) {
        throw badRequest("Enter a valid expected completion year.");
      }

      currentEducation = {
        level: requiredText(
          profileData.currentEducation?.level,
          "Current education level",
          100,
        ),
        fieldOfStudy: requiredText(
          profileData.currentEducation?.fieldOfStudy,
          "Current field of study",
          120,
        ),
        institution: requiredText(
          profileData.currentEducation?.institution,
          "Current institution",
          150,
        ),
        institutionCity: requiredText(
          profileData.currentEducation?.institutionCity,
          "Institution city",
          100,
        ),
        rollNumber: requiredText(
          profileData.currentEducation?.rollNumber,
          "Current roll number",
          50,
        ),
        expectedCompletionYear,
      };
    }

    const user = await User.findById(studentId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account was not found.",
      });
    }

    const documentFile = req.files?.latestEducationDocument?.[0];
    const photoFile = req.files?.profilePhoto?.[0];

    // Separate controllers validate and store the uploaded files.
   const documentResult = await storeLatestEducationDocument({
  studentId: user._id,
  studentName: fullName,
  educationLevel,
  file: req.files?.latestEducationDocument?.[0],
});
    const photoResult = await storeStudentProfileImage(user, photoFile);

    user.fullName = fullName;
    user.profile = user.profile || {};
    user.profile.age = age;
    user.profile.gender = gender;

    user.profile.location = {
      ...(user.profile.location?.toObject?.() || user.profile.location || {}),
      province,
      district,
      city,
      country: "Pakistan",
    };

    // Document ka filePath StudentDocument collection mein hai.
    user.profile.latestEducation = {
      level: educationLevel,
      percentageMarks,
      completionYear,
      rollNumber: latestRollNumber,
    };

    user.profile.currentlyStudying = currentlyStudying;
    user.profile.currentEducation = currentlyStudying
      ? currentEducation
      : undefined;

    user.markModified("profile");
    await user.save();

    // Naya data save hone ke baad purani files remove karo.
    await Promise.all([
      removePreviousUpload(documentResult.previousPath),
      removePreviousUpload(photoResult?.previousPath),
    ]);

    return res.status(200).json({
      success: true,
      message: "Student profile and files saved successfully.",
      data: {
        studentId: user._id,
        profilePhoto:
          photoResult?.fileName ||
          user.profile.profilePhoto?.fileName ||
          null,
        educationDocument: documentResult.fileName,
      },
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}