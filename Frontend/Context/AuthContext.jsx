import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./Alert";

const AuthContext = createContext(undefined);
const BACKEND_URL = "http://localhost:3002";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

const navigate= useNavigate()


const { showAlert } = useAlert();







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

      if (!response.success) {

showAlert({
  type: "warning",
    message:result.message,
});

        return {
          success: false,
          message: result.message || "Registration failed. Please try again.",
        };
      }
console.log(result);


showAlert({
  type: "success",
    message:result.message,
});
     const registeredUser = result.data?.user ?? result.data;
      const userId = registeredUser?._id 
      
     navigate(`otp-verification`,{
      state:{email:registeredUser.email}
     })



      return {
        success: true,
        message: result.message || "Registration successful.",
        data: result.data,
      };
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

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authLoading,
      setUser,
      clearUser,
      handleRegister,
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