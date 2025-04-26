import React, { useEffect } from "react";

import { Card, Header, Layout } from "@sampled-ui/base";
import { Outlet, useNavigate } from "react-router";
import { hideSplashScreen } from "vite-plugin-splash-screen/runtime";

import { useLoggedInQuery } from "../../../../generated/graphql";
import SvgWordmarkLogo from "../../../icons/WordmarkLogo";
import { useIsDevice } from "../../hooks/isDevice";

export const Auth: React.FC = () => {
  const { isMobile } = useIsDevice();
  const navigate = useNavigate();
  const { data } = useLoggedInQuery();

  useEffect(() => {
    if (data?.loggedIn && data.loggedIn.verified) {
      const redirect = localStorage.getItem("redirect");
      if (redirect) {
        localStorage.removeItem("redirect");
        navigate(redirect, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
    hideSplashScreen();
  }, [data?.loggedIn, navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <SvgWordmarkLogo
          width="100%"
          height="calc(100% - 2rem)"
          viewBox="0 0 586 160"
          style={{ marginTop: "0.25rem" }}
        />
      </Header>
      <Card
        style={{
          border: isMobile ? "initial" : undefined,
          width: isMobile ? "calc(100% - 4rem - 2px)" : "100%",
          maxWidth: isMobile ? "initial" : "24rem",
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
