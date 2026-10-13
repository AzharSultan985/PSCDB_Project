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




const [isAuthenticated, setIsAuthenticated] = useState(false);
const [authChecking, setAuthChecking] = useState(true);





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
    setUser(null);  setIsAuthenticated(false);

  }, []);









//send otp to backend


const HandleVerificationEmail_OTP = useCallback(async (data) => {
  setAuthLoading(true);

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v1/auth/email-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: result.message || `Verification failed (${res.status}).`,
      };
    }

    return {
      success: true,
      message: result.message || "Email verification was successful.",
      data: result.data,
    };
  } catch (error) {
    console.error("Email verification request failed:", error);

    return {
      success: false,
      message: "Could not connect to the server. Please try again.",
    };
  } finally {
    setAuthLoading(false);
  }
}, []);





const Handle_Resend_OTP = useCallback(async (email) => {
  setAuthLoading(true);

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v1/auth/resend-email-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }), 
      },
    );

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: result.message || `Resend failed (${res.status}).`,
      };
    }

    return {
      success: true,
      message: result.message || "A new code has been sent.",
    };
  } catch (error) {
    console.error("Resend OTP request failed:", error);
    return {
      success: false,
      message: "Could not connect to the server.",
    };
  } finally {
    setAuthLoading(false);
  }
}, []);












// login 




const checkSession = useCallback(async () => {
  setAuthChecking(true);

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    const result = await response.json().catch(() => ({}));
    const authenticated = response.ok && result.success === true;

    setIsAuthenticated(authenticated);
    return authenticated;
  } catch (error) {
    console.error("Session check failed:", error);
    setIsAuthenticated(false);
    return false;
  } finally {
    setAuthChecking(false);
  }
}, []);

const Handle_Login = useCallback(async (payload) => {
  setAuthLoading(true);

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/auth/student-login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || `Login failed (${response.status}).`,
      };
    }

    const sessionIsValid = await checkSession();

    if (!sessionIsValid) {
      return {
        success: false,
        message: "Login completed, but the session could not be verified.",
      };
    }

    return {
      success: true,
      message: result.message || "Login successful.",
    };
  } catch (error) {
    console.error("Login request failed:", error);

    return {
      success: false,
      message: "Could not connect to the server.",
    };
  } finally {
    setAuthLoading(false);
  }
}, [checkSession]);









const handleLogout = useCallback(async () => {
  setAuthLoading(true);

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success !== true) {
      return {
        success: false,
        message: result.message || "Logout failed. Please try again.",
      };
    }

    setIsAuthenticated(false);
    setUser(null);

    return {
      success: true,
      message: result.message || "Logged out successfully.",
    };
  } catch (error) {
    console.error("Logout request failed:", error);

    return {
      success: false,
      message: "Could not connect to the server.",
    };
  } finally {
    setAuthLoading(false);
  }
}, []);





  const value = useMemo(
  () => ({
    user,
    isAuthenticated,
    authChecking,
    authLoading,
    setUser,
    clearUser,
    checkSession,
    handleRegister,
    HandleVerificationEmail_OTP,
    Handle_Resend_OTP,
    Handle_Login,setAuthLoading,    handleLogout,

  }),
  [
    user,
    isAuthenticated,
    authChecking,
    authLoading,
    clearUser,
    checkSession,
    handleRegister,
    HandleVerificationEmail_OTP,
    Handle_Resend_OTP,
    Handle_Login,setAuthLoading,handleLogout
  ],
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