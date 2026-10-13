import User from "../DBModels/StudentProfile.js";

export async function getStudentProfile(req, res, next) {
  try {
    const student = await User.findById(req.user._id).select(
      [
        "_id",
        "fullName",
        "email",
        "phoneNumber",
        "age",
        "gender",
        "profilePhoto",
        "location",
        "latestEducation",
        "currentlyStudying",
        "currentEducation",
        "profile",
        "createdAt",
        "updatedAt",
      ].join(" "),
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found.",
      });
    }

    const hasProfilePhoto = Boolean(
      student.profilePhoto?.fileName ||
        student.profilePhoto?.storageName ||
        student.profilePhoto?.path,
    );

    const studentData = {
      id: student._id,
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      age: student.age,
      gender: student.gender,
      location: student.location,
      latestEducation: student.latestEducation,
      currentlyStudying: student.currentlyStudying,
      currentEducation: student.currentEducation,
      profile: student.profile,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,

      profilePhotoUrl: hasProfilePhoto
        ? `${process.env.API_BASE_URL || "http://localhost:3002"}/api/v1/lms/student/profile-photo`
        : null,
    };

    return res.status(200).json({
      success: true,
      data: { student: studentData },
    });
  } catch (error) {
    next(error);
  }
}