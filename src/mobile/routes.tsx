import { createBrowserRouter } from "react-router"

import { Auth, Private } from "../shared/components"
import {
  ForgotPasswordPage,
  LoginPage,
  SignupPage,
  VerifyPage,
} from "../shared/pages/Auth"

import { Page } from "./components/Page"
import { AboutPage } from "./pages/AboutPage"
import { AccountPage } from "./pages/Account/AccountPage"
import { CollectionPage } from "./pages/Collection/CollectionPage"
import { NotFoundPage } from "./pages/Error/404Page"
import { ExplorePage } from "./pages/Explore/ExplorePage"
import { FollowingPage } from "./pages/Following/FollowingPage"
import { HomePage } from "./pages/Home/HomePage"
import { SourcePage } from "./pages/Profile/SourceProfilePage"
import { TopicPage } from "./pages/Profile/TopicProfilePage"
import { ReaderPage } from "./pages/Reader/ReaderPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/following", element: <FollowingPage /> },
      { path: "/:source", element: <SourcePage /> },
      { path: "/t/:topic", element: <TopicPage /> },
      { path: "/read/:article", element: <ReaderPage /> },
      { path: "/collection", element: <CollectionPage /> },
      { path: "/me", element: <Private page={<AccountPage />} /> },
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
