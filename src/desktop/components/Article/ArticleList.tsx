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
  compact?: boolean
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, compact }) => {
  const { data: loggedInQueryData } = useLoggedInQuery()
  const { isExtraLargeDesktop } = useIsDevice()

  return (
    <Flex
      direction="column"
      gap="lg"
      style={{
        maxWidth: isExtraLargeDesktop && !compact ? "80%" : "100%",
        width: "100%",
        margin: compact ? undefined : "auto",
      }}
    >
      {articles?.map((article) => (
        <ArticlePost
          article={article}
          key={article.id}
          loggedIn={!!loggedInQueryData?.loggedIn}
          compact={compact}
          list
        />
      ))}
    </Flex>
  )
}

export default ArticleList
