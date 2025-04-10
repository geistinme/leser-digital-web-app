import React from "react";

import DesktopApp from "./desktop/App";
import MobileApp from "./mobile/App";
import { useIsMobile } from "./shared/hooks/isMobile";

const App: React.FC = () => {
  const { isMobile } = useIsMobile();
  return isMobile ? <MobileApp /> : <DesktopApp />;
};

export default App;
