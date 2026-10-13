import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const StudentContext = createContext(undefined);
const BACKEND_URL = "http://localhost:3002";

export function StudentProvider({ children }) {
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false);

  const HandleStudent_Profile = useCallback(async (payload) => {
    setStudentLoading(true);

    try {
      const formData = new FormData();

      const {
        profilePhoto,
        latestEducationDocument,
        ...profileData
      } = payload;

      // File ko JSON mein nahi bhejna; document file alag field hai.
      formData.append("profile", JSON.stringify(profileData));

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      if (latestEducationDocument) {
        formData.append("latestEducationDocument", latestEducationDocument);
      }

      const response = await fetch(
        `${BACKEND_URL}/api/v1/lms/student/create-profile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        return {
          success: false,
          message: result.message || "Profile could not be saved.",
        };
      }

      setStudentProfile(result.data ?? profileData);

      return {
        success: true,
        message: result.message || "Student profile saved successfully.",
        data: result.data,
      };
    } catch (error) {
      console.error("Saving student profile failed:", error);

      return {
        success: false,
        message: "Could not connect to the server. Please try again.",
      };
    } finally {
      setStudentLoading(false);
    }
  }, []);









const fetchStudentProfile = useCallback(async () => {
  setStudentLoading(true);

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/lms/student/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      },
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success !== true) {
      return {
        success: false,
        message: result.message || "Could not load student profile.",
      };
    }

    setStudentProfile(result.data.student);

    return {
      success: true,
      data: result.data.student,
    };
  } catch (error) {
    console.error("Student profile request failed:", error);

    return {
      success: false,
      message: "Could not connect to the server.",
    };
  } finally {
    setStudentLoading(false);
  }
}, []);


  const value = useMemo(
    () => ({
      studentProfile,
      setStudentProfile,
      studentLoading,
      HandleStudent_Profile,fetchStudentProfile 
    }),
    [studentProfile, studentLoading, HandleStudent_Profile,fetchStudentProfile ],
  );

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);

  if (context === undefined) {
    throw new Error("useStudent must be used inside a StudentProvider.");
  }

  return context;
}