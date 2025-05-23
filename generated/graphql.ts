import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  activity?: Maybe<Array<ArticleActivity>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  editors: Array<Editor>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  premium: Scalars['Boolean']['output'];
  source: Source;
  title: Scalars['String']['output'];
  topic: Topic;
  updatedAt: Scalars['DateTime']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  views?: Maybe<Scalars['Int']['output']>;
};

export type ArticleActivity = {
  __typename?: 'ArticleActivity';
  article: Article;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  type: ArticleActivityType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ArticleActivityInput = {
  articleId: Scalars['String']['input'];
  type: ArticleActivityType;
};

export enum ArticleActivityType {
  SaveArticle = 'SAVE_ARTICLE',
  ViewArticle = 'VIEW_ARTICLE'
}

export enum ArticleCategory {
  Animals = 'ANIMALS',
  Art = 'ART',
  Automotive = 'AUTOMOTIVE',
  Breaking = 'BREAKING',
  Business = 'BUSINESS',
  Crime = 'CRIME',
  Culture = 'CULTURE',
  Education = 'EDUCATION',
  Entertainment = 'ENTERTAINMENT',
  Environment = 'ENVIRONMENT',
  Fashion = 'FASHION',
  Finance = 'FINANCE',
  Fitness = 'FITNESS',
  Food = 'FOOD',
  Gaming = 'GAMING',
  Health = 'HEALTH',
  History = 'HISTORY',
  Law = 'LAW',
  Literature = 'LITERATURE',
  Movies = 'MOVIES',
  Music = 'MUSIC',
  Nature = 'NATURE',
  Philosophy = 'PHILOSOPHY',
  Politics = 'POLITICS',
  Psychology = 'PSYCHOLOGY',
  Puzzle = 'PUZZLE',
  Religion = 'RELIGION',
  Science = 'SCIENCE',
  Sports = 'SPORTS',
  Technology = 'TECHNOLOGY',
  Travel = 'TRAVEL',
  Unknown = 'UNKNOWN',
  Weather = 'WEATHER'
}

export type ArticleQueryFilter = {
  editor?: InputMaybe<Scalars['String']['input']>;
  short?: InputMaybe<Scalars['Boolean']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<ArticleCategory>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Editor = {
  __typename?: 'Editor';
  articles: Array<Article>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  source: Source;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticleActivity?: Maybe<ArticleActivity>;
  createSubscription?: Maybe<Subscription>;
  deleteArticleActivity?: Maybe<ArticleActivity>;
  deleteSubscription?: Maybe<Subscription>;
  login?: Maybe<User>;
  logout?: Maybe<User>;
  refreshToken?: Maybe<User>;
  register?: Maybe<User>;
  resendVerificationCode?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  sendResetLink?: Maybe<Scalars['Boolean']['output']>;
  verify?: Maybe<User>;
};


export type MutationCreateArticleActivityArgs = {
  data: ArticleActivityInput;
};


export type MutationCreateSubscriptionArgs = {
  editorId?: InputMaybe<Scalars['String']['input']>;
  sourceId?: InputMaybe<Scalars['String']['input']>;
  topicId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteArticleActivityArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSubscriptionArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendResetLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationVerifyArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articleActivity?: Maybe<Array<ArticleActivity>>;
  articles?: Maybe<Array<Article>>;
  feed?: Maybe<Array<Article>>;
  loggedIn: User;
  mostViewedArticles?: Maybe<Array<Article>>;
  mySourceActivityStats?: Maybe<Array<SourceActivityStat>>;
  myTopicActivityStats?: Maybe<Array<TopicActivityStat>>;
  recommendedArticles?: Maybe<Array<Maybe<Article>>>;
  savedArticles?: Maybe<Array<Article>>;
  search?: Maybe<SearchResult>;
  source?: Maybe<Source>;
  sources?: Maybe<Array<Source>>;
  subscriptions?: Maybe<Array<Subscription>>;
  topic?: Maybe<Topic>;
  topics?: Maybe<Array<Topic>>;
  users?: Maybe<Array<Maybe<User>>>;
  viewedArticles?: Maybe<Array<Article>>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArticleActivityArgs = {
  id: Scalars['String']['input'];
};


export type QueryArticlesArgs = {
  filter?: InputMaybe<ArticleQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryFeedArgs = {
  filter?: InputMaybe<ArticleQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryMostViewedArticlesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QuerySavedArticlesArgs = {
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchArgs = {
  pagination?: InputMaybe<PaginationInput>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySourceArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTopicArgs = {
  category: ArticleCategory;
};


export type QueryViewedArticlesArgs = {
  source?: InputMaybe<Scalars['String']['input']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

/** Search result type */
export type SearchResult = {
  __typename?: 'SearchResult';
  articles?: Maybe<Array<Article>>;
  sources?: Maybe<Array<Source>>;
  topics?: Maybe<Array<Topic>>;
};

export type Source = {
  __typename?: 'Source';
  articleCount?: Maybe<Scalars['Int']['output']>;
  articles: Array<Article>;
  banner: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  editors: Array<Editor>;
  id: Scalars['ID']['output'];
  isSubscribed?: Maybe<Subscription>;
  key: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subscribers?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SourceActivityStat = {
  __typename?: 'SourceActivityStat';
  source: Source;
  views: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createdAt: Scalars['DateTime']['output'];
  editor?: Maybe<Editor>;
  id: Scalars['ID']['output'];
  source?: Maybe<Source>;
  topic?: Maybe<Topic>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Topic = {
  __typename?: 'Topic';
  articleCount?: Maybe<Scalars['Int']['output']>;
  banner: Scalars['String']['output'];
  category: ArticleCategory;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isSubscribed?: Maybe<Subscription>;
  name: Scalars['String']['output'];
  subscribers?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TopicActivityStat = {
  __typename?: 'TopicActivityStat';
  topic: Topic;
  views: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type VerificationCode = {
  __typename?: 'VerificationCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type LoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInQuery = { __typename?: 'Query', loggedIn: { __typename?: 'User', id: string, email: string, name: string, verified: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string, name: string } | null };

export type MySourceActivityStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySourceActivityStatsQuery = { __typename?: 'Query', mySourceActivityStats?: Array<{ __typename?: 'SourceActivityStat', views: number, source: { __typename?: 'Source', id: string, name: string } }> | null };

export type MyTopicActivityStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTopicActivityStatsQuery = { __typename?: 'Query', myTopicActivityStats?: Array<{ __typename?: 'TopicActivityStat', views: number, topic: { __typename?: 'Topic', id: string, name: string } }> | null };

export type DesktopProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type DesktopProfileQuery = { __typename?: 'Query', loggedIn: { __typename?: 'User', id: string, name: string, email: string }, subscriptions?: Array<{ __typename?: 'Subscription', id: string }> | null, viewedArticles?: Array<{ __typename?: 'Article', id: string }> | null, savedArticles?: Array<{ __typename?: 'Article', id: string }> | null };

export type UserProfileFragment = { __typename?: 'Query', subscriptions?: Array<{ __typename?: 'Subscription', id: string }> | null, viewedArticles?: Array<{ __typename?: 'Article', id: string }> | null, savedArticles?: Array<{ __typename?: 'Article', id: string }> | null };

export type SavedArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type SavedArticlesQuery = { __typename?: 'Query', savedArticles?: Array<{ __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, source: { __typename?: 'Source', id: string, key: string, name: string, logo: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null }> | null };

export type ViewedArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewedArticlesQuery = { __typename?: 'Query', viewedArticles?: Array<{ __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, source: { __typename?: 'Source', id: string, key: string, name: string, logo: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null }> | null };

export type CreateArticleActivityMutationVariables = Exact<{
  data: ArticleActivityInput;
}>;


export type CreateArticleActivityMutation = { __typename?: 'Mutation', createArticleActivity?: { __typename?: 'ArticleActivity', id: string, type: ArticleActivityType } | null };

export type DeleteArticleActivityMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteArticleActivityMutation = { __typename?: 'Mutation', deleteArticleActivity?: { __typename?: 'ArticleActivity', id: string, type: ArticleActivityType } | null };

export type ArticleListFragment = { __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, source: { __typename?: 'Source', id: string, key: string, name: string, logo: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null };

export type MostViewedArticlesQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type MostViewedArticlesQuery = { __typename?: 'Query', mostViewedArticles?: Array<{ __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, topic: { __typename?: 'Topic', id: string, category: ArticleCategory, name: string }, source: { __typename?: 'Source', id: string, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null }> | null };

export type SearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
}>;


export type SearchQuery = { __typename?: 'Query', search?: { __typename?: 'SearchResult', articles?: Array<{ __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, topic: { __typename?: 'Topic', id: string, category: ArticleCategory, name: string }, source: { __typename?: 'Source', id: string, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null }> | null, sources?: Array<{ __typename: 'Source', id: string, key: string, name: string, logo: string, banner: string, isSubscribed?: { __typename?: 'Subscription', id: string } | null }> | null, topics?: Array<{ __typename: 'Topic', id: string, name: string, category: ArticleCategory, banner: string, isSubscribed?: { __typename?: 'Subscription', id: string } | null }> | null } | null };

export type SourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type SourcesQuery = { __typename?: 'Query', sources?: Array<{ __typename: 'Source', id: string, key: string, name: string, logo: string, banner: string, isSubscribed?: { __typename?: 'Subscription', id: string } | null }> | null };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', topics?: Array<{ __typename: 'Topic', id: string, name: string, category: ArticleCategory, banner: string, isSubscribed?: { __typename?: 'Subscription', id: string } | null }> | null };

export type SubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionsQuery = { __typename?: 'Query', subscriptions?: Array<{ __typename?: 'Subscription', id: string, createdAt: any, source?: { __typename?: 'Source', id: string } | null, topic?: { __typename?: 'Topic', id: string, category: ArticleCategory } | null }> | null };

export type CreateSubscriptionMutationVariables = Exact<{
  sourceId?: InputMaybe<Scalars['String']['input']>;
  topicId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription?: { __typename?: 'Subscription', id: string, createdAt: any, source?: { __typename?: 'Source', id: string } | null, topic?: { __typename?: 'Topic', id: string, category: ArticleCategory } | null } | null };

export type DeleteSubscriptionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSubscriptionMutation = { __typename?: 'Mutation', deleteSubscription?: { __typename?: 'Subscription', id: string } | null };

export type SourceGridFragment = { __typename: 'Source', id: string, key: string, name: string, logo: string, banner: string, isSubscribed?: { __typename?: 'Subscription', id: string } | null };

export type TopicGridFragment = { __typename: 'Topic', id: string, name: string, category: ArticleCategory, banner: string, isSubscribed?: { __typename?: 'Subscription', id: string } | null };

export type UserSubscriptionFragment = { __typename?: 'Subscription', id: string, createdAt: any, source?: { __typename?: 'Source', id: string } | null, topic?: { __typename?: 'Topic', id: string, category: ArticleCategory } | null };

export type FeedQueryVariables = Exact<{
  pagination: PaginationInput;
  filter?: InputMaybe<ArticleQueryFilter>;
}>;


export type FeedQuery = { __typename?: 'Query', feed?: Array<{ __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, topic: { __typename?: 'Topic', id: string, category: ArticleCategory, name: string }, source: { __typename?: 'Source', id: string, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null }> | null };

export type ArticlesQueryVariables = Exact<{
  pagination: PaginationInput;
  filter?: InputMaybe<ArticleQueryFilter>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, topic: { __typename?: 'Topic', id: string, category: ArticleCategory, name: string }, source: { __typename?: 'Source', id: string, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null }> | null };

export type RecommendedArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendedArticlesQuery = { __typename?: 'Query', recommendedArticles?: Array<{ __typename?: 'Article', id: string, title: string, url: string, source: { __typename?: 'Source', id: string, name: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null } | null> | null };

export type ArticleFeedFragment = { __typename?: 'Article', id: string, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, views?: number | null, topic: { __typename?: 'Topic', id: string, category: ArticleCategory, name: string }, source: { __typename?: 'Source', id: string, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null };

export type RecommendedArticleFragment = { __typename?: 'Article', id: string, title: string, url: string, source: { __typename?: 'Source', id: string, name: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null };

export type SourceQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type SourceQuery = { __typename?: 'Query', source?: { __typename?: 'Source', id: string, key: string, name: string, logo: string, articleCount?: number | null, subscribers?: number | null, isSubscribed?: { __typename?: 'Subscription', id: string } | null } | null };

export type SourceProfileFragment = { __typename?: 'Source', id: string, key: string, name: string, logo: string, articleCount?: number | null, subscribers?: number | null, isSubscribed?: { __typename?: 'Subscription', id: string } | null };

export type ArticleGridFragment = { __typename?: 'Article', id: string, title: string, uploadedAt: any, image?: string | null, url: string, activity?: Array<{ __typename?: 'ArticleActivity', id: string, type: ArticleActivityType }> | null };

export type TopicQueryVariables = Exact<{
  category: ArticleCategory;
}>;


export type TopicQuery = { __typename?: 'Query', topic?: { __typename?: 'Topic', id: string, category: ArticleCategory, name: string, articleCount?: number | null, subscribers?: number | null, isSubscribed?: { __typename?: 'Subscription', id: string } | null } | null };

export type TopicProfileFragment = { __typename?: 'Topic', id: string, category: ArticleCategory, name: string, articleCount?: number | null, subscribers?: number | null, isSubscribed?: { __typename?: 'Subscription', id: string } | null };

export type MobileProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MobileProfileQuery = { __typename?: 'Query', loggedIn: { __typename?: 'User', id: string, name: string, email: string }, subscriptions?: Array<{ __typename?: 'Subscription', id: string }> | null, savedArticles?: Array<{ __typename?: 'Article', id: string }> | null };

export type SendResetLinkMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendResetLinkMutation = { __typename?: 'Mutation', sendResetLink?: boolean | null };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: boolean | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, verified: boolean, accessToken?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string, email: string, accessToken?: string | null } | null };

export type VerifyMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyMutation = { __typename?: 'Mutation', verify?: { __typename?: 'User', id: string, email: string, verified: boolean } | null };

export type ResendCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendCodeMutation = { __typename?: 'Mutation', resendVerificationCode?: boolean | null };

export const UserProfileFragmentDoc = gql`
    fragment UserProfile on Query {
  subscriptions {
    id
  }
  viewedArticles {
    id
  }
  savedArticles {
    id
  }
}
    `;
export const ArticleListFragmentDoc = gql`
    fragment ArticleList on Article {
  id
  title
  description
  image
  url
  premium
  uploadedAt
  source {
    id
    key
    name
    logo
  }
  activity {
    id
    type
  }
  views
}
    `;
export const SourceGridFragmentDoc = gql`
    fragment SourceGrid on Source {
  __typename
  id
  key
  name
  logo
  banner
  isSubscribed {
    id
  }
}
    `;
export const TopicGridFragmentDoc = gql`
    fragment TopicGrid on Topic {
  __typename
  id
  name
  category
  banner
  isSubscribed {
    id
  }
}
    `;
export const UserSubscriptionFragmentDoc = gql`
    fragment UserSubscription on Subscription {
  id
  source {
    id
  }
  topic {
    id
    category
  }
  createdAt
}
    `;
export const ArticleFeedFragmentDoc = gql`
    fragment ArticleFeed on Article {
  id
  title
  description
  image
  url
  premium
  topic {
    id
    category
    name
  }
  uploadedAt
  source {
    id
    name
    logo
    key
  }
  activity {
    id
    type
  }
  views
}
    `;
export const RecommendedArticleFragmentDoc = gql`
    fragment RecommendedArticle on Article {
  id
  title
  url
  source {
    id
    name
  }
  activity {
    id
    type
  }
}
    `;
export const SourceProfileFragmentDoc = gql`
    fragment SourceProfile on Source {
  id
  key
  name
  logo
  articleCount
  subscribers
  isSubscribed {
    id
  }
}
    `;
export const ArticleGridFragmentDoc = gql`
    fragment ArticleGrid on Article {
  id
  title
  uploadedAt
  image
  url
  activity {
    id
    type
  }
}
    `;
export const TopicProfileFragmentDoc = gql`
    fragment TopicProfile on Topic {
  id
  category
  name
  articleCount
  subscribers
  isSubscribed {
    id
  }
}
    `;
export const LoggedInDocument = gql`
    query loggedIn {
  loggedIn {
    id
    email
    name
    verified
  }
}
    `;

/**
 * __useLoggedInQuery__
 *
 * To run a query within a React component, call `useLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, options);
      }
export function useLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, options);
        }
export function useLoggedInSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, options);
        }
export type LoggedInQueryHookResult = ReturnType<typeof useLoggedInQuery>;
export type LoggedInLazyQueryHookResult = ReturnType<typeof useLoggedInLazyQuery>;
export type LoggedInSuspenseQueryHookResult = ReturnType<typeof useLoggedInSuspenseQuery>;
export type LoggedInQueryResult = Apollo.QueryResult<LoggedInQuery, LoggedInQueryVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    id
    name
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MySourceActivityStatsDocument = gql`
    query mySourceActivityStats {
  mySourceActivityStats {
    source {
      id
      name
    }
    views
  }
}
    `;

/**
 * __useMySourceActivityStatsQuery__
 *
 * To run a query within a React component, call `useMySourceActivityStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySourceActivityStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySourceActivityStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySourceActivityStatsQuery(baseOptions?: Apollo.QueryHookOptions<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>(MySourceActivityStatsDocument, options);
      }
export function useMySourceActivityStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>(MySourceActivityStatsDocument, options);
        }
export function useMySourceActivityStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>(MySourceActivityStatsDocument, options);
        }
export type MySourceActivityStatsQueryHookResult = ReturnType<typeof useMySourceActivityStatsQuery>;
export type MySourceActivityStatsLazyQueryHookResult = ReturnType<typeof useMySourceActivityStatsLazyQuery>;
export type MySourceActivityStatsSuspenseQueryHookResult = ReturnType<typeof useMySourceActivityStatsSuspenseQuery>;
export type MySourceActivityStatsQueryResult = Apollo.QueryResult<MySourceActivityStatsQuery, MySourceActivityStatsQueryVariables>;
export const MyTopicActivityStatsDocument = gql`
    query myTopicActivityStats {
  myTopicActivityStats {
    topic {
      id
      name
    }
    views
  }
}
    `;

/**
 * __useMyTopicActivityStatsQuery__
 *
 * To run a query within a React component, call `useMyTopicActivityStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTopicActivityStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTopicActivityStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTopicActivityStatsQuery(baseOptions?: Apollo.QueryHookOptions<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>(MyTopicActivityStatsDocument, options);
      }
export function useMyTopicActivityStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>(MyTopicActivityStatsDocument, options);
        }
export function useMyTopicActivityStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>(MyTopicActivityStatsDocument, options);
        }
export type MyTopicActivityStatsQueryHookResult = ReturnType<typeof useMyTopicActivityStatsQuery>;
export type MyTopicActivityStatsLazyQueryHookResult = ReturnType<typeof useMyTopicActivityStatsLazyQuery>;
export type MyTopicActivityStatsSuspenseQueryHookResult = ReturnType<typeof useMyTopicActivityStatsSuspenseQuery>;
export type MyTopicActivityStatsQueryResult = Apollo.QueryResult<MyTopicActivityStatsQuery, MyTopicActivityStatsQueryVariables>;
export const DesktopProfileDocument = gql`
    query desktopProfile {
  loggedIn {
    id
    name
    email
  }
  ...UserProfile
}
    ${UserProfileFragmentDoc}`;

/**
 * __useDesktopProfileQuery__
 *
 * To run a query within a React component, call `useDesktopProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useDesktopProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDesktopProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useDesktopProfileQuery(baseOptions?: Apollo.QueryHookOptions<DesktopProfileQuery, DesktopProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DesktopProfileQuery, DesktopProfileQueryVariables>(DesktopProfileDocument, options);
      }
export function useDesktopProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DesktopProfileQuery, DesktopProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DesktopProfileQuery, DesktopProfileQueryVariables>(DesktopProfileDocument, options);
        }
export function useDesktopProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DesktopProfileQuery, DesktopProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DesktopProfileQuery, DesktopProfileQueryVariables>(DesktopProfileDocument, options);
        }
export type DesktopProfileQueryHookResult = ReturnType<typeof useDesktopProfileQuery>;
export type DesktopProfileLazyQueryHookResult = ReturnType<typeof useDesktopProfileLazyQuery>;
export type DesktopProfileSuspenseQueryHookResult = ReturnType<typeof useDesktopProfileSuspenseQuery>;
export type DesktopProfileQueryResult = Apollo.QueryResult<DesktopProfileQuery, DesktopProfileQueryVariables>;
export const SavedArticlesDocument = gql`
    query savedArticles {
  savedArticles {
    ...ArticleList
  }
}
    ${ArticleListFragmentDoc}`;

/**
 * __useSavedArticlesQuery__
 *
 * To run a query within a React component, call `useSavedArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSavedArticlesQuery(baseOptions?: Apollo.QueryHookOptions<SavedArticlesQuery, SavedArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SavedArticlesQuery, SavedArticlesQueryVariables>(SavedArticlesDocument, options);
      }
export function useSavedArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SavedArticlesQuery, SavedArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SavedArticlesQuery, SavedArticlesQueryVariables>(SavedArticlesDocument, options);
        }
export function useSavedArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SavedArticlesQuery, SavedArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SavedArticlesQuery, SavedArticlesQueryVariables>(SavedArticlesDocument, options);
        }
export type SavedArticlesQueryHookResult = ReturnType<typeof useSavedArticlesQuery>;
export type SavedArticlesLazyQueryHookResult = ReturnType<typeof useSavedArticlesLazyQuery>;
export type SavedArticlesSuspenseQueryHookResult = ReturnType<typeof useSavedArticlesSuspenseQuery>;
export type SavedArticlesQueryResult = Apollo.QueryResult<SavedArticlesQuery, SavedArticlesQueryVariables>;
export const ViewedArticlesDocument = gql`
    query viewedArticles {
  viewedArticles {
    ...ArticleList
  }
}
    ${ArticleListFragmentDoc}`;

/**
 * __useViewedArticlesQuery__
 *
 * To run a query within a React component, call `useViewedArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewedArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewedArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewedArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ViewedArticlesQuery, ViewedArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewedArticlesQuery, ViewedArticlesQueryVariables>(ViewedArticlesDocument, options);
      }
export function useViewedArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewedArticlesQuery, ViewedArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewedArticlesQuery, ViewedArticlesQueryVariables>(ViewedArticlesDocument, options);
        }
export function useViewedArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewedArticlesQuery, ViewedArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewedArticlesQuery, ViewedArticlesQueryVariables>(ViewedArticlesDocument, options);
        }
export type ViewedArticlesQueryHookResult = ReturnType<typeof useViewedArticlesQuery>;
export type ViewedArticlesLazyQueryHookResult = ReturnType<typeof useViewedArticlesLazyQuery>;
export type ViewedArticlesSuspenseQueryHookResult = ReturnType<typeof useViewedArticlesSuspenseQuery>;
export type ViewedArticlesQueryResult = Apollo.QueryResult<ViewedArticlesQuery, ViewedArticlesQueryVariables>;
export const CreateArticleActivityDocument = gql`
    mutation createArticleActivity($data: ArticleActivityInput!) {
  createArticleActivity(data: $data) {
    id
    type
  }
}
    `;
export type CreateArticleActivityMutationFn = Apollo.MutationFunction<CreateArticleActivityMutation, CreateArticleActivityMutationVariables>;

/**
 * __useCreateArticleActivityMutation__
 *
 * To run a mutation, you first call `useCreateArticleActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleActivityMutation, { data, loading, error }] = useCreateArticleActivityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateArticleActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleActivityMutation, CreateArticleActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleActivityMutation, CreateArticleActivityMutationVariables>(CreateArticleActivityDocument, options);
      }
export type CreateArticleActivityMutationHookResult = ReturnType<typeof useCreateArticleActivityMutation>;
export type CreateArticleActivityMutationResult = Apollo.MutationResult<CreateArticleActivityMutation>;
export type CreateArticleActivityMutationOptions = Apollo.BaseMutationOptions<CreateArticleActivityMutation, CreateArticleActivityMutationVariables>;
export const DeleteArticleActivityDocument = gql`
    mutation deleteArticleActivity($id: String!) {
  deleteArticleActivity(id: $id) {
    id
    type
  }
}
    `;
export type DeleteArticleActivityMutationFn = Apollo.MutationFunction<DeleteArticleActivityMutation, DeleteArticleActivityMutationVariables>;

/**
 * __useDeleteArticleActivityMutation__
 *
 * To run a mutation, you first call `useDeleteArticleActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleActivityMutation, { data, loading, error }] = useDeleteArticleActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleActivityMutation, DeleteArticleActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleActivityMutation, DeleteArticleActivityMutationVariables>(DeleteArticleActivityDocument, options);
      }
export type DeleteArticleActivityMutationHookResult = ReturnType<typeof useDeleteArticleActivityMutation>;
export type DeleteArticleActivityMutationResult = Apollo.MutationResult<DeleteArticleActivityMutation>;
export type DeleteArticleActivityMutationOptions = Apollo.BaseMutationOptions<DeleteArticleActivityMutation, DeleteArticleActivityMutationVariables>;
export const MostViewedArticlesDocument = gql`
    query mostViewedArticles($pagination: PaginationInput) {
  mostViewedArticles(pagination: $pagination) {
    ...ArticleFeed
  }
}
    ${ArticleFeedFragmentDoc}`;

/**
 * __useMostViewedArticlesQuery__
 *
 * To run a query within a React component, call `useMostViewedArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMostViewedArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMostViewedArticlesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMostViewedArticlesQuery(baseOptions?: Apollo.QueryHookOptions<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>(MostViewedArticlesDocument, options);
      }
export function useMostViewedArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>(MostViewedArticlesDocument, options);
        }
export function useMostViewedArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>(MostViewedArticlesDocument, options);
        }
export type MostViewedArticlesQueryHookResult = ReturnType<typeof useMostViewedArticlesQuery>;
export type MostViewedArticlesLazyQueryHookResult = ReturnType<typeof useMostViewedArticlesLazyQuery>;
export type MostViewedArticlesSuspenseQueryHookResult = ReturnType<typeof useMostViewedArticlesSuspenseQuery>;
export type MostViewedArticlesQueryResult = Apollo.QueryResult<MostViewedArticlesQuery, MostViewedArticlesQueryVariables>;
export const SearchDocument = gql`
    query search($query: String!, $pagination: PaginationInput) {
  search(query: $query, pagination: $pagination) {
    articles {
      ...ArticleFeed
    }
    sources {
      ...SourceGrid
    }
    topics {
      ...TopicGrid
    }
  }
}
    ${ArticleFeedFragmentDoc}
${SourceGridFragmentDoc}
${TopicGridFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables> & ({ variables: SearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export function useSearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchSuspenseQueryHookResult = ReturnType<typeof useSearchSuspenseQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const SourcesDocument = gql`
    query sources {
  sources {
    ...SourceGrid
  }
}
    ${SourceGridFragmentDoc}`;

/**
 * __useSourcesQuery__
 *
 * To run a query within a React component, call `useSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSourcesQuery(baseOptions?: Apollo.QueryHookOptions<SourcesQuery, SourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SourcesQuery, SourcesQueryVariables>(SourcesDocument, options);
      }
export function useSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SourcesQuery, SourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SourcesQuery, SourcesQueryVariables>(SourcesDocument, options);
        }
export function useSourcesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SourcesQuery, SourcesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SourcesQuery, SourcesQueryVariables>(SourcesDocument, options);
        }
export type SourcesQueryHookResult = ReturnType<typeof useSourcesQuery>;
export type SourcesLazyQueryHookResult = ReturnType<typeof useSourcesLazyQuery>;
export type SourcesSuspenseQueryHookResult = ReturnType<typeof useSourcesSuspenseQuery>;
export type SourcesQueryResult = Apollo.QueryResult<SourcesQuery, SourcesQueryVariables>;
export const TopicsDocument = gql`
    query topics {
  topics {
    ...TopicGrid
  }
}
    ${TopicGridFragmentDoc}`;

/**
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopicsQuery(baseOptions?: Apollo.QueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
      }
export function useTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
        }
export function useTopicsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
        }
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>;
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>;
export type TopicsSuspenseQueryHookResult = ReturnType<typeof useTopicsSuspenseQuery>;
export type TopicsQueryResult = Apollo.QueryResult<TopicsQuery, TopicsQueryVariables>;
export const SubscriptionsDocument = gql`
    query subscriptions {
  subscriptions {
    ...UserSubscription
  }
}
    ${UserSubscriptionFragmentDoc}`;

/**
 * __useSubscriptionsQuery__
 *
 * To run a query within a React component, call `useSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionsQuery(baseOptions?: Apollo.QueryHookOptions<SubscriptionsQuery, SubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubscriptionsQuery, SubscriptionsQueryVariables>(SubscriptionsDocument, options);
      }
export function useSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscriptionsQuery, SubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubscriptionsQuery, SubscriptionsQueryVariables>(SubscriptionsDocument, options);
        }
export function useSubscriptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubscriptionsQuery, SubscriptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubscriptionsQuery, SubscriptionsQueryVariables>(SubscriptionsDocument, options);
        }
export type SubscriptionsQueryHookResult = ReturnType<typeof useSubscriptionsQuery>;
export type SubscriptionsLazyQueryHookResult = ReturnType<typeof useSubscriptionsLazyQuery>;
export type SubscriptionsSuspenseQueryHookResult = ReturnType<typeof useSubscriptionsSuspenseQuery>;
export type SubscriptionsQueryResult = Apollo.QueryResult<SubscriptionsQuery, SubscriptionsQueryVariables>;
export const CreateSubscriptionDocument = gql`
    mutation createSubscription($sourceId: String, $topicId: String) {
  createSubscription(sourceId: $sourceId, topicId: $topicId) {
    ...UserSubscription
  }
}
    ${UserSubscriptionFragmentDoc}`;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      sourceId: // value for 'sourceId'
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const DeleteSubscriptionDocument = gql`
    mutation deleteSubscription($id: String!) {
  deleteSubscription(id: $id) {
    id
  }
}
    `;
export type DeleteSubscriptionMutationFn = Apollo.MutationFunction<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>;

/**
 * __useDeleteSubscriptionMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriptionMutation, { data, loading, error }] = useDeleteSubscriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>(DeleteSubscriptionDocument, options);
      }
export type DeleteSubscriptionMutationHookResult = ReturnType<typeof useDeleteSubscriptionMutation>;
export type DeleteSubscriptionMutationResult = Apollo.MutationResult<DeleteSubscriptionMutation>;
export type DeleteSubscriptionMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>;
export const FeedDocument = gql`
    query feed($pagination: PaginationInput!, $filter: ArticleQueryFilter) {
  feed(pagination: $pagination, filter: $filter) {
    ...ArticleFeed
  }
}
    ${ArticleFeedFragmentDoc}`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables> & ({ variables: FeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export function useFeedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedSuspenseQueryHookResult = ReturnType<typeof useFeedSuspenseQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const ArticlesDocument = gql`
    query articles($pagination: PaginationInput!, $filter: ArticleQueryFilter) {
  articles(pagination: $pagination, filter: $filter) {
    ...ArticleFeed
  }
}
    ${ArticleFeedFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables> & ({ variables: ArticlesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export function useArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesSuspenseQueryHookResult = ReturnType<typeof useArticlesSuspenseQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const RecommendedArticlesDocument = gql`
    query recommendedArticles {
  recommendedArticles {
    ...RecommendedArticle
  }
}
    ${RecommendedArticleFragmentDoc}`;

/**
 * __useRecommendedArticlesQuery__
 *
 * To run a query within a React component, call `useRecommendedArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecommendedArticlesQuery(baseOptions?: Apollo.QueryHookOptions<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>(RecommendedArticlesDocument, options);
      }
export function useRecommendedArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>(RecommendedArticlesDocument, options);
        }
export function useRecommendedArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>(RecommendedArticlesDocument, options);
        }
export type RecommendedArticlesQueryHookResult = ReturnType<typeof useRecommendedArticlesQuery>;
export type RecommendedArticlesLazyQueryHookResult = ReturnType<typeof useRecommendedArticlesLazyQuery>;
export type RecommendedArticlesSuspenseQueryHookResult = ReturnType<typeof useRecommendedArticlesSuspenseQuery>;
export type RecommendedArticlesQueryResult = Apollo.QueryResult<RecommendedArticlesQuery, RecommendedArticlesQueryVariables>;
export const SourceDocument = gql`
    query source($key: String!) {
  source(key: $key) {
    ...SourceProfile
  }
}
    ${SourceProfileFragmentDoc}`;

/**
 * __useSourceQuery__
 *
 * To run a query within a React component, call `useSourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useSourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSourceQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useSourceQuery(baseOptions: Apollo.QueryHookOptions<SourceQuery, SourceQueryVariables> & ({ variables: SourceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SourceQuery, SourceQueryVariables>(SourceDocument, options);
      }
export function useSourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SourceQuery, SourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SourceQuery, SourceQueryVariables>(SourceDocument, options);
        }
export function useSourceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SourceQuery, SourceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SourceQuery, SourceQueryVariables>(SourceDocument, options);
        }
export type SourceQueryHookResult = ReturnType<typeof useSourceQuery>;
export type SourceLazyQueryHookResult = ReturnType<typeof useSourceLazyQuery>;
export type SourceSuspenseQueryHookResult = ReturnType<typeof useSourceSuspenseQuery>;
export type SourceQueryResult = Apollo.QueryResult<SourceQuery, SourceQueryVariables>;
export const TopicDocument = gql`
    query topic($category: ArticleCategory!) {
  topic(category: $category) {
    ...TopicProfile
  }
}
    ${TopicProfileFragmentDoc}`;

/**
 * __useTopicQuery__
 *
 * To run a query within a React component, call `useTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useTopicQuery(baseOptions: Apollo.QueryHookOptions<TopicQuery, TopicQueryVariables> & ({ variables: TopicQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicQuery, TopicQueryVariables>(TopicDocument, options);
      }
export function useTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicQuery, TopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicQuery, TopicQueryVariables>(TopicDocument, options);
        }
export function useTopicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TopicQuery, TopicQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TopicQuery, TopicQueryVariables>(TopicDocument, options);
        }
export type TopicQueryHookResult = ReturnType<typeof useTopicQuery>;
export type TopicLazyQueryHookResult = ReturnType<typeof useTopicLazyQuery>;
export type TopicSuspenseQueryHookResult = ReturnType<typeof useTopicSuspenseQuery>;
export type TopicQueryResult = Apollo.QueryResult<TopicQuery, TopicQueryVariables>;
export const MobileProfileDocument = gql`
    query mobileProfile {
  loggedIn {
    id
    name
    email
  }
  subscriptions {
    id
  }
  savedArticles {
    id
  }
}
    `;

/**
 * __useMobileProfileQuery__
 *
 * To run a query within a React component, call `useMobileProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMobileProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMobileProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMobileProfileQuery(baseOptions?: Apollo.QueryHookOptions<MobileProfileQuery, MobileProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MobileProfileQuery, MobileProfileQueryVariables>(MobileProfileDocument, options);
      }
export function useMobileProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MobileProfileQuery, MobileProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MobileProfileQuery, MobileProfileQueryVariables>(MobileProfileDocument, options);
        }
export function useMobileProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MobileProfileQuery, MobileProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MobileProfileQuery, MobileProfileQueryVariables>(MobileProfileDocument, options);
        }
export type MobileProfileQueryHookResult = ReturnType<typeof useMobileProfileQuery>;
export type MobileProfileLazyQueryHookResult = ReturnType<typeof useMobileProfileLazyQuery>;
export type MobileProfileSuspenseQueryHookResult = ReturnType<typeof useMobileProfileSuspenseQuery>;
export type MobileProfileQueryResult = Apollo.QueryResult<MobileProfileQuery, MobileProfileQueryVariables>;
export const SendResetLinkDocument = gql`
    mutation sendResetLink($email: String!) {
  sendResetLink(email: $email)
}
    `;
export type SendResetLinkMutationFn = Apollo.MutationFunction<SendResetLinkMutation, SendResetLinkMutationVariables>;

/**
 * __useSendResetLinkMutation__
 *
 * To run a mutation, you first call `useSendResetLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetLinkMutation, { data, loading, error }] = useSendResetLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetLinkMutation(baseOptions?: Apollo.MutationHookOptions<SendResetLinkMutation, SendResetLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendResetLinkMutation, SendResetLinkMutationVariables>(SendResetLinkDocument, options);
      }
export type SendResetLinkMutationHookResult = ReturnType<typeof useSendResetLinkMutation>;
export type SendResetLinkMutationResult = Apollo.MutationResult<SendResetLinkMutation>;
export type SendResetLinkMutationOptions = Apollo.BaseMutationOptions<SendResetLinkMutation, SendResetLinkMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    verified
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($data: CreateUserInput!) {
  register(data: $data) {
    id
    email
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const VerifyDocument = gql`
    mutation verify($code: String!) {
  verify(code: $code) {
    id
    email
    verified
  }
}
    `;
export type VerifyMutationFn = Apollo.MutationFunction<VerifyMutation, VerifyMutationVariables>;

/**
 * __useVerifyMutation__
 *
 * To run a mutation, you first call `useVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyMutation, { data, loading, error }] = useVerifyMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyMutation(baseOptions?: Apollo.MutationHookOptions<VerifyMutation, VerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyMutation, VerifyMutationVariables>(VerifyDocument, options);
      }
export type VerifyMutationHookResult = ReturnType<typeof useVerifyMutation>;
export type VerifyMutationResult = Apollo.MutationResult<VerifyMutation>;
export type VerifyMutationOptions = Apollo.BaseMutationOptions<VerifyMutation, VerifyMutationVariables>;
export const ResendCodeDocument = gql`
    mutation resendCode {
  resendVerificationCode
}
    `;
export type ResendCodeMutationFn = Apollo.MutationFunction<ResendCodeMutation, ResendCodeMutationVariables>;

/**
 * __useResendCodeMutation__
 *
 * To run a mutation, you first call `useResendCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendCodeMutation, { data, loading, error }] = useResendCodeMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendCodeMutation, ResendCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendCodeMutation, ResendCodeMutationVariables>(ResendCodeDocument, options);
      }
export type ResendCodeMutationHookResult = ReturnType<typeof useResendCodeMutation>;
export type ResendCodeMutationResult = Apollo.MutationResult<ResendCodeMutation>;
export type ResendCodeMutationOptions = Apollo.BaseMutationOptions<ResendCodeMutation, ResendCodeMutationVariables>;