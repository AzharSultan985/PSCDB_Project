
import mongoose from "mongoose";


const storedFileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true, maxlength: 150 },
    mimeType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/webp"],
    },
    size: { type: Number, required: true, max: 2 * 1024 * 1024 },
    base64: { type: String, required: true, select: false },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    // Aapke existing authentication fields yahan rahenge:
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, trim: true, default: undefined },
    passwordHash: { type: String, required: true, select: false },

    isEmailVerified: { type: Boolean, default: false },
    isFreeze: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    emailVerification: {
      otpHash: { type: String, default: null, select: false },
      expiresAt: { type: Date, default: null, select: false },
      sentAt: { type: Date, default: null, select: false },
      attempts: { type: Number, default: 0, select: false },
    },

    profile: {
      age: { type: Number, min: 13, max: 100 },
      gender: {
        type: String,
        enum: ["female", "male", "prefer-not-to-say"],
        default: null,
      },
      profilePhoto: { type: storedFileSchema, default: undefined },

      location: {
        city: { type: String, trim: true, maxlength: 100, default: "" },
        district: { type: String, trim: true, maxlength: 100, default: "" },
        province: { type: String, trim: true, maxlength: 100, default: "" },
        country: { type: String, trim: true, default: "Pakistan" },
      },

      latestEducation: {
        level: { type: String, trim: true, maxlength: 100 },
        percentageMarks: { type: Number, min: 0, max: 100 },
        completionYear: { type: Number, min: 1950, max: 2100 },
        rollNumber: { type: String, trim: true, maxlength: 50 },
        // Document StudentDocument collection mein save hoga.
      },

      currentlyStudying: { type: Boolean, default: false },

      currentEducation: {
        level: { type: String, trim: true, maxlength: 100 },
        fieldOfStudy: { type: String, trim: true, maxlength: 120 },
        institution: { type: String, trim: true, maxlength: 150 },
        institutionCity: { type: String, trim: true, maxlength: 100 },
        rollNumber: { type: String, trim: true, maxlength: 50 },
        expectedCompletionYear: { type: Number, min: 2026, max: 2100 },
        // Current education ka document yahan nahi hai.
      },

      bio: { type: String, trim: true, maxlength: 500, default: "" },
      skills: [
        {
          name: { type: String, required: true, trim: true, maxlength: 60 },
          level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner",
          },
        },
      ],
      careerInterests: { type: [String], default: [] },
      visibility: {
        type: String,
        enum: ["private", "public"],
        default: "private",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, obj) {
        delete obj.passwordHash;
        return obj;
      },
    },
  },
);





userSchema.index(
  { phoneNumber: 1 },
  { unique: true, sparse: true },
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;