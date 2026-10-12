import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const StudentContext = createContext(undefined);

export function StudentProvider({ children }) {
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false);


  const BACKEND_URL = "http://localhost:3002";



  const HandleStudent_Profile = async (payload) => {
    try {
      setStudentLoading(true)
      const res = await fetch(`${BACKEND_URL}/api/v1/lms/student/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      )
      const result = await res.json()

      if (!res.ok) {
        return ({
          success: false,
          message: result.message
        })

      }
      return ({
        success: true,
        message: result.message
      })

    } catch (error) {
      console.log(error);

    } finally {
      setStudentLoading(false)
    }




  }















  const value = useMemo(
    () => ({
      studentProfile,
      setStudentProfile,
      studentLoading,
      setStudentLoading,
      HandleStudent_Profile,
    }),
    [studentProfile, studentLoading, HandleStudent_Profile],
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