import React from "react";

import { Button, Flex, Spacing } from "@sampled-ui/base";
import { useParams } from "react-router";

import { useSourceQuery } from "../../../../generated/graphql";
import ArticleGrid from "../../components/Article/ArticleGrid";
import { SourceShowcase } from "../../components/Source/SourceShowcase";

interface SourcePageProps {}

const SourcePage: React.FC<SourcePageProps> = () => {
  const { source } = useParams<{ source: string }>();

  const { data: sourceQueryData, loading: loadingSource } = useSourceQuery({
    variables: { key: source as string },
  });

  return (
    <Flex direction="column" align="center" style={{ width: "100%" }}>
      <title>{sourceQueryData?.source?.name}</title>
      {sourceQueryData?.source ? (
        <SourceShowcase source={sourceQueryData.source} />
      ) : null}
      <Spacing gap="xl">
        <Flex
          direction="column"
          align="center"
          gap="lg"
          style={{ marginRight: "2rem", maxWidth: "50rem", margin: "auto" }}
        >
          {sourceQueryData?.source?.id ? (
            <Button style={{ minWidth: "6rem" }}>Folgen</Button>
          ) : null}
          {sourceQueryData?.source?.articles ? (
            <ArticleGrid
              articles={sourceQueryData.source?.articles}
              loading={loadingSource}
            />
          ) : null}
        </Flex>
      </Spacing>
    </Flex>
  );
};

export default SourcePage;
