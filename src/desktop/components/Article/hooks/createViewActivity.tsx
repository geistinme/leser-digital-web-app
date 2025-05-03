import {
  ArticleActivityType,
  useCreateArticleActivityMutation,
  useLoggedInQuery
} from "../../../../../generated/graphql";

export type HandleViewArticleFn = ({
  article,
}: {
  article: { id: string; activity?: { type: ArticleActivityType }[] | null };
}) => void;

export const useCreateViewActivity = () => {
  const { data: loggedInData } = useLoggedInQuery();
  const [createArticleActivity] = useCreateArticleActivityMutation({
    update: (cache, { data }) => {
      if (!data?.createArticleActivity) {
        return;
      }
      cache.modify({
        id: cache.identify({
          __typename: "Article",
          id: data.createArticleActivity.article.id,
        }),
        fields: {
          activity() {
            return [
              ...(data.createArticleActivity?.article.activity ?? []),
              data.createArticleActivity,
            ];
          },
        },
      });
    },
  });

  const handleViewArticle: HandleViewArticleFn = ({ article }) => {
    if (
      loggedInData?.loggedIn &&
      !article.activity?.find(
        (activity) => activity.type === ArticleActivityType.ViewArticle
      )
    ) {
      createArticleActivity({
        variables: {
          data: {
            articleId: article.id,
            type: ArticleActivityType.ViewArticle,
          },
        },
      });
    }
  };

  return handleViewArticle;
};
