import React, { useEffect, useState } from "react";

import { Divider, Flex, Spacing, Tabs } from "@sampled-ui/base";
import { useLocation, useNavigate } from "react-router";

import {
  useLoggedInQuery,
  useSavedArticlesLazyQuery,
  useViewedArticlesLazyQuery,
} from "../../../../generated/graphql";
import ArticleList from "../../components/Article/ArticleList";

interface CollectionPageProps {}

const CollectionPage: React.FC<CollectionPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(
    new URLSearchParams(location.search).get("tab") ?? "saved"
  );

  const { data: loggedInQueryData } = useLoggedInQuery();
  const [
    savedArticlesQuery,
    { data: savedArticlesQueryData, loading: loadingSavedArticles },
  ] = useSavedArticlesLazyQuery({ fetchPolicy: "cache-and-network" });
  const [
    viewedArticlesQuery,
    { data: viewedArticlesQueryData, loading: loadingViewedArticles },
  ] = useViewedArticlesLazyQuery({ fetchPolicy: "cache-and-network" });

  useEffect(() => {
    const loggedIn = !!loggedInQueryData?.loggedIn;
    if (loggedIn) {
      if (selected === "viewed") {
        viewedArticlesQuery();
      } else {
        savedArticlesQuery();
      }
    }
  }, [loggedInQueryData, savedArticlesQuery, selected, viewedArticlesQuery]);

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
          onSelect={(item) => {
            setSelected(item.key);
            navigate(`/collection?tab=${item.key}`, { replace: true });
          }}
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
