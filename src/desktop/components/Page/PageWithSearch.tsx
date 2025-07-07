import React, { HTMLAttributes } from "react"

import SearchBar from "../Search/SearchBar"

interface PageWithSearchProps extends HTMLAttributes<HTMLDivElement> {}

const PageWithSearch: React.FC<PageWithSearchProps> = ({ children }) => {
  return (
    <div style={{ paddingTop: "6rem" }}>
      <SearchBar />
      {children}
    </div>
  )
}

export default PageWithSearch
