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
  useFeedLazyQuery,
  useLoggedInQuery,
} from "../../../../generated/graphql"
import { useIsDevice } from "../../../shared/hooks/isDevice"
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
    { data: feedQueryData, loading: loadingArticles, fetchMore },
  ] = useFeedLazyQuery()
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
    } else {
      feedQuery({
        variables: initialQueryVariables,
      })
    }
  }, [feedQuery, loggedInQueryData, selectedTab])

  const [hasMore, setHasMore] = useState(true)
  const loadMore = useCallback(() => {
    if (hasMore && !loadingArticles) {
      fetchMore({
        variables: {
          pagination: {
            offset: feedQueryData?.feed?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.feed?.length ?? 0) < 10) {
            setHasMore(false)
          }
          if (
            prev.feed &&
            fetchMoreResult.feed &&
            (fetchMoreResult.feed?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              feed: [
                ...prev.feed,
                ...fetchMoreResult.feed,
              ] as ArticleFeedFragment[],
            })
          }
          return prev
        },
      })
    }
  }, [feedQueryData?.feed?.length, fetchMore, hasMore, loadingArticles])

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const empty = useMemo(() => {
    if (
      (!feedQueryData?.feed || feedQueryData.feed.length === 0) &&
      !loadingArticles
    ) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine Artikel gefunden
        </Typography.Text>
      )
    } else {
      return null
    }
  }, [feedQueryData?.feed, loadingArticles])

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
    } else {
      return null
    }
  }, [feedQueryData?.feed, ref])

  return (
    <Spacing gap="xl">
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
