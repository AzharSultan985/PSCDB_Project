import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Authentication
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: undefined,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

 
isEmailVerified: {
  type: Boolean,
  default: false,
},
isFreeze: {
  type: Boolean,
  default: false,
},



loginAttempts: {
  type: Number,
  default: 0,
},
lockUntil: {
  type: Date,
  default: null,
},
emailVerification: {
  otpHash: {
    type: String,
    default: null,
    select: false,
  },
  expiresAt: {
    type: Date,
    default: null,
    select: false,
  },
  sentAt: {
    type: Date,
    default: null,
    select: false,
  },
  attempts: {
    type: Number,
    default: 0,
    select: false,
  },
},







    // Student profile details
    profile: {
      bio: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "",
      },

      profileImageUrl: {
        type: String,
        trim: true,
        default: "",
      },

      location: {
        city: { type: String, trim: true, maxlength: 100, default: "" },
        province: { type: String, trim: true, maxlength: 100, default: "" },
        country: {
          type: String,
          trim: true,
          maxlength: 100,
          default: "Pakistan",
        },
      },

      education: [
        {
          institution: { type: String, trim: true, maxlength: 150 },
          qualification: { type: String, trim: true, maxlength: 120 },
          fieldOfStudy: { type: String, trim: true, maxlength: 120 },
          status: {
            type: String,
            enum: ["in-progress", "completed"],
            default: "in-progress",
          },
          startYear: { type: Number, min: 1950 },
          endYear: { type: Number, min: 1950 },
        },
      ],

      skills: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 60,
          },
          level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner",
          },
        },
      ],

      careerInterests: {
        type: [String],
        default: [],
      },






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
      transform(_document, returnedObject) {
        delete returnedObject.passwordHash;
        return returnedObject;
      },
    },
  },
);

userSchema.index(
  { phoneNumber: 1 },
  { unique: true, sparse: true },
);

const User = mongoose.model("User", userSchema);

export default User;