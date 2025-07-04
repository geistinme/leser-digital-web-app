import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  Button,
  Column,
  Divider,
  Flex,
  Input,
  Menu,
  Row,
  Skeleton,
  Spacing,
  Tabs,
  Typography,
} from "@sampled-ui/base"
import { Settings, SortDesc } from "lucide-react"
import { useLocation, useNavigate } from "react-router"

import {
  ArticleCategory,
  ArticleOrder,
  useLoggedInQuery,
  useSavedArticlesLazyQuery,
  useViewedArticlesLazyQuery,
} from "../../../../generated/graphql"
import ArticleList from "../../components/Article/ArticleList"

interface CollectionPageProps {}

export const CollectionPage: React.FC<CollectionPageProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState(
    new URLSearchParams(location.search).get("tab") ?? "saved"
  )

  const { data: loggedInQueryData } = useLoggedInQuery()
  const [
    savedArticlesQuery,
    { data: savedArticlesQueryData, loading: loadingSavedArticles },
  ] = useSavedArticlesLazyQuery()
  const [
    viewedArticlesQuery,
    { data: viewedArticlesQueryData, loading: loadingViewedArticles },
  ] = useViewedArticlesLazyQuery()

  const [articleOrder, setArticleOrder] = useState<ArticleOrder>(
    ArticleOrder.Newest
  )
  const [selectedCategory, setSelectedCategory] = useState<
    ArticleCategory | undefined
  >()
  const [queryArticles, setQueryArticles] = useState<string | undefined>()

  const handleFilter = useCallback(
    (filter: { category?: string; query?: string }) => {
      const params = new URLSearchParams(location.search)
      if (filter.category) {
        params.set("category", filter.category)
        navigate(`/collection?${params.toString()}`, {
          replace: true,
        })
      }
      if (filter.query) {
        params.set("query", filter.query)
        navigate(`/collection?${params.toString()}`, {
          replace: true,
        })
        setQueryArticles(filter.query)
      } else {
        params.delete("query")
        navigate(`/collection?${params.toString()}`, {
          replace: true,
        })
        setQueryArticles(undefined)
      }
    },
    [location.search, navigate]
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category")
    const query = params.get("query")
    if (category) {
      setSelectedCategory(
        Object.values(ArticleCategory).find(
          (cat) => cat.toLowerCase() === category.toLowerCase()
        )
      )
    }
    if (query) {
      setQueryArticles(query)
    } else {
      setQueryArticles(undefined)
    }
  }, [location.search])

  useEffect(() => {
    console.debug(queryArticles, selectedCategory, articleOrder)
    const loggedIn = !!loggedInQueryData?.loggedIn
    if (loggedIn) {
      if (selected === "viewed") {
        viewedArticlesQuery({
          variables: {
            filter: {
              query: queryArticles,
              category: selectedCategory,
              order: (articleOrder as ArticleOrder) ?? undefined,
            },
          },
        })
      } else {
        savedArticlesQuery({
          variables: {
            filter: {
              query: queryArticles,
              category: selectedCategory,
              order: (articleOrder as ArticleOrder) ?? undefined,
            },
          },
        })
      }
    }
  }, [
    articleOrder,
    loggedInQueryData,
    queryArticles,
    savedArticlesQuery,
    selected,
    selectedCategory,
    viewedArticlesQuery,
  ])

  const loading = useMemo(() => {
    if (loadingSavedArticles && loadingViewedArticles) {
      return (
        <Flex
          direction="column"
          style={{ width: "100%" }}
          align="center"
          gap="lg"
        >
          <Skeleton width="40rem" height="10rem" />
          <Skeleton width="40rem" height="10rem" />
          <Skeleton width="40rem" height="10rem" />
        </Flex>
      )
    } else {
      return null
    }
  }, [loadingSavedArticles, loadingViewedArticles])

  const empty = useMemo(() => {
    if (
      (!savedArticlesQueryData?.savedArticles ||
        savedArticlesQueryData?.savedArticles?.length === 0) &&
      selected === "saved"
    ) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine gespeicherten Artikel gefunden
        </Typography.Text>
      )
    } else if (
      (!viewedArticlesQueryData?.viewedArticles ||
        viewedArticlesQueryData?.viewedArticles?.length === 0) &&
      selected === "viewed"
    ) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine bisher angesehenen Artikel gefunden
        </Typography.Text>
      )
    } else {
      return null
    }
  }, [
    savedArticlesQueryData?.savedArticles,
    selected,
    viewedArticlesQueryData?.viewedArticles,
  ])

  return (
    <Spacing gap="xl">
      <title>Gespeichert</title>
      <Flex
        direction="column"
        align="stretch"
        style={{ maxWidth: "50rem", margin: "auto" }}
      >
        <Tabs
          items={[
            { key: "saved", title: "Gespeichert" },
            { key: "viewed", title: "Angesehen" },
          ]}
          selected={selected}
          onSelect={(item) => {
            setSelected(item.key)
            navigate(`/collection?tab=${item.key}`, { replace: true })
          }}
        />
        <Divider
          style={{
            marginBottom: "1rem",
          }}
        />
        <Row style={{ marginBottom: "2rem" }}>
          <Column span={8}>
            <Menu
              items={[
                { key: ArticleOrder.Newest, title: "Neueste" },
                { key: ArticleOrder.Oldest, title: "Älteste" },
              ]}
              alignment="bottom"
              onSelect={(item) => {
                setArticleOrder(item.key as ArticleOrder)
              }}
            >
              <Button
                variant="secondary"
                style={{ maxHeight: 16, padding: "var(--spacing-sm)" }}
              >
                <SortDesc size={16} />
              </Button>
            </Menu>
          </Column>
          <Column span={8}>
            <Menu items={[]} alignment="bottom">
              <Input
                placeholder="Search"
                onChange={(e) => {
                  handleFilter({
                    query: e.target.value,
                  })
                }}
                style={{ width: "calc(100% - 1.5rem - 2px)" }}
              />
            </Menu>
          </Column>
          <Column span={8}>
            <Flex justify="end" style={{ width: "100%" }}>
              <Button
                variant="secondary"
                style={{ maxHeight: 16, padding: "var(--spacing-sm)" }}
              >
                <Settings size={16} />
              </Button>
            </Flex>
          </Column>
        </Row>
        {empty}
        {loading}
        {selected === "saved" && !(empty || loading) ? (
          <ArticleList articles={savedArticlesQueryData!.savedArticles!} />
        ) : null}
        {selected === "viewed" && !(empty || loading) ? (
          <ArticleList articles={viewedArticlesQueryData!.viewedArticles!} />
        ) : null}
      </Flex>
    </Spacing>
  )
}
