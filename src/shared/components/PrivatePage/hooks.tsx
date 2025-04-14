import { useCallback } from "react";

import { useLocation, useNavigate } from "react-router";

import { useLoggedInQuery } from "../../../../generated/graphql";

export const useAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useLoggedInQuery();

  return useCallback(() => {
    if ((!loading && !data?.loggedIn) || error) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/login", { replace: true });
    } else if (!loading && !data?.loggedIn?.verified) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/verify", { replace: true });
    }
  }, [data?.loggedIn, error, loading, location.pathname, navigate]);
};
