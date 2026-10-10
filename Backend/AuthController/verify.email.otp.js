import { createHmac, timingSafeEqual } from "node:crypto";
import User from "../DBModels/StudentProfile.js";

const OTP_LENGTH = 6;

function hashOtp(otp) {
  const secret = process.env.EMAIL_OTP_SECRET;

  if (!secret) {
    throw new Error("EMAIL_OTP_SECRET is not configured.");
  }

  return createHmac("sha256", secret)
    .update(String(otp), "utf8")
    .digest("hex");
}

export async function verifyEmailOtp(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const otp = String(req.body.otp || "").trim();

    if (!email || !new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp)) {
      return res.status(400).json({
        success: false,
        message: "A valid email and 6-digit code are required.",
      });
    }

    const user = await User.findOne({ email }).select(
      "+emailVerification.otpHash",
    );

    const storedHash = user?.emailVerification?.otpHash;
    const expiresAt = user?.emailVerification?.expiresAt;

    if (
      !user ||
      user.isEmailVerified ||
      !storedHash ||
      !expiresAt ||
      new Date(expiresAt).getTime() <= Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Expired verification code.",
      });
    }

    const storedHashBuffer = Buffer.from(storedHash, "hex");
    const submittedHashBuffer = Buffer.from(hashOtp(otp), "hex");

    const hashesMatch =
      storedHashBuffer.length === submittedHashBuffer.length &&
      timingSafeEqual(storedHashBuffer, submittedHashBuffer);

    if (!hashesMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    user.isEmailVerified = true;
    user.emailVerification.otpHash = null;
    user.emailVerification.expiresAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
  
    });
  } catch (error) {
    next(error);
  }
}