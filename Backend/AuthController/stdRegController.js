import argon2 from "argon2";
import User from "../DBModels/StudentProfile.js";
import { issueEmailVerificationOtp } from "../services/otp.service.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9]{7,15}$/;

export async function registerStudent(req, res) {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Input validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phoneNumber !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid registration details.",
      });
    }

    const fullName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phoneNumber.replace(/[\s()-]/g, "");

    if (fullName.length < 2 || fullName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters.",
      });
    }

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!phonePattern.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    // Frontend password rules ko backend par bhi enforce karo.
    const passwordIsValid =
      password.length >= 9 &&
      password.length <= 128 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!passwordIsValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet the security requirements.",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    }).lean();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Password database mein plaintext save nahi hota.
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    const user = await User.create({
      fullName,
      email: normalizedEmail,
      phoneNumber: normalizedPhone,
      passwordHash,
      role: "student",
      isEmailVerified: false,
    });



await issueEmailVerificationOtp(user);


    

    return res.status(201).json({
      success: true,
      message:
        "Account created. Email verification is required before login.",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
  } catch (error) {
    // Unique index ki race condition mein duplicate email ko handle karta hai.
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    console.error("Student registration failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to complete registration right now.",
    });
  }
}