import React from "react"

import { Spacing } from "@sampled-ui/base"

import { useLoggedInQuery } from "../../../generated/graphql"

export const AccountPage: React.FC = () => {
  const { data: loggedInQueryData } = useLoggedInQuery()
  return (
    <Spacing gap="xl">
      <title>Account</title>
      <p>{loggedInQueryData?.loggedIn.name}</p>
      <p>{loggedInQueryData?.loggedIn.email}</p>
    </Spacing>
  )
}
