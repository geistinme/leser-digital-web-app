import React from "react";

import {
  Column,
  Divider,
  Flex,
  Row,
  Spacing,
  Typography,
} from "@sampled-ui/base";

import {
  useArticlesQuery,
  useLoggedInQuery,
} from "../../../../generated/graphql";
import { useIsDevice } from "../../../shared/hooks/isDevice";
import ArticleFeed from "../../components/Article/ArticleFeed";
import LoggedOutCallToAction from "../../components/CallToAction/LoggedOutCallToAction";

export const HomePage: React.FC = () => {
  const { data: articlesQueryData } = useArticlesQuery();
  const { data: loggedInQueryData } = useLoggedInQuery();
  const { isTablet, isDesktop } = useIsDevice();

  return (
    <Spacing gap="xl">
      <Row columns={isTablet ? 12 : 24}>
        <Column span={isTablet ? 12 : 18}>
          <Flex
            direction="column"
            align="stretch"
            style={{ marginRight: "2rem", maxWidth: "40rem", margin: "auto" }}
          >
            <Flex gap="md" style={{ padding: "0 0.5rem" }}>
              <Typography.Text bold size="md" variant="primary">
                Alles
              </Typography.Text>
              <Typography.Text bold size="md" variant="secondary">
                News
              </Typography.Text>
              <Typography.Text bold size="md" variant="secondary">
                Politik
              </Typography.Text>
              <Typography.Text bold size="md" variant="secondary">
                Technologie
              </Typography.Text>
              <Typography.Text bold size="md" variant="secondary">
                Finanzen
              </Typography.Text>
            </Flex>
            <Divider
              style={{
                marginBottom: "2rem",
                width: isDesktop ? "calc(100% - 2rem)" : "100%",
              }}
            />
            <ArticleFeed articles={articlesQueryData?.articles} />
          </Flex>
        </Column>
        {isTablet ? null : (
          <Column span={6}>
            {loggedInQueryData ? (
              <Typography.Text bold>
                {loggedInQueryData?.loggedIn.name}
              </Typography.Text>
            ) : (
              <LoggedOutCallToAction />
            )}
          </Column>
        )}
      </Row>
    </Spacing>
  );
};
