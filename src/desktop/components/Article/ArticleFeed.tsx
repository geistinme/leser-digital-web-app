import React from "react";

import { Flex } from "@sampled-ui/base";

import { FeedArticleFragment } from "../../../../generated/graphql";

import ArticleShowcase from "./ArticleShowcase";

interface ArticleFeedProps {
  articles?: FeedArticleFragment[] | null;
}

const ArticleFeed: React.FC<ArticleFeedProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <div>No articles available</div>;
  }

  return (
    <Flex direction="column" align="stretch" gap="xl">
      {articles.map((article) => {
        if (article.image) {
          return <ArticleShowcase article={article} />;
          //   return (
          //     <Showcase
          //       className={styles.article}
          //       image={article.image}
          //       backgroundSize="cover"
          //       title={
          //         <Flex direction="column" align="start" gap="sm">
          //           <img
          //             src={article.source.logo}
          //             className={styles.sourceLogo}
          //           />
          //           <Typography.Heading level={4}>
          //             {article.title}
          //           </Typography.Heading>
          //         </Flex>
          //       }
          //       subtitle={
          //         <Flex
          //           key={article.id}
          //           direction="column"
          //           align="start"
          //           gap="sm"
          //         >
          //           {article.description ? (
          //             <Typography.Paragraph size="sm">
          //               {article.description}
          //             </Typography.Paragraph>
          //           ) : null}
          //           {/* <Flex gap="sm">
          //             {article.categories.map((category) => (
          //               <Tag key={category} label={category} variant="filled" />
          //             ))}
          //           </Flex> */}
          //         </Flex>
          //       }
          //     />
          //   );
        }
      })}
    </Flex>
  );
};

export default ArticleFeed;
