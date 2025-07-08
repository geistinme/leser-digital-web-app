import React from "react"

import {
  Column,
  Divider,
  Flex,
  Row,
  Statistic,
  Tabs,
  Typography,
} from "@sampled-ui/base"
import { useLocation, useNavigate } from "react-router"

import { useSearchTermStatisticsQuery } from "../../../../generated/graphql"
import AdminSearchBar from "../../components/Admin/AdminSearchBar"
import AdminSearchTerms from "../../components/Admin/AdminSearchTerms"

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get("tab") || "active"
  const { data: statisticsData } = useSearchTermStatisticsQuery()
  return (
    <Flex
      direction="column"
      align="stretch"
      gap="md"
      style={{ maxWidth: "40rem", margin: "auto", marginTop: "2rem" }}
    >
      <title>Admin</title>
      <Row>
        <Column span={12}>
          <Flex direction="column" gap="md" align="start">
            <Typography.Text variant="secondary">Terms</Typography.Text>
            <Flex gap="md">
              <Statistic
                label="Total"
                value={
                  statisticsData?.searchTermStatistics
                    ? statisticsData.searchTermStatistics.totalTerms
                    : "..."
                }
              />
              <Statistic
                label="Active"
                variant="success"
                value={
                  statisticsData?.searchTermStatistics
                    ? `${
                        statisticsData.searchTermStatistics.activeTerms
                      } (${Math.floor(
                        (statisticsData.searchTermStatistics.activeTerms /
                          statisticsData.searchTermStatistics.totalTerms) *
                          100
                      )}%)`
                    : "..."
                }
              />
            </Flex>
          </Flex>
        </Column>
        <Column span={12}>
          <Flex direction="column" gap="md" align="start">
            <Typography.Text variant="secondary">Articles</Typography.Text>
            <Flex gap="md">
              <Statistic
                label="Total"
                value={
                  statisticsData?.searchTermStatistics
                    ? statisticsData.searchTermStatistics.totalArticles
                    : "..."
                }
              />
              <Statistic
                label="Ranked"
                variant="success"
                value={
                  statisticsData?.searchTermStatistics
                    ? `${
                        statisticsData.searchTermStatistics.rankedArticles
                      } (${Math.floor(
                        (statisticsData.searchTermStatistics.rankedArticles /
                          statisticsData.searchTermStatistics.totalArticles) *
                          100
                      )}%)`
                    : "..."
                }
              />
            </Flex>
          </Flex>
        </Column>
      </Row>
      <Divider />
      <Typography.Heading level={4}>Search terms</Typography.Heading>
      <Tabs
        items={[
          { title: "Active", key: "active" },
          { title: "Inactive", key: "inactive" },
        ]}
        onSelect={(item) => {
          navigate(`/admin?tab=${item.key}`)
        }}
        selected={tab}
      />
      <AdminSearchBar />
      <AdminSearchTerms active={tab === "active"} />
    </Flex>
  )
}

export default AdminPage
