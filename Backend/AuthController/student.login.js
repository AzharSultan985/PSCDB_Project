import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../DBModels/StudentProfile.js";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 24 * 60 * 60 * 1000;
const ACCESS_TOKEN_TTL_MS = 15 * 60 * 1000;

function setAccessCookie(res, token) {
  res.cookie("pscdb_access", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_TTL_MS,
  });
}

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

    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET is not configured.");
    }

    const user = await User.findOne({ email }).select("+passwordHash +emailVerification.expiresAt" );

    if (!user || !user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const now = Date.now();
    const lockExpiry = user.lockUntil
      ? new Date(user.lockUntil).getTime(): 0;

    //Temporary 24-hour freeze expire ho gaya ho to unlock karein.
    if (user.isFreeze && lockExpiry > 0 && lockExpiry <= now) {
      user.isFreeze = false;
      user.lockUntil = null;
      user.loginAttempts = 0;
      await user.save();
    }

    // isFreeze without lockUntil ko manual/permanent freeze samjha gaya hai.
    if (user.isFreeze && (!lockExpiry || lockExpiry > now)) {
      return res.status(423).json({
        success: false,
        message: "Account is locked. Please contact support.",
      });
    }

    if (lockExpiry > now) {
      return res.status(423).json({
        success: false,
        message: "Account is temporarily locked. Please try again later.",
        retryAfter: Math.ceil((lockExpiry - now) / 1000),
      });
    }

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
        user.isFreeze = true;
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

    user.loginAttempts = 0;
    user.lockUntil = null;
    user.isFreeze = false;
    await user.save();

    const accessToken = jwt.sign(
      { sub: user._id.toString() },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
        issuer: "pscdb",
        audience: "pscdb-client",
      },
    );

    setAccessCookie(res, accessToken);

    return res.status(200).json({
      success: true,
      message: "Login successful."
    });
  } catch (error) {
    next(error);
  }
}