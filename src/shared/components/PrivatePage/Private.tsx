import React from "react";

import { useAuthRedirect } from "./hooks";

interface PrivatePageProps {
  page: React.ReactNode;
}

export const Private: React.FC<PrivatePageProps> = ({ page }) => {
  const { redirect, loggedIn } = useAuthRedirect({ replace: true });
  redirect();

  if(!loggedIn) {
    return null;
  }
  
  return page;
};
