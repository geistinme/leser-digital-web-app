import React from "react"

import {
    Flex,
    HorizontalBarChart,
    Statistic,
    Typography,
} from "@sampled-ui/base"

import {
    useMySourceActivityStatsQuery,
    useMyTopicActivityStatsQuery,
    UserProfileFragment,
} from "../../../../generated/graphql"

interface UserActivityProps {
  profile?: UserProfileFragment
}

const UserActivity: React.FC<UserActivityProps> = ({ profile }) => {
  const { data: mySourceActivityStatsQueryData } =
    useMySourceActivityStatsQuery()
  const { data: myTopicActivityStatsQueryData } = useMyTopicActivityStatsQuery()
  return (
    <Flex
      direction="column"
      align="start"
      gap="lg"
      style={{ width: "100%", maxWidth: "40rem", margin: "auto" }}
    >
      <Flex gap="md">
        <Statistic
          label="Folge ich"
          value={profile?.subscriptions?.length ?? 0}
        />
        <Statistic
          label="Gelesene Artikel"
          value={profile?.viewedArticles?.length ?? 0}
        />
        <Statistic
          label="Gespeicherte Artikel"
          value={profile?.savedArticles?.length ?? 0}
        />
      </Flex>
      <Flex direction="column" align="start" gap="md" style={{ width: "100%" }}>
        <Typography.Text disabled>Meine Lieblingsquellen</Typography.Text>
        <HorizontalBarChart
          axis={
            mySourceActivityStatsQueryData?.mySourceActivityStats?.map(
              (stat) => ({ label: stat.source.name, value: stat.views })
            ) ?? []
          }
          unit="Views"
        />
      </Flex>
      <Flex direction="column" align="start" gap="md" style={{ width: "100%" }}>
        <Typography.Text disabled>Meine Lieblingsthemen</Typography.Text>
        <HorizontalBarChart
          axis={
            myTopicActivityStatsQueryData?.myTopicActivityStats?.map(
              (stat) => ({
                label: stat.topic.name,
                value: stat.views,
              })
            ) ?? []
          }
          unit="Views"
        />
      </Flex>
    </Flex>
  )
}

export default UserActivity
