import jwt from "jsonwebtoken";
import User from "../DBModels/StudentProfile.js";

export async function protected_Middleware(req, res, next) {
  try {
    const token = req.cookies?.pscdb_access;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to continue.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      issuer: "pscdb",
      audience: "pscdb-client",
    });

    const user = await User.findById(decoded.sub).select(
      "_id fullName email phoneNumber isEmailVerified isFreeze lockUntil",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid login session.",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email to continue.",
      });
    }

    const lockExpiry = user.lockUntil
      ? new Date(user.lockUntil).getTime()
      : 0;

    const temporaryLockActive = lockExpiry > Date.now();
    const permanentFreeze = user.isFreeze && !user.lockUntil;

    if (temporaryLockActive || permanentFreeze) {
      return res.status(423).json({
        success: false,
        message: "This account is currently locked.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Your session is invalid or has expired. Please log in again.",
      });
    }

    next(error);
  }
}