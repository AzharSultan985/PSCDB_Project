import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [AuthLoading, setAuthLoading] = useState(false);


const HandleRegister =(data)=>{
try {
  setAuthLoading(true)
console.log(data)
  const response = fetch(`${BACKEND_URL}/api/v1/auth/register-student`,{
    method:"post",
    headers:"application.json",
    body:data
  })
const result = response.json()
if (result.success) {
  console.log(result.message)
  
} else {
  console.log(result.message)
  
}

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
      setUser,
      clearUser: () => setUser(null),
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={HandleRegister}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}