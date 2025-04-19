import { useCallback, useEffect } from "react";

import { useLocation, useNavigate } from "react-router";

import { useLoggedInQuery } from "../../../../generated/graphql";

export const useAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useLoggedInQuery();

  useEffect(() => {
    window.onmessage = (e: MessageEvent) => {
      if (e.data === "REFRESHED_ACCESS_TOKEN") {
        refetch();
      }
    };
  }, [refetch]);

  return useCallback(() => {
    if ((!loading && !data?.loggedIn) || error) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/login");
    } else if (!loading && !data?.loggedIn?.verified) {
      localStorage.setItem("redirect", location.pathname);
      navigate("/auth/verify");
    }
  }, [data?.loggedIn, error, loading, location.pathname, navigate]);
};
