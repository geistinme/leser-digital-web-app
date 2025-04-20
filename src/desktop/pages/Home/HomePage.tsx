import React from "react";

import { Column, Divider, Flex, Row, Spacing, Tabs } from "@sampled-ui/base";

import {
  useArticlesQuery,
  useLoggedInQuery,
} from "../../../../generated/graphql";
import { useIsDevice } from "../../../shared/hooks/isDevice";
import ArticleFeed from "../../components/Article/ArticleFeed";
import ExploreCallToAction from "../../components/CallToAction/ExploreCallToAction";
import LoggedOutCallToAction from "../../components/CallToAction/LoggedOutCallToAction";

export const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("all");
  const { isTablet, isDesktop } = useIsDevice();

  const { data: articlesQueryData, loading: loadingArticles } =
    useArticlesQuery();
  const { data: loggedInQueryData } = useLoggedInQuery();

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
            <ArticleFeed
              articles={articlesQueryData?.articles}
              loading={loadingArticles}
            />
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
