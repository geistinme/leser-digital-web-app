import React from "react";

import { ApolloProvider } from "@apollo/client";
import { ToastProvider } from "@sampled-ui/base";
import { Check } from "lucide-react";
import { RouterProvider } from "react-router";

import { client } from "../apollo";

import { router } from "./routes";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ToastProvider
        verticalAlignment="bottom"
        horizontalAlignment="right"
        icons={{ success: <Check color="green" /> }}
      >
        <RouterProvider router={router} />
      </ToastProvider>
    </ApolloProvider>
  );
};

export default App;
