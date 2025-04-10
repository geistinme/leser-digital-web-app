import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  gql,
  InMemoryCache,
} from "@apollo/client";
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

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ extensions }) => {
        switch (extensions?.code) {
          case "NOT_LOGGED_IN":
            localStorage.removeItem("access_token");
            return fromPromise(getNewToken())
              .filter(Boolean)
              .flatMap((token) => {
                const oldHeaders = operation.getContext().headers;
                // Return the context to the next link in the middleware chain.
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${token}`,
                  },
                });
                return forward(operation);
              });
        }
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const REFRESH_TOKEN_MUTATION = gql`
  mutation {
    refreshToken {
      accessToken
    }
  }
`;

const getNewToken = () => {
  return client.mutate({ mutation: REFRESH_TOKEN_MUTATION }).then((response) => {
    // extract your accessToken from your response data and return it
    if (response) {
      const { accessToken } = response.data.refreshToken;
      return accessToken;
    }
  }).catch(() => {
    return null
  });
};

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  devtools: { enabled: true },
});
