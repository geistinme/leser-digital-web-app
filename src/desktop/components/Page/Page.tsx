import React from "react";

import { Layout } from "@sampled-ui/base";
import { Outlet, useNavigate } from "react-router";

import { useLoggedInQuery } from "../../../../generated/graphql";
import { breakpoints } from "../../../shared/hooks/isDevice";
import { Sidebar } from "../Sidebar";

export const Page: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useLoggedInQuery();
  if (data?.loggedIn?.verified === false) {
    navigate("/auth/verify");
  }

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
