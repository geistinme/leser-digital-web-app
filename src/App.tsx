import React from "react"

import moment from "moment"
// @ts-expect-error Cannot find type definition
import "moment/dist/locale/de"

import DesktopApp from "./desktop/App"
import MobileApp from "./mobile/App"
import { useIsDevice } from "./shared/hooks/isDevice"

const App: React.FC = () => {
  moment.locale("de")

  const { isMobile } = useIsDevice()
  
  return isMobile ? <MobileApp /> : <DesktopApp />
}

export default App
