import React, { useMemo } from "react";

import { Column, Row, Spacing, Typography } from "@sampled-ui/base";

import { useArticlesQuery, useLoggedInQuery } from "../../../generated/graphql";
import { useIsDevice } from "../../shared/hooks/isDevice";
import ArticleFeed from "../components/Article/ArticleFeed";
import LoggedOutCallToAction from "../components/CallToAction/LoggedOutCallToAction";

export const HomePage: React.FC = () => {
  const { data: articlesData } = useArticlesQuery();
  const { data: loggedInData } = useLoggedInQuery();
  const { isTablet, isDesktop } = useIsDevice();

  const paddingLeft = useMemo(() => {
    if (isDesktop) {
      return undefined;
    }
  }, [isDesktop]);

  return (
    <Spacing gap="xl" style={{ paddingLeft }}>
      <Row columns={isTablet ? 12 : 24}>
        <Column span={isTablet ? 12 : 16}>
          <ArticleFeed articles={articlesData?.articles} />
        </Column>
        {isTablet ? null : (
          <Column span={8}>
            {loggedInData ? (
              <Typography.Text bold>
                {loggedInData?.loggedIn.name}
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
