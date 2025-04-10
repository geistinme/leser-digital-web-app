import React from "react";

import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router";

import { client } from "../apollo";

import { router } from "./routes";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
