import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  Column,
  Divider,
  Flex,
  Progress,
  Row,
  Spacing,
  Tabs,
  Typography,
} from "@sampled-ui/base";
import { useInView } from "react-intersection-observer";

import {
  ArticleFeedFragment,
  useArticlesQuery,
  useLoggedInQuery,
} from "../../../../generated/graphql";
import { useIsDevice } from "../../../shared/hooks/isDevice";
import ArticleFeed from "../../components/Article/ArticleFeed";
import LoadingArticleFeed from "../../components/Article/LoadingArticleFeed";
import ExploreCallToAction from "../../components/CallToAction/ExploreCallToAction";
import LoggedOutCallToAction from "../../components/CallToAction/LoggedOutCallToAction";

export const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("all");
  const { isTablet, isDesktop } = useIsDevice();

  const { data: loggedInQueryData } = useLoggedInQuery();
  const {
    data: articlesQueryData,
    loading: loadingArticles,
    fetchMore,
  } = useArticlesQuery({
    variables: { pagination: { offset: 0, limit: 10 } },
    notifyOnNetworkStatusChange: true,
  });

  const [hasMore, setHasMore] = useState(true);
  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchMore({
        variables: {
          pagination: {
            offset: articlesQueryData?.articles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.articles?.length ?? 0) < 10) {
            setHasMore(false);
          }
          if (
            prev.articles &&
            fetchMoreResult.articles &&
            (fetchMoreResult.articles?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              articles: [
                ...prev.articles,
                ...fetchMoreResult.articles,
              ] as ArticleFeedFragment[],
            });
          }
          return prev;
        },
      });
    }
  }, [articlesQueryData?.articles?.length, fetchMore, hasMore]);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [hasMore, inView, loadMore]);

  const empty = useMemo(() => {
    if (
      (!articlesQueryData?.articles ||
        articlesQueryData.articles.length === 0) &&
      !loadingArticles
    ) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine Artikel gefunden
        </Typography.Text>
      );
    } else {
      return null;
    }
  }, [articlesQueryData?.articles, loadingArticles]);

  const loading = useMemo(() => {
    if (loadingArticles) {
      return <LoadingArticleFeed />;
    } else {
      return null;
    }
  }, [loadingArticles]);

  const feed = useMemo(() => {
    if (articlesQueryData?.articles?.length) {
      return <ArticleFeed articles={articlesQueryData.articles} />;
    } else {
      return null;
    }
  }, [articlesQueryData?.articles]);

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
              onSelect={(item) => setSelectedTab(item.key)}
              selected={selectedTab}
              items={[
                { title: "Alles", key: "all" },
                { title: "News", key: "news" },
                { title: "Politik", key: "politics" },
                { title: "Technologie", key: "technology" },
                { title: "Finanzen", key: "finance" },
                { title: "Kultur", key: "culture" },
                { title: "Sport", key: "sports" },
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
            {feed && hasMore ? (
              <Progress
                loading={loadingArticles}
                done={!loadingArticles}
                ref={ref as unknown as React.RefObject<HTMLDivElement>}
              />
            ) : null}
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
  );
};
