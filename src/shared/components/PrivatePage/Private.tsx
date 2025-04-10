import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router";

import { useLoggedInQuery } from "../../../../generated/graphql";

interface PrivatePageProps {
  page: React.ReactNode;
}

export const Private: React.FC<PrivatePageProps> = ({ page }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useLoggedInQuery();

  useEffect(() => {
    if ((!loading && !data?.loggedIn) || error) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/login", { replace: true });
    } else if (!loading && !data?.loggedIn?.verified) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/verify", { replace: true });
    }
  }, [data?.loggedIn, error, loading, location.pathname, navigate]);

  return page;
};
