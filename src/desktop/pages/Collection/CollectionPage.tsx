import React, { useState } from "react";

import { Divider, Flex, Spacing, Tabs } from "@sampled-ui/base";
import {
  useSavedArticlesQuery,
  useViewedArticlesQuery,
} from "../../../../generated/graphql";
import ArticleList from "../../components/Article/ArticleList";

interface CollectionPageProps {}

const CollectionPage: React.FC<CollectionPageProps> = () => {
  const [selected, setSelected] = useState("saved");

  const { data: savedArticlesQueryData, loading: loadingSavedArticles } =
    useSavedArticlesQuery();
  const { data: viewedArticlesQueryData, loading: loadingViewedArticles } =
    useViewedArticlesQuery();
  if (loadingSavedArticles || loadingViewedArticles) {
    return <div>Loading...</div>;
  }
  if (
    (!savedArticlesQueryData?.savedArticles && selected === "saved") ||
    (!viewedArticlesQueryData?.viewedArticles && selected === "viewed")
  ) {
    return <div>No saved articles available</div>;
  }

  return (
    <Spacing gap="xl">
      <Flex
        direction="column"
        align="stretch"
        style={{ marginRight: "2rem", maxWidth: "70%", margin: "auto" }}
      >
        <Tabs
          items={[
            { key: "saved", title: "Gespeichert" },
            { key: "viewed", title: "Angesehen" },
          ]}
          selected={selected}
          onSelect={(item) => setSelected(item.key)}
        />
        <Divider
          style={{
            marginBottom: "2rem",
          }}
        />
        {selected === "saved" ? (
          <ArticleList articles={savedArticlesQueryData!.savedArticles!} />
        ) : null}
        {selected === "viewed" ? (
          <ArticleList articles={viewedArticlesQueryData!.viewedArticles!} />
        ) : null}
      </Flex>
    </Spacing>
  );
};

export default CollectionPage;
