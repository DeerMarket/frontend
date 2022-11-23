import { NextPageContext } from "next";
import A from "next/link";
import { useRouter } from "next/router";
import { Box, Container, Heading, Link, Paragraph, Text } from "theme-ui";
import DefaultLayout from "../../../components/layouts/Default";
import client from "../../../configs/apollo-client";
import { gql } from "@apollo/client";
import StoreAvatar from "../../../components/common/StoreAvatar";
import StoreCover from "../../../components/common/StoreCover";
import ItemCard from "../../../components/sections/ItemCard";
import Pagination from "../../../components/common/Pagination";
import { useEffect, useState } from "react";
import Loading from "../../../components/common/Loading";

export default function Store({ data, hasMore }: any) {
  const router = useRouter();
  const { id, page: page1 } = router.query;

  let page = page1 ? Number(page1) : 1;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  // replace multi break lines with single break line
  let description = data?.store?.description?.replace(/\n\s*\n\s*\n/g, "\n\n");
  let terms = data?.store?.terms?.replace(/\n\s*\n\s*\n/g, "\n\n");

  return (
    <DefaultLayout>
      <Box mt={3}>
        {data?.store?.cover && (
          <StoreCover image={data?.store?.cover} height={160} />
        )}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            pb: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <StoreAvatar image={data?.store?.logo} />

            <Box
              sx={{
                minWidth: 300,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  flex: 2,
                }}
              >
                <Heading as="h4" variant="account">
                  {data?.store?.id}
                </Heading>
                <Heading as="h3" variant="pageHeading">
                  {data?.store?.name}
                </Heading>
                <Heading as="h5" mt={3}>
                  Owner
                </Heading>
                <Paragraph>
                  <Text variant="account">{data?.store?.owner?.id}</Text>
                </Paragraph>
              </Box>
              <Box
                sx={{
                  gap: 3,
                  flex: 1,
                }}
              >
                <Heading as="h5">Created at</Heading>
                <Paragraph>
                  {new Date(Number(data?.store?.createdAt)).toLocaleString()}
                </Paragraph>
                <Heading as="h5">Updated at</Heading>
                <Paragraph>
                  {new Date(Number(data?.store?.updatedAt)).toLocaleString()}
                </Paragraph>
                <Heading as="h5">Tags</Heading>
                <Paragraph mb={0}>
                  {data?.store?.tags?.length > 0
                    ? data?.store?.tags?.map(
                        (tag: any, i: any) =>
                          // <Link key={tag.id} href={`/search?query=${tag.id}`}>
                          tag.name +
                          (i < data?.store?.tags?.length - 1 ? ", " : "")
                        // </Link>
                      )
                    : "No tags"}
                </Paragraph>
              </Box>
            </Box>
          </Box>
          <Box>
            <Heading as="h5" mt={0}>
              Description
            </Heading>
            <Paragraph
              sx={{
                whiteSpace: "pre-line",
                maxHeight: 100,
                overflowY: "auto",
              }}
            >
              {description || "No description provided"}
            </Paragraph>
          </Box>
        </Container>
      </Box>

      <Container
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: "minmax(300px, 1fr) minmax(300px, 3fr)",
          "@media screen and (max-width: 700px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              p: [1, 1, 3],
              pt: 0,
              minHeight: 120,
            }}
          >
            <Heading as="h3" variant="sidebarHeading">
              Store Contact
            </Heading>
            {!data?.store?.email &&
              !data?.store?.phone &&
              !data?.store?.website && (
                <Paragraph sx={{ color: "textMuted" }}>
                  No contact information provided
                </Paragraph>
              )}
            {data?.store?.website && (
              <Box
                mb={2}
                sx={{
                  px: 2,
                }}
              >
                <Text
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Website:{" "}
                </Text>
                <Link
                  href={
                    !/^https?:\/\//i.test(data?.store?.website)
                      ? "http://" + data?.store?.website
                      : data?.store?.website
                  }
                  target="_blank"
                  sx={{
                    color: "inherit",
                  }}
                >
                  {data?.store?.website}
                </Link>
              </Box>
            )}
            {data?.store?.email && (
              <Box
                mb={2}
                sx={{
                  px: 2,
                }}
              >
                <Text
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Email:{" "}
                </Text>
                <Link
                  href={`mailto:${data?.store?.email}`}
                  sx={{
                    color: "inherit",
                  }}
                >
                  {data?.store?.email}
                </Link>
              </Box>
            )}
            {data?.store?.phone && (
              <Box
                sx={{
                  px: 2,
                }}
              >
                <Text
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Phone:{" "}
                </Text>
                <Link
                  href={`tel:${data?.store?.phone}`}
                  sx={{
                    color: "inherit",
                  }}
                >
                  {data?.store?.phone}
                </Link>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: [1, 1, 3],
              minHeight: [0, 0, 120],
              mb: "auto",
            }}
          >
            <Heading as="h3" variant="sidebarHeading">
              Store Terms
            </Heading>
            <Paragraph
              px={2}
              sx={{
                whiteSpace: "pre-line",
                maxHeight: 800,
                overflowY: "auto",
              }}
            >
              {terms || "No terms provided"}
            </Paragraph>
          </Box>
        </Box>
        <Box
          sx={{
            mb: "auto",
            pb: 4,
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isLoading && <Loading sx={{ mx: "auto" }} />}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            {!isLoading &&
              data?.store?.items.map((item: any, i: any) => (
                <A href={`/s/${id}/item/${item.itemID}`} key={i} passHref>
                  <Link
                    sx={{
                      display: "contents",
                      color: "inherit",
                    }}
                  >
                    <ItemCard item={item} />
                  </Link>
                </A>
              ))}
          </Box>
          {!isLoading && data?.store?.items.length === 0 && (
            <Heading
              as="h3"
              sx={{
                textAlign: "center",
                mx: "auto",
                my: 4,
              }}
            >
              No items
            </Heading>
          )}
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
  let id = context.query.id || "";
  let page = Number(context.query.page) || 1;
  let limit = 10;

  // remove store suffix if it exists
  if (typeof id === "string" && id.split(".").length > 1) {
    id = id.split(".")[0];
  }

  const { data } = await client.query({
    query: gql`
      query GetStore($id: ID!) {
        store(id: $id) {
          id
          name
          description
          logo
          terms
          cover
          phone
          email
          website
          tags {
            id
            name
          }
          owner {
            id
          }
          createdAt
          updatedAt

          items(first: ${limit}, skip: ${(page - 1) * limit}) {
            id
            itemID
            price
            status
            title
            description
            images
            tags {
              id
              name
            }
            createdAt
            updatedAt
          }

          more: items(first: 1, skip: ${page * limit}) {
            id
          }
        }
      }
    `,
    variables: {
      id,
    },
  });

  if (!data?.store) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: data,
      hasMore: data?.store?.more?.length > 0,
    },
  };
}
