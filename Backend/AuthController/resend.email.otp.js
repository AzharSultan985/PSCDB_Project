import User from "../DBModels/StudentProfile.js";
import { issueEmailVerificationOtp } from "../services/otp.service.js";

export async function resendEmailVerificationOtp(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const user = await User.findOne({ email });

    // Same response rakhein taa-ke email registered hai ya nahi,
    // ye endpoint disclose na kare.
    if (!user || user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message:
          "If an unverified account exists for this email, a new code has been sent.",
      });
    }

    await issueEmailVerificationOtp(user);

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email.",
    });
  } catch (error) {
    next(error);
  }
}





