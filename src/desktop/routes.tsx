import { createBrowserRouter } from "react-router"

import { Private } from "../shared/components"
import { Auth } from "../shared/components/Auth/Auth"
import {
  ForgotPasswordPage,
  LoginPage,
  SignupPage,
  VerifyPage,
} from "../shared/pages/Auth"

import { Page } from "./components/Page"
import PageWithSearch from "./components/Page/PageWithSearch"
import { AboutPage } from "./pages/AboutPage"
import { AccountPage } from "./pages/Account/AccountPage"
import AdminPage from "./pages/AdminPage/AdminPage"
import { CollectionPage } from "./pages/Collection/CollectionPage"
import { NotFoundPage } from "./pages/Error/404Page"
import { ExplorePage } from "./pages/Explore/ExplorePage"
import { FollowingPage } from "./pages/Following/FollowingPage"
import SourcesOrTopicsPage from "./pages/Following/SourcesOrTopicsPage"
import { HomePage } from "./pages/Home/HomePage"
import { SourcePage } from "./pages/Profiles/SourceProfilePage"
import { TopicPage } from "./pages/Profiles/TopicProfilePage"
import { SearchPage } from "./pages/Search/SearchPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/:source",
        element: (
          <PageWithSearch>
            <SourcePage />
          </PageWithSearch>
        ),
      },
      {
        path: "/t/:topic",
        element: (
          <PageWithSearch>
            <TopicPage />
          </PageWithSearch>
        ),
      },
      { path: "/me", element: <Private page={<AccountPage />} /> },
      { path: "/collection", element: <Private page={<CollectionPage />} /> },
      { path: "/following", element: <Private page={<FollowingPage />} /> },
      { path: "/following/sources", element: <Private page={<SourcesOrTopicsPage />} /> },
      { path: "/following/topics", element: <Private page={<SourcesOrTopicsPage />} /> },
      {
        path: "/explore",
        element: (
          <PageWithSearch>
            <ExplorePage />
          </PageWithSearch>
        ),
      },
      {
        path: "/search",
        element: (
          <PageWithSearch>
            <SearchPage />
          </PageWithSearch>
        ),
      },
      { path: "/about", element: <AboutPage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/signup", element: <SignupPage /> },
      { path: "/auth/verify", element: <VerifyPage /> },
      { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
])
