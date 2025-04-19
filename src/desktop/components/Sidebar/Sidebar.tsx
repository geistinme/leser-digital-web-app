import React, { useMemo } from "react";

import {
  Flex,
  Navigation as NavigationMenu,
  Sidebar as SidebarComponent,
  Spacing,
  Typography,
} from "@sampled-ui/base";
import {
  Bookmark,
  CircleUserRound,
  Compass,
  GalleryVertical,
  Rss,
} from "lucide-react";
import { Location, useLocation, useNavigate } from "react-router";

import {
  useLoggedInQuery,
  useLogoutMutation,
} from "../../../../generated/graphql";
import SvgWordmarkLogo from "../../../icons/WordmarkLogo";

const useGetSelectedNavItem = (
  navItems: {
    key: string;
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[],
  location: Location
) => {
  return useMemo(() => {
    const path = location.pathname + location.hash;
    const selected =
      path !== "/"
        ? navItems.find((item) => item.key !== "/" && path.startsWith(item.key))
        : null;
    return selected?.key || "/";
  }, [navItems, location]);
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useLoggedInQuery();
  const [logout] = useLogoutMutation({
    refetchQueries: ["loggedIn"],
    onCompleted: () => {
      navigate("/");
      window.location.reload();
    },
  });

  const items = [
    {
      title: "Startseite",
      key: "/",
      icon: <GalleryVertical size={24} />,
      onClick: () => navigate("/"),
    },
    {
      title: "Entdecken",
      key: "/explore",
      icon: <Compass size={24} />,
      onClick: () => navigate("/explore"),
    },
    {
      title: "Gefolgt",
      key: "/following",
      icon: <Rss size={24} />,
      onClick: () => navigate("/following"),
    },
    {
      title: "Gespeichert",
      key: "/collection",
      icon: <Bookmark size={24} />,
      onClick: () => navigate("/collection"),
    },
    {
      title: "Account",
      key: "/me",
      icon: <CircleUserRound size={24} />,
      onClick: () => navigate("/me"),
    },
  ];

  const selected = useGetSelectedNavItem(items, location);

  return (
    <SidebarComponent style={{ width: "18rem", height: "100%" }}>
      <Spacing
        gap="lg"
        style={{
          padding: "2.5rem 1.5rem",
          paddingBottom: "2rem",
          width: "calc(100% - 3rem)",
        }}
      >
        <Flex align="center" gap="sm" style={{ width: "100%" }}>
          <SvgWordmarkLogo width="70%" height="100%" viewBox="0 0 586 160" />
        </Flex>
      </Spacing>
      <Flex
        direction="column"
        justify="between"
        align="stretch"
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationMenu
          items={items}
          selected={selected}
          style={{ paddingTop: "initial" }}
        />
        {data?.loggedIn ? (
          <Spacing gap="lg">
            <Typography.Text variant="danger" onClick={() => logout()} bold>
              Logout
            </Typography.Text>
          </Spacing>
        ) : null}
      </Flex>
    </SidebarComponent>
  );
};
