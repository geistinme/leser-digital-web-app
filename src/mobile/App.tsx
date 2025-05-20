import React from "react"

import { ApolloProvider } from "@apollo/client"
import { ToastProvider } from "@sampled-ui/base"
import { RouterProvider } from "react-router"

import { client } from "../apollo"

import { router } from "./routes"

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ApolloProvider>
  )
}

export default App
