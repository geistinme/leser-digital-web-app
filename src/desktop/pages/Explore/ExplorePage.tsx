import React, { useCallback, useEffect, useState } from "react"

import { Flex, Spacing } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"

import { useMostInterestingArticlesQuery } from "../../../../generated/graphql"
import ArticleGrid from "../../components/Article/ArticleGrid"

export const ExplorePage: React.FC = () => {
  const { data: mostInterestingQueryData, fetchMore: fetchMoreSuggested } =
    useMostInterestingArticlesQuery()

  const [hasMoreSuggested, setHasMoreSuggested] = useState(true)

  const loadMoreSuggested = useCallback(() => {
    if (hasMoreSuggested) {
      fetchMoreSuggested({
        variables: {
          pagination: {
            offset: mostInterestingQueryData?.mostInterestingArticles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.mostInterestingArticles?.length ?? 0) < 10) {
            setHasMoreSuggested(false)
          }
          if (
            prev.mostInterestingArticles &&
            fetchMoreResult.mostInterestingArticles &&
            (fetchMoreResult.mostInterestingArticles?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              mostInterestingArticles: [
                ...prev.mostInterestingArticles,
                ...fetchMoreResult.mostInterestingArticles,
              ],
            })
          }
          return prev
        },
      })
    }
  }, [
    fetchMoreSuggested,
    hasMoreSuggested,
    mostInterestingQueryData?.mostInterestingArticles?.length,
  ])

  const { ref: lastSuggestedRef, inView: lastSuggestedRefInView } = useInView()
  useEffect(() => {
    if (lastSuggestedRefInView && hasMoreSuggested) {
      loadMoreSuggested()
    }
  }, [hasMoreSuggested, lastSuggestedRefInView, loadMoreSuggested])

  return (
    <Spacing gap="xl">
      <title>Entdecken</title>
      <Flex
        gap="xl"
        direction="column"
        align="stretch"
        style={{ width: "100%", maxWidth: "64rem", margin: "auto" }}
      >
        {mostInterestingQueryData?.mostInterestingArticles?.length ? (
          <ArticleGrid
            articles={mostInterestingQueryData.mostInterestingArticles}
            lastRef={lastSuggestedRef}
          />
        ) : null}
      </Flex>
    </Spacing>
  )
}
