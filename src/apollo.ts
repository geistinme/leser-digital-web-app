import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("access_token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const generateRefreshTokenLinkOnUnauthError = ({
  refreshTokenRequestFunc,
}: {
  refreshTokenRequestFunc: () => Promise<void>;
}) => {
  return [
    onError(({ graphQLErrors, operation, forward }) => {
      if (!graphQLErrors) return;

      for (const { path, extensions } of graphQLErrors) {
        if (extensions?.code !== "NOT_LOGGED_IN" || !path) continue;

        const { getContext, setContext } = operation;
        const context = getContext();

        setContext({
          ...context,
          headers: {
            ...context?.headers,
            _needsRefresh: true,
          },
        });

        return forward(operation);
      }
    }),
    setContext(async (_, previousContext) => {
      if (previousContext?.headers?._needsRefresh) {
        await refreshTokenRequestFunc();
      }

      return previousContext;
    }),
  ];
};

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ extensions }) => {
//         if (extensions?.code === "NOT_LOGGED_IN") {
//           localStorage.removeItem("access_token");
//           operation.setContext(async () => {
//             getNewToken().then((response) => {
//               const newToken = response?.data?.refreshToken?.accessToken;
//               if (newToken) {
//                 localStorage.setItem("access_token", newToken);
//                 const { id, name, email, verified } =
//                   response.data.refreshToken;
//                 client.cache.writeQuery({
//                   query: LoggedInDocument,
//                   data: {
//                     loggedIn: {
//                       __typename: "LoggedIn",
//                       id,
//                       name,
//                       email,
//                       verified,
//                     },
//                   },
//                 });
//               }
//             });
//           });
//           return forward(operation);
//         }
//       });

//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   }
// );

const REFRESH_TOKEN_MUTATION = gql`
  mutation {
    refreshToken {
      id
      name
      email
      accessToken
      verified
    }
  }
`;

const getNewToken = (): Promise<void> => {
  return client
    .mutate({ mutation: REFRESH_TOKEN_MUTATION, awaitRefetchQueries: true })
    .then((response) => {
      const accessToken = response.data.refreshToken.accessToken;
      if (accessToken) localStorage.setItem("access_token", accessToken);
    })
    .catch((error: Error) => {
      console.error("Error refreshing token:", error);
    });
};

export const client = new ApolloClient({
  link: ApolloLink.from([
    ...generateRefreshTokenLinkOnUnauthError({
      refreshTokenRequestFunc: getNewToken,
    }),
    authLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
  devtools: { enabled: true },
});
