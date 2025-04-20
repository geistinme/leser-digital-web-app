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
  activity?: Maybe<Array<Maybe<ArticleActivity>>>;
  category: ArticleCategory;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  editors: Array<Editor>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  premium: Scalars['Boolean']['output'];
  source: Source;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ArticleActivity = {
  __typename?: 'ArticleActivity';
  article: Article;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  type: ArticleActivityType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ArticleActivityInput = {
  articleId: Scalars['Int']['input'];
  type: ArticleActivityType;
};

export enum ArticleActivityType {
  SaveArticle = 'SAVE_ARTICLE',
  ViewArticle = 'VIEW_ARTICLE'
}

export enum ArticleCategory {
  Art = 'ART',
  Breaking = 'BREAKING',
  Business = 'BUSINESS',
  Culture = 'CULTURE',
  Education = 'EDUCATION',
  Entertainment = 'ENTERTAINMENT',
  Environment = 'ENVIRONMENT',
  Fashion = 'FASHION',
  Food = 'FOOD',
  Gaming = 'GAMING',
  Health = 'HEALTH',
  History = 'HISTORY',
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
  source?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  source: Source;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticleActivity?: Maybe<ArticleActivity>;
  deleteArticleActivity?: Maybe<ArticleActivity>;
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


export type MutationDeleteArticleActivityArgs = {
  id: Scalars['Int']['input'];
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

export type Query = {
  __typename?: 'Query';
  articleActivity?: Maybe<ArticleActivity>;
  articles?: Maybe<Array<Article>>;
  loggedIn: User;
  mostViewedArticles?: Maybe<Array<Maybe<Article>>>;
  recommendedArticles?: Maybe<Array<Maybe<Article>>>;
  savedArticles?: Maybe<Array<Article>>;
  source?: Maybe<Source>;
  sources?: Maybe<Array<Maybe<Source>>>;
  users?: Maybe<Array<Maybe<User>>>;
  viewedArticles?: Maybe<Array<Article>>;
};


export type QueryArticleActivityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryArticlesArgs = {
  filter?: InputMaybe<ArticleQueryFilter>;
};


export type QuerySavedArticlesArgs = {
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySourceArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
};


export type QueryViewedArticlesArgs = {
  source?: InputMaybe<Scalars['String']['input']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Source = {
  __typename?: 'Source';
  articleCount?: Maybe<Scalars['Int']['output']>;
  articles: Array<Article>;
  createdAt: Scalars['DateTime']['output'];
  editors: Array<Editor>;
  feedUrl: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type VerificationCode = {
  __typename?: 'VerificationCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type LoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInQuery = { __typename?: 'Query', loggedIn: { __typename?: 'User', id: number, email: string, name: string, verified: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: number, name: string } | null };

export type SavedArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type SavedArticlesQuery = { __typename?: 'Query', savedArticles?: Array<{ __typename?: 'Article', id: number, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, source: { __typename?: 'Source', id: number, key: string, name: string, logo: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null }> | null };

export type ViewedArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewedArticlesQuery = { __typename?: 'Query', viewedArticles?: Array<{ __typename?: 'Article', id: number, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, source: { __typename?: 'Source', id: number, key: string, name: string, logo: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null }> | null };

export type CreateArticleActivityMutationVariables = Exact<{
  data: ArticleActivityInput;
}>;


export type CreateArticleActivityMutation = { __typename?: 'Mutation', createArticleActivity?: { __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null };

export type DeleteArticleActivityMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteArticleActivityMutation = { __typename?: 'Mutation', deleteArticleActivity?: { __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null };

export type ArticleListFragment = { __typename?: 'Article', id: number, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, source: { __typename?: 'Source', id: number, key: string, name: string, logo: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null };

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'Article', id: number, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, source: { __typename?: 'Source', id: number, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null }> | null };

export type RecommendedArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendedArticlesQuery = { __typename?: 'Query', recommendedArticles?: Array<{ __typename?: 'Article', id: number, title: string, url: string, source: { __typename?: 'Source', id: number, name: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null } | null> | null };

export type ArticleFeedFragment = { __typename?: 'Article', id: number, title: string, description?: string | null, image?: string | null, url: string, premium: boolean, uploadedAt: any, source: { __typename?: 'Source', id: number, name: string, logo: string, key: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null };

export type RecommendedArticleFragment = { __typename?: 'Article', id: number, title: string, url: string, source: { __typename?: 'Source', id: number, name: string }, activity?: Array<{ __typename?: 'ArticleActivity', id: number, type: ArticleActivityType } | null> | null };

export type SourceQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type SourceQuery = { __typename?: 'Query', source?: { __typename?: 'Source', id: number, key: string, name: string, logo: string, articleCount?: number | null, articles: Array<{ __typename?: 'Article', id: number, title: string, uploadedAt: any, image?: string | null, url: string }> } | null };

export type SourceProfileFragment = { __typename?: 'Source', id: number, key: string, name: string, logo: string, articleCount?: number | null, articles: Array<{ __typename?: 'Article', id: number, title: string, uploadedAt: any, image?: string | null, url: string }> };

export type ArticleGridFragment = { __typename?: 'Article', id: number, title: string, uploadedAt: any, image?: string | null, url: string };

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


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, verified: boolean, accessToken?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: number, email: string, accessToken?: string | null } | null };

export type VerifyMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyMutation = { __typename?: 'Mutation', verify?: { __typename?: 'User', id: number, email: string, verified: boolean } | null };

export type ResendCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendCodeMutation = { __typename?: 'Mutation', resendVerificationCode?: boolean | null };

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
export const ArticleGridFragmentDoc = gql`
    fragment ArticleGrid on Article {
  id
  title
  uploadedAt
  image
  url
}
    `;
export const SourceProfileFragmentDoc = gql`
    fragment SourceProfile on Source {
  id
  key
  name
  logo
  articleCount
  articles {
    ...ArticleGrid
  }
}
    ${ArticleGridFragmentDoc}`;
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
    mutation deleteArticleActivity($id: Int!) {
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
export const ArticlesDocument = gql`
    query articles {
  articles {
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
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
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