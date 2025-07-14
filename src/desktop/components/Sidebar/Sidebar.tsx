import React, { useMemo } from "react"

import {
  Card,
  Flex,
  Menu,
  Navigation as NavigationMenu,
  Sidebar as SidebarComponent,
  Spacing,
  Typography,
} from "@sampled-ui/base"
import {
  Bookmark,
  CircleUserRound,
  Compass,
  GalleryVertical,
  Menu as MenuIcon,
  Rss,
  Settings,
} from "lucide-react"
import { Location, useLocation, useNavigate } from "react-router"

import {
  Role,
  useLoggedInQuery,
  useLogoutMutation,
} from "../../../../generated/graphql"
import SvgWordmarkLogo from "../../../icons/WordmarkLogo"

import styles from "./Sidebar.module.scss"

const useGetSelectedNavItem = (
  navItems: {
    key: string
    title: string
    icon: React.ReactNode
    onClick: () => void
  }[],
  location: Location
) => {
  return useMemo(() => {
    const path = location.pathname + location.hash
    const selected =
      path !== "/"
        ? navItems.find((item) => item.key !== "/" && path.startsWith(item.key))
            ?.key
        : "/"
    return selected
  }, [navItems, location])
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { data } = useLoggedInQuery()
  const [logout] = useLogoutMutation({
    refetchQueries: ["loggedIn"],
    onCompleted: () => {
      navigate("/")
      window.location.reload()
    },
  })

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
      title: "Abonnements",
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
  ]
  if (data?.loggedIn && data.loggedIn.role === Role.Admin) {
    items.push({
      title: "Admin",
      key: "/admin",
      icon: <Settings size={24} />,
      onClick: () => navigate("/admin"),
    })
  }

  const selected = useGetSelectedNavItem(items, location)

  return (
    <SidebarComponent style={{ width: "18rem", height: "100%", border: "initial" }}>
      <Spacing
        gap="lg"
        style={{
          padding: "2.5rem 1.5rem",
          paddingBottom: "2rem",
          width: "calc(100% - 3rem)",
        }}
      >
        <Flex align="center" gap="sm" style={{ width: "100%" }}>
          <SvgWordmarkLogo width="80%" height="100%" viewBox="0 0 586 160" />
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
          <Spacing gap="sm">
            <Menu
              items={[
                {
                  title: "Settings",
                  key: "settings",
                  onClick: () => navigate("/settings"),
                },
                {
                  title: "Logout",
                  key: "logout",
                  danger: true,
                  onClick: () => logout(),
                },
              ]}
            >
              <Card className={styles.menu}>
                <Flex gap="md">
                  <MenuIcon size={24} />
                  <Typography.Text size="md">More</Typography.Text>
                </Flex>
              </Card>
            </Menu>
          </Spacing>
        ) : null}
        {/* {data?.loggedIn ? <Spacing gap="lg"></Spacing> : null} */}
      </Flex>
    </SidebarComponent>
  )
}
