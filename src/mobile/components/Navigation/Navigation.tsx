import React, { useMemo } from "react"

import cn from "classnames"
import {
  Bookmark,
  CircleUserRound,
  Compass,
  GalleryVertical,
  Rss
} from "lucide-react"
import { Link, useLocation } from "react-router"

import styles from "./Navigation.module.scss"

const options = [
  {
    label: "Home",
    path: "/",
    icon: <GalleryVertical />,
  },
  { label: "Search", path: "/explore", icon: <Compass /> },
  { label: "Following", path: "/following", icon: <Rss /> },
  { label: "Saved", path: "/saved", icon: <Bookmark /> },
  { label: "Account", path: "/me", icon: <CircleUserRound /> },
]

const NavigationOption: React.FC<{
  option: { label: string; path: string; icon: React.ReactNode }
}> = ({ option }) => {
  const location = useLocation()
  const selected = useMemo(
    () =>
      option.path === "/"
        ? option.path === location.pathname
        : location.pathname.startsWith(option.path),
    [location.pathname, option.path]
  )
  return (
    <Link
      to={option.path}
      className={cn(styles.option, { [styles.selected]: selected })}
    >
      {option.icon}
      {/* <div className={styles.link}>{option.label}</div> */}
    </Link>
  )
}

export const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      {options.map((option) => {
        return <NavigationOption key={option.path} option={option} />
      })}
    </div>
  )
}
