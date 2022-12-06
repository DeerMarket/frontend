import A from "next/link";
import { Box, Button, Container, Heading, Input, Link } from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import PageHeader from "../../components/sections/PageHeader";

import { gql } from "@apollo/client";
import client from "../../configs/apollo-client";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import StoreCard from "../../components/sections/StoreCard";
import Pagination from "../../components/common/Pagination";
import { useGraph } from "../../hooks/useGraph";
import LabeledInput from "../../components/form/LabeledInput";

export default function Stores({ data, hasMore, statusErrors }: any) {
  const router = useRouter();
  const [cat, setCat] = useState<string | number>("all");
  const [search, setSearch] = useState<string>("");
  const [stores, setStores] = useState<any>(data?.stores);

  const [isLoading, setIsLoading] = useState(false);
  const { search_stores } = useGraph();

  const { page: page1 } = router.query;
  let page = page1 ? Number(page1) : 1;

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    if (search.length < 2) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      let query = search.trim().replace(/ /g, ":*|") + ":*";
      search_stores(0, 15, query).then((res) => {
        setStores(res.data.storeSearch);
        setIsLoading(false);
      });
    }, 700);
    return () => clearTimeout(timer);
  }, [search]);

  function handleCatGo(id: any) {
    setIsLoading(true);
    if (id === "all") {
      router.push("/stores");
    } else {
      router.push(`/stores?category=${id}`);
    }
    setCat(id);
  }

  const CATEGORIES_NAMES: string[] = [
    "Other",
    "Services",
    "Digital Goods",
    "Physical Goods",
    "NFTs",
    "Courses",
  ];

  return (
    <DefaultLayout statusErrors={statusErrors}>
      <PageHeader
        title="Explore Stores"
        subtitle="Browse the top growing stores from our community. Find the best products and services for each category."
      />
      <Container
        sx={{
          display: "grid",
          gridGap: [2, 2, 4],
          gridTemplateColumns: "minmax(200px, 1fr) minmax(300px, 4fr)",
          "@media screen and (max-width: 700px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            borderTop: "none",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            mt: 3,
            mb: "auto",
          }}
        >
          <Heading as="h3" variant="sidebarHeading">
            Categories
          </Heading>

          <Box
            sx={{
              display: "flex",
              flexDirection: ["row", "row", "column"],
              flexWrap: ["wrap", "wrap", "nowrap"],
              alignItems: "flex-start",
              mt: 3,
              gap: 3,
            }}
          >
            <Box
              sx={{
                variant: "box.sidebarMenuItem",
                "&": cat == "all" && {
                  variant: "box.sidebarMenuItemActive",
                },
              }}
              onClick={() => handleCatGo("all")}
            >
              All Stores
            </Box>
            {[
              "Services",
              "Digital Goods",
              "Physical Goods",
              "NFTs",
              "Courses",
              "Other",
            ].map((category, i) => {
              let cid = CATEGORIES_NAMES.indexOf(category);
              return (
                <Box
                  key={i}
                  sx={{
                    variant: "box.sidebarMenuItem",
                    "&": cat == cid && {
                      variant: "box.sidebarMenuItemActive",
                    },
                  }}
                  onClick={() => handleCatGo(cid)}
                >
                  {category}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
            mb: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minHeight: "60vh",
            alignItems: "center",
          }}
        >
          {/* <LabeledInput
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            type="text"
            width="100%"
            placeholder="Search stores"
            label={
              <>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 487.95 487.95"
                  width="20px"
                  height="20px"
                  sx={{
                    fill: "primary",
                  }}
                >
                  <path
                    d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
               c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
               c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                  />
                </svg>
              </>
            }
            mb={0}
          /> */}

          {isLoading && <Loading sx={{ my: "auto" }} />}
          {!isLoading && stores.length < 1 && (
            <Heading as="h3" variant="cardHeading" mt={4}>
              No stores found
            </Heading>
          )}
          {!isLoading &&
            stores?.map((s: any, i: any) => (
              <A href={"/s/" + s?.id} passHref key={i}>
                <Link
                  sx={{
                    textDecoration: "none!important",
                    color: "inherit!important",
                    width: "100%",
                  }}
                >
                  <StoreCard
                    store={{
                      id: s?.id,
                      name: s?.name,
                      description: s?.description,
                      image: s?.logo,
                      // rating: 4.5,
                      // reviews: 100,
                      items: s?.total_items,
                      sales: s?.total_orders,
                    }}
                    showExtra={true}
                    sx={{
                      cursor: "pointer",
                      variant: "box.card",
                      "&:hover": {
                        variant: "box.cardHover",
                      },
                    }}
                  />
                </Link>
              </A>
            ))}

          {!isLoading && (
            <Pagination
              hasMore={hasMore}
              hasPrev={page > 1}
              onNext={() => {
                setIsLoading(true);
                router.replace({
                  query: { ...router.query, page: (page + 1).toString() },
                });
              }}
              onPrev={() => {
                setIsLoading(true);
                router.replace({
                  query: { ...router.query, page: (page - 1).toString() },
                });
              }}
            />
          )}
        </Box>
      </Container>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let category = context.query.category || "";
  let page = Number(context.query.page) || 1;
  let limit = 10;

  const { data } = await client.query({
    query: gql`
      query GetStoresByCategory($category: String, $getAll: Boolean) {
        stores(where: { category_contains: $category }, orderBy: total_orders, orderDirection:desc, first: ${limit}, skip: ${
      (page - 1) * limit
    }) @skip(if: $getAll) {
          id
          name
          description
          logo
          total_items
          total_orders
        }
        stores(orderBy: total_orders, orderDirection:desc, first: ${limit}, skip: ${
      (page - 1) * limit
    }) @include(if: $getAll) {
          id
          name
          description
          logo
          total_items
          total_orders
        }
        # check if there are more stores to load
        more: stores(where: { category_contains: $category }, orderBy: total_orders, orderDirection:desc, first: ${limit}, skip: ${
      page * limit
    }) @skip(if: $getAll) {
          id
        }
        more: stores(orderBy: total_orders, orderDirection:desc, first: ${limit}, skip: ${
      page * limit
    }) @include(if: $getAll) {
          id
        }
      }
    `,
    variables: {
      category,
      getAll: category === "",
    },
  });
  return {
    props: {
      data: data,
      hasMore: data.more.length > 0,
    },
  };
}
