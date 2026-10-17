import path from "node:path";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import User from "../DBModels/StudentProfile.js";

const uploadsDirectory = path.resolve(
  fileURLToPath(new URL("../uploads/", import.meta.url)),
);

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function getStudentProfilePhoto(req, res, next) {
  try {
    const student = await User.findById(req.user._id).select(
      "profile.profilePhoto",
    );

    const photo = student?.profile?.profilePhoto;
    const relativePath = photo?.filePath;

    if (!relativePath || !allowedMimeTypes.has(photo.mimeType)) {
      return res.status(404).json({
        success: false,
        message: "Profile photo not found.",
      });
    }

    // DB wala relative filePath uploads folder ke andar hi resolve hoga.
    const filePath = path.resolve(uploadsDirectory, relativePath);
    const pathFromUploadRoot = path.relative(uploadsDirectory, filePath);

    if (
      !pathFromUploadRoot ||
      pathFromUploadRoot.startsWith("..") ||
      path.isAbsolute(pathFromUploadRoot)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile photo path.",
      });
    }

    await access(filePath);

    res.set({
      "Content-Type": photo.mimeType,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    });

    return res.sendFile(filePath, (error) => {
      if (error && !res.headersSent) next(error);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).json({
        success: false,
        message: "Profile photo file not found.",
      });
    }

    next(error);
  }
}