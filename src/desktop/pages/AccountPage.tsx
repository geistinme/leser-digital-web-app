import React from "react"

import {
  Divider,
  Flex,
  HorizontalBarChart,
  Spacing,
  Typography,
} from "@sampled-ui/base"

import {
  useLoggedInQuery,
  useMySourceActivityStatsQuery,
  useMyTopicActivityStatsQuery,
} from "../../../generated/graphql"

export const AccountPage: React.FC = () => {
  const { data: loggedInQueryData } = useLoggedInQuery()
  const { data: mySourceActivityStatsQueryData } =
    useMySourceActivityStatsQuery()
  const { data: myTopicActivityStatsQueryData } = useMyTopicActivityStatsQuery()

  return (
    <Spacing gap="xl">
      <title>Account</title>
      <Flex
        direction="column"
        align="start"
        gap="sm"
        style={{ width: "100%", maxWidth: "40rem", margin: "auto" }}
      >
        <Typography.Heading level={3}>
          {loggedInQueryData?.loggedIn.name as string}
        </Typography.Heading>
        <Typography.Text disabled>
          {loggedInQueryData?.loggedIn.email}
        </Typography.Text>
        <Divider />
        <Typography.Text disabled>Meine Lieblingsquellen</Typography.Text>
        <HorizontalBarChart
          axis={
            mySourceActivityStatsQueryData?.mySourceActivityStats?.map(
              (stat) => ({ label: stat.source.name, value: stat.views })
            ) ?? []
          }
          unit="Views"
        />
        <Divider />
        <Typography.Text disabled>Meine Lieblingsthemen</Typography.Text>
        <HorizontalBarChart
          axis={
            myTopicActivityStatsQueryData?.myTopicActivityStats?.map(
              (stat) => ({ label: stat.topic.name, value: stat.views })
            ) ?? []
          }
          unit="Views"
        />
      </Flex>
    </Spacing>
  )
}
