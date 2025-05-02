import React from "react";

import { useAuthRedirect } from "./hooks";

interface PrivatePageProps {
  page: React.ReactNode;
}

export const Private: React.FC<PrivatePageProps> = ({ page }) => {
  const { redirect } = useAuthRedirect({ replace: true });
  redirect();

  return page;
};
