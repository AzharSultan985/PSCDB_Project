import {
  makeUploadName,
  storeUpload,
  validateUpload,
} from "../services/studentUpload.service.js";

export async function storeStudentProfileImage(user, file) {
  if (!file) return null;

  const image = await validateUpload(file, { imagesOnly: true });

  // Sab profile images isi folder mein save hongi.
  const folder = "profile-images";

  // Filename mein student ka naam, ID ke last 5 characters aur unique suffix hoga.
  const fileName = makeUploadName(
    "profile",
    user.fullName,
    user._id,
    image.extension,
  );

  const saved = await storeUpload(folder, fileName, image.buffer);
  const previousPath = user.profile?.profilePhoto?.filePath;

  user.profile = user.profile || {};
  user.profile.profilePhoto = {
    fileName: saved.fileName,
    filePath: saved.filePath,
    mimeType: image.mimeType,
    size: image.size,
  };

  return {
    fileName: saved.fileName,
    filePath: saved.filePath,
    absolutePath: saved.absolutePath,
    previousPath,
  };
}