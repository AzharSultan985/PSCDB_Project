import path from "node:path";
import sharp from "sharp";
import { PDFParse } from "pdf-parse";
import User from "../DBModels/StudentProfile.js";

import StudentDocument from "../DBModels/StudentDocument.js";

const TWO_MB = 2 * 1024 * 1024;
const CURRENT_YEAR = new Date().getFullYear();

const IMAGE_MIMES = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function cleanFileName(name = "upload") {
  // Windows aur Linux dono tarah ke path separators handle karta hai.
  const baseName = String(name).split(/[\\/]/).pop() || "upload";

  return path
    .basename(baseName)
    .replace(/[^\w.-]/g, "_")
    .slice(0, 150);
}

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

async function validateAndEncodeFile(file, { imagesOnly = false } = {}) {
  if (!file?.buffer?.length) {
    throw badRequest("Uploaded file is empty or unreadable.");
  }

  if (file.size > TWO_MB || file.buffer.length > TWO_MB) {
    throw badRequest("Each uploaded file must be 2 MB or smaller.");
  }

  const buffer = file.buffer;
  const isPdf = buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  let mimeType;

  if (isPdf) {
    if (imagesOnly) {
      throw badRequest("Profile photo must be a JPG, PNG or WEBP image.");
    }

    try {
      const parser = new PDFParse({
        data: new Uint8Array(buffer),
        partial: true,
        first: 1,
      });

      const extracted = await parser.GetText();
      const readableText = String(extracted?.text || "").replace(/\s/g, "");

      if (readableText.length < 3) {
        throw badRequest(
          "PDF has no extractable text. Upload a text-readable PDF or an image.",
        );
      }

      mimeType = "application/pdf";
    } catch (error) {
      if (error.statusCode === 400) {
        throw error;
      }

      throw badRequest("PDF could not be opened or read.");
    }
  } else {
    try {
      const image = sharp(buffer, {
        failOn: "error",
        limitInputPixels: 40_000_000,
      });

      const metadata = await image.metadata();
      mimeType = IMAGE_MIMES[metadata.format];

      if (!mimeType || !metadata.width || !metadata.height) {
        throw new Error("Unsupported image.");
      }

      // Image ko decode karke corrupt/truncated file reject karein.
      await sharp(buffer, {
        failOn: "error",
        limitInputPixels: 40_000_000,
      }).toBuffer();
    } catch {
      throw badRequest("File is not a readable JPG, PNG or WEBP image.");
    }
  }

  return {
    fileName: cleanFileName(file.originalname),
    mimeType,
    size: buffer.length,
    base64: buffer.toString("base64"),
  };
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

    const age = requiredNumber(profileData.age, "Age");
    if (!Number.isInteger(age) || age < 13 || age > 100) {
      throw badRequest("Age must be a whole number between 13 and 100.");
    }

    const marksValue = requiredNumber(
      profileData.latestEducation?.percentageMarks,
      "Latest education percentage marks",
    );

    if (marksValue < 0 || marksValue > 100) {
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

    const latestEducationDocumentFile =
      req.files?.latestEducationDocument?.[0];

    if (!latestEducationDocumentFile) {
      throw badRequest(
        "The latest completed education result card is required.",
      );
    }

    const currentlyStudying = profileData.currentlyStudying === true;

    let currentEducation;

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

    // Dono files DB changes se pehle validate hoti hain.
    const latestDocument = await validateAndEncodeFile(
      latestEducationDocumentFile,
    );

    const profilePhotoFile = req.files?.profilePhoto?.[0];
    const profilePhoto = profilePhotoFile
      ? await validateAndEncodeFile(profilePhotoFile, { imagesOnly: true })
      : undefined;

    const fullName = requiredText(profileData.fullName, "Full name", 100);
    const province = requiredText(
      profileData.location?.province,
      "Province",
      100,
    );
    const district = requiredText(
      profileData.location?.district,
      "District",
      100,
    );
    const city = requiredText(profileData.location?.city, "City", 100);

    const allowedGenders = [
      "female",
      "male",
      "prefer-not-to-say",
    ];

    const gender = profileData.gender || null;

    if (gender !== null && !allowedGenders.includes(gender)) {
      throw badRequest("Select a valid gender option.");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account was not found.",
      });
    }

    // User model ke profile path mein student ki profile details.
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

    // Is object mein document/base64 nahi rakha ja raha.
    user.profile.latestEducation = {
      level: requiredText(
        profileData.latestEducation?.level,
        "Latest education level",
        100,
      ),
      percentageMarks: marksValue,
      completionYear,
      rollNumber: requiredText(
        profileData.latestEducation?.rollNumber,
        "Latest education roll number",
        50,
      ),
    };

    user.profile.currentlyStudying = currentlyStudying;
    user.profile.currentEducation = currentlyStudying
      ? currentEducation
      : undefined;

    if (profilePhoto) {
      user.profile.profilePhoto = {
        fileName: profilePhoto.fileName,
        mimeType: profilePhoto.mimeType,
        size: profilePhoto.size,
        base64: profilePhoto.base64,
      };
    }

    await user.save();

    // Sirf previous/latest completed education ka document yahan save hoga.
    // Student ID hamesha protected request se aati hai, body se nahi.
    await StudentDocument.findOneAndUpdate(
      {
        studentId: user._id,
        documentType: "latest-education-result",
      },
      {
        $set: {
          studentId: user._id,
          documentType: "latest-education-result",
          fileName: latestDocument.fileName,
          mimeType: latestDocument.mimeType,
          fileSize: latestDocument.size,
          base64: latestDocument.base64,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Student profile saved successfully.",
      data: {
        studentId: user._id,
        fullName: user.fullName,
        profileSaved: true,
        currentlyStudying,
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