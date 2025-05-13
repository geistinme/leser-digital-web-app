import React, { useState } from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"
import { useLocation, useNavigate } from "react-router"

import { useMyProfileQuery } from "../../../../generated/graphql"
import UserActivity from "../../components/Profile/UserActivity"

export const AccountPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [selectedTab, setSelectedTab] = useState(
    params.get("tab") ?? "activity"
  )
  const { data: myProfileQueryData } = useMyProfileQuery()

  return (
    <Spacing
      gap="xl"
      style={{ width: "100%", maxWidth: "40rem", margin: "auto" }}
    >
      <title>Account</title>
      <Flex direction="column" align="start" gap="lg" style={{ width: "100%", marginBottom: "2rem" }}>
        <Flex direction="column" align="start" gap="sm" style={{ width: "100%" }}>
          <Typography.Heading level={3}>
            {myProfileQueryData?.loggedIn.name as string}
          </Typography.Heading>
          <Typography.Text variant="secondary">
            {myProfileQueryData?.loggedIn.email}
          </Typography.Text>
        </Flex>
      </Flex>
      <UserActivity profile={myProfileQueryData} />
    </Spacing>
  )
}
