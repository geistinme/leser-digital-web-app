import React from "react";

import { Card, Layout } from "@sampled-ui/base";
import { Outlet, useNavigate } from "react-router";

import { useLoggedInQuery } from "../../../../generated/graphql";
import { useIsMobile } from "../../hooks/isMobile";

export const Auth: React.FC = () => {
  const { isMobile } = useIsMobile();
  const navigate = useNavigate();
  const { data } = useLoggedInQuery();
  if (data?.loggedIn && data.loggedIn.verified) {
    navigate("/");
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Card
        style={{
          border: isMobile ? "initial" : undefined,
          width: isMobile ? "calc(100% - 4rem - 2px)" : "100%",
          maxWidth: isMobile ? "initial" : "20rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        innerProps={{ align: "center", justify: "center" }}
      >
        <Outlet />
      </Card>
    </Layout>
  );
};
