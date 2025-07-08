import React, { useEffect, useRef } from "react"

import { Layout } from "@sampled-ui/base"
import { Outlet, useLocation, useNavigate } from "react-router"
import { hideSplashScreen } from "vite-plugin-splash-screen/runtime"

import { Role, useLoggedInQuery } from "../../../../generated/graphql"
import { Sidebar } from "../Sidebar"

export const Page: React.FC = () => {
  const navigate = useNavigate()
  const { data } = useLoggedInQuery()
  useEffect(() => {
    if (data?.loggedIn?.verified === false) {
      navigate("/auth/verify")
    }
    hideSplashScreen()
  }, [data?.loggedIn, data?.loggedIn?.verified, navigate])

  const location = useLocation()
  const inner = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
      window.scrollTo(0, 0)
    }

    if (inner.current) {
      inner.current.scrollTo(0, 0)
    }
  }, [location.pathname, inner])

  if (
    data?.loggedIn?.role !== Role.Admin &&
    location.pathname.startsWith("/admin")
  ) {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Layout
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Access Denied</h1>
        </Layout>
      </Layout>
    )
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout
        style={{
          height: "100%",
        }}
        ref={inner}
      >
        <Outlet />
      </Layout>
    </Layout>
  )
}
