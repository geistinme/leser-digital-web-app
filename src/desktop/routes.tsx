import { createBrowserRouter } from "react-router";

import { Private } from "../shared/components";
import { Auth } from "../shared/components/Auth/Auth";
import {
  ForgotPasswordPage,
  LoginPage,
  SignupPage,
  VerifyPage,
} from "../shared/pages/Auth";

import { Page } from "./components/Page";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import CollectionPage from "./pages/Collection/CollectionPage";
import NotFoundPage from "./pages/Error/404Page";
import { ExplorePage } from "./pages/ExplorePage";
import { HomePage } from "./pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/collection", element: <Private page={<CollectionPage />} /> },
      { path: "/explore", element: <ExplorePage /> },
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
]);
