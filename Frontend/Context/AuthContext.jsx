import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(undefined);
const BACKEND_URL = "http://localhost:3002";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);










  const handleRegister = useCallback(async (formData) => {
    setAuthLoading(true);
console.log(formData)
    try {
      // Confirm password sirf frontend validation ke liye hai.
      // Isay backend par send nahi karna.
      const { confirmPassword, ...registrationData } = formData;

      const response = await fetch(
        `${BACKEND_URL}/api/v1/auth/register-student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(registrationData),
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {


        return {
          success: false,
          message: result.message || "Registration failed. Please try again.",
        };
      }else{

console.log(result);
      // const userId = registeredUser?._id      
   
      return {
        success: true,
        message: result.message || "Registration successful.",
          data: result.data,

      };

      }

    } catch (error) {
      console.error("Registration request failed:", error);

      return {
        success: false,
        message: "Could not connect to the server. Please try again.",
      };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);









//send otp to backend


const HandleVerificationEmail_OTP=async (data)=>{
  try {
    setAuthLoading(true)
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/email-verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        },)


const result= res.json()
if (!res.ok) {
  return ({
    success:false,
    messgae:result.message || "Something went wrong!"
  })
}

return({
success:true,
message:result.message||"Email verification is successfully!"
})


  } catch (error) {
    console.log(error)
  }finally{
    setAuthLoading(false)
  }
}









  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authLoading,
      setUser,
      clearUser,
      handleRegister,HandleVerificationEmail_OTP
    }),
    [user, authLoading, clearUser, handleRegister],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}