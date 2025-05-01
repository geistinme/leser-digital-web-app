import { useCallback } from "react";

import { useLocation, useNavigate } from "react-router";

import { useLoggedInQuery } from "../../../../generated/graphql";

export const useAuthRedirect = (options?: { replace: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useLoggedInQuery();

  const redirect = useCallback(() => {
    if ((!loading && !data?.loggedIn) || error) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/login", { replace: options?.replace });
    } else if (!loading && !data?.loggedIn?.verified) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/verify", { replace: options?.replace });
    }
  }, [data?.loggedIn, error, loading, location.pathname, navigate, options]);

  return { redirect, loggedIn: data?.loggedIn, loading, error };
};
