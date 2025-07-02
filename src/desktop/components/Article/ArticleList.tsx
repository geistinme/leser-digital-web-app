import React from "react"

import { Flex } from "@sampled-ui/base"

import {
  ArticleListFragment,
  useLoggedInQuery,
} from "../../../../generated/graphql"
import { ArticlePost } from "../../../shared/components"
import { useIsDevice } from "../../../shared/hooks/isDevice"


interface ArticleListProps {
  articles: ArticleListFragment[]
  noLogo?: boolean
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const { data: loggedInQueryData } = useLoggedInQuery()
  const { isExtraLargeDesktop } = useIsDevice()

  return (
    <Flex
      direction="column"
      gap="lg"
      style={{
        maxWidth: isExtraLargeDesktop ? "80%" : "100%",
        width: "100%",
        margin: "auto",
      }}
    >
      {articles?.map((article) => (
        <ArticlePost
          article={article}
          key={article.id}
          loggedIn={!!loggedInQueryData?.loggedIn}
          list
        />
      ))}
    </Flex>
  )
}

export default ArticleList
