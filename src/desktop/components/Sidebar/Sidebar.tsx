import React, { useMemo } from "react";

import {
  Button,
  Flex,
  Menu,
  Navigation as NavigationMenu,
  Sidebar as SidebarComponent,
  Spacing,
  Typography,
} from "@sampled-ui/base";
import {
  Bookmark,
  CircleUserRound,
  LayoutGrid,
  LogOut,
  MoreHorizontal,
  Rss,
  Search,
} from "lucide-react";
import { Location, useLocation, useNavigate } from "react-router";

import {
  useLoggedInQuery,
  useLogoutMutation,
} from "../../../../generated/graphql";

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
    }
  });

  const items = [
    {
      title: "Startseite",
      key: "/",
      icon: <LayoutGrid size={24} />,
      onClick: () => navigate("/"),
    },
    {
      title: "Entdecken",
      key: "/explore",
      icon: <Search size={24} />,
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
      key: "/saved",
      icon: <Bookmark size={24} />,
      onClick: () => navigate("/saved"),
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
    <SidebarComponent style={{ width: "20rem", height: "100%" }}>
      <Spacing gap="lg" style={{ padding: "2rem 1.5rem" }}>
        <Flex align="center" gap="sm">
          <img src="./react-logo.svg" style={{ width: "2rem" }} />
          <Typography.Heading level={4}>React App</Typography.Heading>
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
            <Menu
              items={[
                {
                  title: "Logout",
                  onClick: () => logout(),
                  icon: <LogOut size={16} />,
                },
              ]}
            >
              <Button
                variant="secondary"
                size="md"
                style={{
                  width: "calc(100% - 1.5rem)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MoreHorizontal />
              </Button>
            </Menu>
          </Spacing>
        ) : null}
      </Flex>
    </SidebarComponent>
  );
};
