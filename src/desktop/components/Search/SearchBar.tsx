import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Input, Menu } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import {
  SearchTerm,
  useSearchTermsLazyQuery,
} from "../../../../generated/graphql"

import styles from "./Search.module.scss"

interface SearchBarProps {
  search?: (query: string) => Promise<void>
  term?: SearchTerm
}

const SearchBar: React.FC<SearchBarProps> = ({ search, term }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")

  const [searchTerms, { data: searchTermsData, fetchMore: fetchMoreTerms }] =
    useSearchTermsLazyQuery()
  const [hasMoreTerms, setHasMoreTerms] = useState(true)

  useEffect(() => {
    if (searchParam) {
      if (search) {
        searchTerms({
          variables: {
            query: searchParam,
          },
        }).then((terms) => {
          if ((terms.data?.searchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(true)
          }
        })
      } else {
        searchTerms({
          variables: {
            query: searchParam,
          },
        }).then((terms) => {
          if ((terms.data?.searchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(true)
          }
        })
      }
    } else if (!searchParam && term?.term) {
      searchTerms({ variables: { query: term.id } })
    } else {
      searchTerms()
    }
  }, [search, searchParam, searchTerms, term?.id, term?.term])

  const loadMoreTerms = useCallback(() => {
    if (hasMoreTerms) {
      fetchMoreTerms({
        variables: {
          query: searchParam ?? "",
          pagination: {
            offset: searchTermsData?.searchTerms?.length ?? 0,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.searchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(false)
          }
          if (
            prev.searchTerms &&
            fetchMoreResult.searchTerms &&
            (fetchMoreResult.searchTerms?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              searchTerms: [
                ...prev.searchTerms,
                ...fetchMoreResult.searchTerms,
              ],
            })
          }
          return prev
        },
      })
    }
  }, [
    fetchMoreTerms,
    hasMoreTerms,
    searchParam,
    searchTermsData?.searchTerms?.length,
  ])

  const { ref: lastMenuItemRef, inView: lastMenuItemRefInView } = useInView()
  useEffect(() => {
    if (lastMenuItemRefInView && hasMoreTerms) {
      loadMoreTerms()
    }
  }, [hasMoreTerms, lastMenuItemRefInView, loadMoreTerms])

  const navigateToSearchTerm = useCallback(
    (id: string) => {
      const newParam = new URLSearchParams()
      newParam.set("term", id)
      navigate(`/search?${newParam.toString()}`)
    },
    [navigate]
  )
  const navigateToSearch = useCallback(
    (id: string) => {
      const newParam = new URLSearchParams()
      newParam.set("search", id)
      navigate(`/search?${newParam.toString()}`)
    },
    [navigate]
  )

  const [searchValue, setSearchValue] = useState<string>("")

  const searchBar = useMemo(() => {
    return (
      <Flex justify="center" className={styles.bar}>
        <Menu
          size="sm"
          items={
            searchTermsData?.searchTerms?.map((searchTerm, index) => ({
              title:
                searchTerm.term!.trim() +
                (searchTerm.source ? ` (${searchTerm.source.name})` : "") +
                (searchTerm.topic ? ` (${searchTerm.topic.name})` : ""),
              key: `${searchTerm.term}-${searchTerm.id}`.trim(),
              ref:
                index === (searchTermsData?.searchTerms?.length ?? 0) - 1
                  ? lastMenuItemRef
                  : undefined,
            })) ?? []
          }
          onSelect={(item) => {
            const term = searchTermsData?.searchTerms?.find(
              (term) =>
                term.id === item.key.substring(item.key.indexOf("-") + 1)
            )
            setSearchValue(term?.term ?? "")
            if (term?.source?.id || term?.topic?.id) {
              navigateToSearchTerm(term.id)
            } else {
              navigateToSearch(term?.term ?? "")
            }
          }}
          alignment="bottom"
        >
          <Input
            size="lg"
            className={styles.search}
            placeholder="Suchen"
            value={searchValue}
            onChange={(e) => {
              e.preventDefault()
              const query = e.target.value
              if (!query) {
                const newParam = new URLSearchParams(location.search)
                newParam.delete("search")
                setSearchValue("")
                navigate(`/search?${newParam.toString()}`, { replace: true })
              } else {
                setSearchValue(query)
                navigateToSearch(query)
              }
            }}
          />
        </Menu>
      </Flex>
    )
  }, [
    lastMenuItemRef,
    location.search,
    navigate,
    navigateToSearch,
    navigateToSearchTerm,
    searchTermsData?.searchTerms,
    searchValue,
    term?.term,
  ])

  return searchBar
}

export default SearchBar
