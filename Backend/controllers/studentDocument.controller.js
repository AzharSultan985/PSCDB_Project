import StudentDocument from "../DBModels/StudentDocument.js";
import {
  makeUploadName,
  removeUpload,
  storeUpload,
  studentFolderName,
  validateUpload,
} from "../services/studentUpload.service.js";

export async function storeLatestEducationDocument({
  studentId,
  studentName,
  educationLevel,
  file,
}) {
  if (!file) {
    const error = new Error("Latest completed education result card is required.");
    error.statusCode = 400;
    throw error;
  }

  const document = await validateUpload(file);
  const folder = `student-documents/${studentFolderName(
    studentName,
    studentId,
  )}`;
  const fileName = makeUploadName(
    `latest-education-${educationLevel}`,
    studentName,
    studentId,
    document.extension,
  );

  const saved = await storeUpload(folder, fileName, document.buffer);
  const previousDocument = await StudentDocument.findOne({
    studentId,
    documentType: "latest-education-result",
  });

  try {
    await StudentDocument.findOneAndUpdate(
      { studentId, documentType: "latest-education-result" },
      {
        $set: {
          studentId,
          documentType: "latest-education-result",
          fileName: saved.fileName,
          filePath: saved.filePath,
          mimeType: document.mimeType,
          fileSize: document.size,
        },
      },
      { upsert: true, new: true, runValidators: true },
    );
  } catch (error) {
    await removeUpload(saved.absolutePath);
    throw error;
  }

  return {
    fileName: saved.fileName,
    filePath: saved.filePath,
    absolutePath: saved.absolutePath,
    previousPath: previousDocument?.filePath || null,
  };
}