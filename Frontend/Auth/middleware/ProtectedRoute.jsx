import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, checkSession ,} = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    checkSession().finally(() => {
      if (isMounted) setChecking(false);
    });

    return () => {
      isMounted = false;
    };
  }, [checkSession]);

  if (checking) {
    return (
        <>
      <div className="grid min-h-screen place-items-center text-[#173A30]">
        Checking your session…
      </div>
         </>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/student-login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}