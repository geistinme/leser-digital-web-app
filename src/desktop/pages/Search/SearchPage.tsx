import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Spacing } from "@sampled-ui/base"

import {
  ArticleGridFragment,
  SearchTermDocument,
  useSearchQuery,
  useSearchTermLazyQuery,
} from "../../../../generated/graphql"
import { useToggleSubscription } from "../../../shared/hooks/Subscription/toggleSubscription"
import SearchResults from "../../components/Search/SearchResults"
import SearchTerm from "../../components/Search/SearchTerm"

interface SearchPageProps {}

export const SearchPage: React.FC<SearchPageProps> = () => {
  const searchParam = new URLSearchParams(location.search).get("search")
  const termParam = new URLSearchParams(location.search).get("term")

  const { data: searchData, fetchMore } = useSearchQuery({
    variables: {
      query: searchParam ?? "",
      term: termParam ?? "",
      pagination: { offset: 0, limit: 10 },
    },
  })
  const [hasMoreResults, setHasMoreResults] = useState(true)

  useEffect(() => {
    if (searchParam || termParam) {
      setHasMoreResults(true)
    }
  }, [searchParam, termParam])

  const loadMoreResults = useCallback(() => {
    if (hasMoreResults) {
      fetchMore({
        variables: {
          query: searchParam,
          pagination: {
            offset: searchData?.search?.articles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.search?.articles?.length ?? 0) < 10) {
            setHasMoreResults(false)
          }
          if (
            prev.search?.articles &&
            fetchMoreResult.search?.articles &&
            (fetchMoreResult.search?.articles?.length ?? 0) > 0
          ) {
            const nextArticles = [
              ...(prev.search?.articles ?? []),
              ...fetchMoreResult.search.articles,
            ] as ArticleGridFragment[]
            const next = Object.assign({}, prev, {
              search: {
                articles: nextArticles,
                foundArticles: prev?.search?.foundArticles ?? 0,
                sources: prev?.search?.sources,
                foundSources: prev?.search?.foundSources ?? 0,
                topics: prev?.search?.topics,
                foundTopics: prev?.search?.foundTopics ?? 0,
              },
            })
            return next
          }
          return prev
        },
      })
    }
  }, [
    hasMoreResults,
    fetchMore,
    searchParam,
    searchData?.search?.articles?.length,
  ])

  const searchResults = useMemo(() => {
    return searchParam || termParam ? (
      <SearchResults
        articles={searchData?.search?.articles}
        sources={searchData?.search?.sources}
        topics={searchData?.search?.topics}
        {...{ loadMore: loadMoreResults, hasMore: hasMoreResults }}
      />
    ) : null
  }, [
    hasMoreResults,
    loadMoreResults,
    searchData?.search,
    searchParam,
    termParam,
  ])

  const [searchTerm, { data: searchTermData }] = useSearchTermLazyQuery({
    variables: { id: termParam ?? "", term: searchParam ?? "" },
  })

  useEffect(() => {
    if (searchParam || termParam) {
      searchTerm({ variables: { id: termParam, term: searchParam } })
    }
  }, [searchParam, searchTerm, termParam])

  const { handleToggle } = useToggleSubscription({
    createVariables: { termId: searchTermData?.searchTerm?.id },
    subscription: searchTermData?.searchTerm?.isSubscribed,
    refetchQueries: [SearchTermDocument],
  })

  return (
    <Spacing gap="xl">
      <Flex gap="xl" direction="column" align="stretch">
        <title>Suche</title>
        <SearchTerm
          handleToggle={handleToggle}
          search={searchData?.search}
          term={searchTermData?.searchTerm}
        />
        <Flex
          gap="xl"
          direction="column"
          align="stretch"
          style={{ width: "100%", maxWidth: "64rem", margin: "auto" }}
        >
          {searchResults}
        </Flex>
      </Flex>
    </Spacing>
  )
}

export default SearchPage
