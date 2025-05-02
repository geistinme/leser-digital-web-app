import React, { useEffect } from "react";

import DesktopApp from "./desktop/App";
import MobileApp from "./mobile/App";
import { useIsDevice } from "./shared/hooks/isDevice";

const App: React.FC = () => {
  const { isMobile } = useIsDevice();
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0); // Force scroll to top
  }, []);

  return isMobile ? <MobileApp /> : <DesktopApp />;
};

export default App;
