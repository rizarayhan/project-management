import React, { useEffect, useState } from "react";
import isLoggedIn from "@/hooks/useAuth";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: React.ReactNode;
}
const PublicRoute = ({ children }: PublicRouteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await isLoggedIn();
      setLoggedIn(!!user);
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  if (isLoading) return null;

  if (loggedIn) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }
  return <>{children}</>;
};

export default PublicRoute;
