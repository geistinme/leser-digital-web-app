import React, { useEffect } from "react";

import { Layout } from "@sampled-ui/base";
import { Outlet, useNavigate } from "react-router";
import { hideSplashScreen } from "vite-plugin-splash-screen/runtime";

import { useLoggedInQuery } from "../../../../generated/graphql";
import { breakpoints } from "../../../shared/hooks/isDevice";
import { Sidebar } from "../Sidebar";

export const Page: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useLoggedInQuery();
  useEffect(() => {
    if (data?.loggedIn?.verified === false) {
      navigate("/auth/verify");
    }
    hideSplashScreen();
  }, [data?.loggedIn, data?.loggedIn?.verified, navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout
        style={{
          maxWidth: breakpoints.desktop,
          margin: "auto",
          height: "100%",
        }}
      >
        <Outlet />
      </Layout>
    </Layout>
  );
};
