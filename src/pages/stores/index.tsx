import A from "next/link";
import { Box, Button, Container, Heading, Link, Paragraph } from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import PageHeader from "../../components/sections/PageHeader";

import { gql } from "@apollo/client";
import client from "../../configs/apollo-client";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import StoreAvatar from "../../components/common/StoreAvatar";

export default function Stores({ data }: any) {
  const router = useRouter();
  const [cat, setCat] = useState<string | number>("all");

  const [isLoading, setIsLoading] = useState(false);

  // new post loaded
  useEffect(() => {
    setIsLoading(false);
  }, [data]);

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
    <DefaultLayout>
      <PageHeader
        title="Explore Stores"
        subtitle="Browse the top growing stores from our community. Find the best products and services for each category."
      />
      <Container
        sx={{
          display: "grid",
          gridGap: 4,
          gridTemplateColumns: "minmax(200px, 1fr) minmax(300px, 4fr)",
          "@media screen and (max-width: 700px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            minHeight: 500,
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
              flexDirection: "column",
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
            gap: 3,
            minHeight: 400,
            alignItems: "center",
          }}
        >
          {isLoading && <Loading sx={{ my: "auto" }} />}
          {!isLoading && data.stores.length < 1 && (
            <Heading as="h3" variant="cardHeading" my={"auto"}>
              No stores found
            </Heading>
          )}
          {!isLoading &&
            data?.stores?.map((s: any, i: any) => (
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
                      rating: 4.5,
                      reviews: 100,
                      products: 3,
                      sales: 300,
                    }}
                  />
                </Link>
              </A>
            ))}
        </Box>
      </Container>
    </DefaultLayout>
  );
}

function StoreCard({
  store,
}: {
  store: {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    rating?: number;
    reviews?: number;
    products?: number;
    sales?: number;
  };
}) {
  let description =
    store?.description && store?.description?.length > 130
      ? store?.description?.slice(0, 130) + "..."
      : store?.description;

  let name =
    store?.name && store?.name?.length > 40
      ? store?.name?.slice(0, 40) + "..."
      : store?.name;
  return (
    <Box
      sx={{
        display: "flex",
        p: 3,
        gap: 3,
        cursor: "pointer",
        variant: "box.card",
        "&:hover": {
          variant: "box.cardHover",
        },
      }}
    >
      <StoreAvatar image={store?.image} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Heading as="h4" variant="account">
            s/{store.id}
          </Heading>
          <Heading as="h3" variant="cardHeading">
            {name}
          </Heading>
        </Box>
        <Paragraph mb={"auto"} mt={3}>
          {description || "No description provided"}
        </Paragraph>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Paragraph
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              variant="text.tiny"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 11.5L5.5 13.5L6.5 10.5L4 8.5L7 8L8 5L9 8L12 8.5L9.5 10.5L10.5 13.5L8 11.5Z"
                  fill="#FFC107"
                />
                <path
                  d="M8 11.5L5.5 13.5L6.5 10.5L4 8.5L7 8L8 5L9 8L12 8.5L9.5 10.5L10.5 13.5L8 11.5Z"
                  stroke="#FFC107"
                />
              </svg>
              <span>{store.rating || "0"}</span>
              <span> ({store.reviews || "0"})</span>
            </Paragraph>
            <Paragraph variant="text.tiny">
              {store.products || "0"} Products
            </Paragraph>
            <Paragraph variant="text.tiny">
              {store.sales || "0"} Sales
            </Paragraph>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Button variant="tiny">
              <span>🤍</span> Favorite
            </Button>
            <Button variant="tiny">
              <span>📤</span> Share
            </Button>
            <Button variant="tiny">
              <span>🚨</span> Report
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let category = context.query.category || "";

  const { data } = await client.query({
    query: gql`
      query GetStoresByCategory($category: String, $getAll: Boolean) {
        stores(where: { category_contains: $category }) @skip(if: $getAll) {
          id
          name
          description
          logo
        }
        stores @include(if: $getAll) {
          id
          name
          description
          logo
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
    },
  };
}
