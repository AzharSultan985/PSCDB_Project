import mongoose from "mongoose";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const studentDocumentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentType: {
      type: String,
      enum: ["latest-education-result"],
      required: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    mimeType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
    },
    fileSize: {
      type: Number,
      required: true,
      min: 1,
      max: MAX_FILE_SIZE,
    },
    base64: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Aik student ka aik latest result document; re-upload par record update hoga.
studentDocumentSchema.index(
  { studentId: 1, documentType: 1 },
  { unique: true },
);

export default mongoose.model("StudentDocument", studentDocumentSchema);