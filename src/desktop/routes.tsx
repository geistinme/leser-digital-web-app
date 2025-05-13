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
import { AboutPage } from "./pages/AboutPage"
import { AccountPage } from "./pages/Account/AccountPage"
import CollectionPage from "./pages/Collection/CollectionPage"
import NotFoundPage from "./pages/Error/404Page"
import { ExplorePage } from "./pages/Explore/ExplorePage"
import FollowingPage from "./pages/Following/FollowingPage"
import { HomePage } from "./pages/Home/HomePage"
import SourcePage from "./pages/Profiles/SourceProfilePage"
import TopicPage from "./pages/Profiles/TopicProfilePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/:source", element: <SourcePage /> },
      { path: "/t/:topic", element: <TopicPage /> },
      { path: "/me", element: <Private page={<AccountPage />} /> },
      { path: "/collection", element: <Private page={<CollectionPage />} /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/following", element: <Private page={<FollowingPage />} /> },
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
