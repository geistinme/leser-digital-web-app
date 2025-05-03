import React from "react";

import DesktopApp from "./desktop/App";
import MobileApp from "./mobile/App";
import { useIsDevice } from "./shared/hooks/isDevice";

const App: React.FC = () => {
  const { isMobile } = useIsDevice();

  return isMobile ? <MobileApp /> : <DesktopApp />;
};

export default App;
