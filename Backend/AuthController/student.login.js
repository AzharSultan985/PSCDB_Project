import argon2 from "argon2";
import User from "../DBModels/StudentProfile.js";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 24 * 60 * 60 * 1000;

export async function loginStudent(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = req.body.password;

    if (!email || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+passwordHash");

    // Generic response: account registered hai ya nahi, disclose na ho.
    if (!user || !user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    if (user.isFreeze) {
      return res.status(401).json({
        success: false,
        message: "Your acoount is locked. Please try later.",
      });
    }

    const now = Date.now();
    const lockExpiry = user.lockUntil
      ? new Date(user.lockUntil).getTime()
      : 0;

    if (lockExpiry > now) {
      return res.status(423).json({
        success: false,
        message: "Account is temporarily locked. Please try again later.",
        retryAfter: Math.ceil((lockExpiry - now) / 1000),
      });
    }

    // Purana lock expire ho gaya ho to attempts reset.
    if (user.lockUntil && lockExpiry <= now) {
      user.loginAttempts = 0;
      user.lockUntil = null;
    }

    const passwordIsValid = await argon2.verify(
      user.passwordHash,
      password,
    );

    if (!passwordIsValid) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
        user.isFreeze=true
        await user.save();

        return res.status(423).json({
          success: false,
          message: "Too many failed attempts. Account locked for 24 hours.",
        });
      }

      await user.save();

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        attemptsRemaining: MAX_LOGIN_ATTEMPTS - user.loginAttempts,
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Successful login par failed-attempt counter clear.
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login credentials verified.",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}