import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  Column,
  Divider,
  Flex,
  Row,
  Spacing,
  Tabs,
  Typography,
} from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import {
  ArticleFeedFragment,
  FeedQuery as FeedQueryType,
  MostInterestingArticlesQuery,
  useFeedLazyQuery,
  useLoggedInQuery,
  useMostInterestingArticlesLazyQuery,
} from "../../../../generated/graphql"
import { breakpoints, useIsDevice } from "../../../shared/hooks/isDevice"
import ArticleFeed from "../../components/Article/ArticleFeed"
import LoadingArticleFeed from "../../components/Article/LoadingArticleFeed"
import ExploreCallToAction from "../../components/CallToAction/ExploreCallToAction"
import LoggedOutCallToAction from "../../components/CallToAction/LoggedOutCallToAction"

export const HomePage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const [selectedTab, setSelectedTab] = useState(params.get("tab") || "all")
  const { isTablet, isDesktop } = useIsDevice()

  const { data: loggedInQueryData } = useLoggedInQuery()
  const [
    feedQuery,
    { data: feedQueryData, loading: loadingArticles, fetchMore: fetchMoreFeed },
  ] = useFeedLazyQuery()
  const [
    mostInterestingArticles,
    {
      data: mostInterestingArticlesData,
      loading: loadingInterestingArticles,
      fetchMore: fetchMoreMostInterestingArticles,
    },
  ] = useMostInterestingArticlesLazyQuery()

  useEffect(() => {
    const initialQueryVariables = {
      pagination: { offset: 0, limit: 10 },
      filter: {
        short:
          selectedTab === "breaking"
            ? true
            : selectedTab === "articles"
            ? false
            : undefined,
      },
    }
    if (loggedInQueryData?.loggedIn) {
      feedQuery({
        variables: initialQueryVariables,
        fetchPolicy: "network-only",
      })
      setHasMore(true)
    } else {
      mostInterestingArticles({
        variables: {
          pagination: { offset: 0, limit: 10 },
        },
      })
      setHasMore(true)
    }
  }, [feedQuery, loggedInQueryData, mostInterestingArticles, selectedTab])

  const [hasMore, setHasMore] = useState(true)
  const loadMore = useCallback(() => {
    const fetchMore = loggedInQueryData?.loggedIn
      ? fetchMoreFeed
      : fetchMoreMostInterestingArticles
    if (hasMore && !loadingArticles && !loadingInterestingArticles) {
      fetchMore({
        variables: {
          pagination: {
            offset: feedQueryData?.feed?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (
            ((
              (fetchMoreResult as FeedQueryType).feed ||
              (fetchMoreResult as MostInterestingArticlesQuery)
                .mostInterestingArticles
            )?.length ?? 0) < 10
          ) {
            setHasMore(false)
          }
          const prevFeed =
            (prev as FeedQueryType).feed ||
            (prev as MostInterestingArticlesQuery)?.mostInterestingArticles
          const newFeed =
            ((fetchMoreResult as FeedQueryType).feed ||
              (fetchMoreResult as MostInterestingArticlesQuery)
                .mostInterestingArticles) ??
            []
          if (
            prevFeed &&
            (fetchMoreResult as FeedQueryType).feed &&
            ((fetchMoreResult as FeedQueryType).feed?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              feed: [...prevFeed, ...newFeed] as ArticleFeedFragment[],
            })
          }
          return prev
        },
      })
    }
  }, [
    feedQueryData?.feed?.length,
    fetchMoreFeed,
    fetchMoreMostInterestingArticles,
    hasMore,
    loadingArticles,
    loadingInterestingArticles,
    loggedInQueryData?.loggedIn,
  ])

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const empty = useMemo(() => {
    if (
      ((!feedQueryData?.feed || feedQueryData.feed.length === 0) &&
        loggedInQueryData?.loggedIn &&
        !loadingArticles) ||
      ((!mostInterestingArticlesData?.mostInterestingArticles ||
        mostInterestingArticlesData?.mostInterestingArticles.length === 0) &&
        !loggedInQueryData?.loggedIn &&
        !loadingInterestingArticles)
    ) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine Artikel gefunden
        </Typography.Text>
      )
    } else {
      return null
    }
  }, [
    feedQueryData?.feed,
    loadingArticles,
    loadingInterestingArticles,
    loggedInQueryData?.loggedIn,
    mostInterestingArticlesData?.mostInterestingArticles,
  ])

  const loading = useMemo(() => {
    if (loadingArticles) {
      return <LoadingArticleFeed />
    } else {
      return null
    }
  }, [loadingArticles])

  const feed = useMemo(() => {
    if (feedQueryData?.feed?.length) {
      return <ArticleFeed articles={feedQueryData.feed} lastRef={ref} />
    } else if (
      !loggedInQueryData?.loggedIn &&
      mostInterestingArticlesData?.mostInterestingArticles?.length
    ) {
      return (
        <ArticleFeed
          articles={mostInterestingArticlesData.mostInterestingArticles}
          lastRef={ref}
        />
      )
    } else {
      return null
    }
  }, [
    feedQueryData?.feed,
    loggedInQueryData?.loggedIn,
    mostInterestingArticlesData?.mostInterestingArticles,
    ref,
  ])

  return (
    <Spacing gap="xl" style={{ maxWidth: breakpoints.desktop, margin: "auto" }}>
      <title>Startseite</title>
      <Row columns={isTablet ? 12 : 24}>
        <Column span={isTablet ? 12 : 17}>
          <Flex
            direction="column"
            align="stretch"
            style={{ marginRight: "2rem", maxWidth: "40rem", margin: "auto" }}
          >
            <Tabs
              onSelect={(item) => {
                navigate(`?tab=${item.key}`)
                setSelectedTab(item.key)
              }}
              selected={selectedTab}
              items={[
                { title: "Alles", key: "all" },
                { title: "Artikel", key: "articles" },
                { title: "Kurzmeldungen", key: "breaking" },
              ]}
            />
            <Divider
              style={{
                marginBottom: "2rem",
                width: isDesktop ? "calc(100% - 2rem)" : "100%",
              }}
            />
            {empty}
            {loading}
            {feed}
            {!hasMore ? (
              <Typography.Text disabled bold style={{ textAlign: "center" }}>
                Keine weiteren Artikel verfügbar.
              </Typography.Text>
            ) : null}
          </Flex>
        </Column>
        {isTablet ? null : (
          <Column span={7}>
            {loggedInQueryData ? (
              <ExploreCallToAction />
            ) : (
              <LoggedOutCallToAction />
            )}
          </Column>
        )}
      </Row>
    </Spacing>
  )
}
