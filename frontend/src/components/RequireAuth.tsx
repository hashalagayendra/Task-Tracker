import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get("/user/validate");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    ); // Or a proper spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
