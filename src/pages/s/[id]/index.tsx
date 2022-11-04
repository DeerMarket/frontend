import { NextPageContext } from "next";
import Image from "next/image";
import A from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Paragraph,
  Text,
} from "theme-ui";
import Price from "../../../components/common/Price";
import DefaultLayout from "../../../components/layouts/Default";
import client from "../../../configs/apollo-client";
import { gql } from "@apollo/client";
import { utils } from "near-api-js";
import StoreAvatar from "../../../components/common/StoreAvatar";
import StoreCover from "../../../components/common/StoreCover";

export default function Store({ data }: any) {
  const router = useRouter();
  const { id } = router.query;

  console.log(data);

  return (
    <DefaultLayout>
      <Box>
        {data?.store?.cover && (
          <StoreCover image={data?.store?.cover} height={160} />
        )}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
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
              }}
            >
              <Heading as="h4" variant="account">
                s/{data?.store?.id}
              </Heading>
              <Heading as="h3" variant="pageHeading">
                {data?.store?.name}
              </Heading>
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
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 20 20"
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
                  <span>4.5</span>
                  <span> (100)</span>
                </Paragraph>
                <Paragraph>3 Products</Paragraph>
                <Paragraph>674 Sales</Paragraph>
              </Box>{" "}
            </Box>

            <Box
              sx={{
                ml: "auto",
                minWidth: 300,
                flex: 1,
                alignSelf: "flex-start",
              }}
            >
              <Paragraph>
                Created at: {new Date(data?.store?.createdAt).toDateString()}
              </Paragraph>
              <Paragraph>
                Updated at: {new Date(data?.store?.updatedAt).toDateString()}
              </Paragraph>
              <Paragraph>
                Tags:{" "}
                {data?.store?.tags?.length > 0
                  ? data?.store?.tags?.map((tag: any) => (
                      <Link key={tag.id} href={`/search?query=${tag.id}`}>
                        {tag.name + " "}
                      </Link>
                    ))
                  : "No tags provided"}
              </Paragraph>
            </Box>
          </Box>
          <Paragraph pt={[0, 0, 0, 3]}>
            {data?.store?.description || "No description provided"}
          </Paragraph>
        </Container>
      </Box>

      <Container
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: "minmax(300px, 1fr) minmax(300px, 2fr)",
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
                  href={data?.store?.website}
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
            <Paragraph px={2}>
              {data?.store?.terms || "No terms provided"}
            </Paragraph>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mb: "auto",
            gap: 4,
            pb: 4,
          }}
        >
          {data?.store?.items.map((item: any, i: any) => (
            <A href={`/s/${id}/item/${item.id}`} key={i} passHref>
              <Link
                sx={{
                  display: "contents",
                  color: "inherit",
                }}
              >
                <ItemCard data={item} />
              </Link>
            </A>
          ))}
        </Box>
      </Container>
    </DefaultLayout>
  );
}

function ItemCard({ data }: any) {
  return (
    <Box
      sx={{
        width: ["100%", "100%", "50%", "30%"],
        // p: 3,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        justifyContent: "center",
        variant: "box.card",

        ":hover": {
          variant: "box.cardHover",
        },
      }}
    >
      <Box
        sx={{
          height: 200,
          width: "100%",
          backgroundColor: "muted",
          backgroundImage: `url(${data?.images?.[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "inherit",
          mb: "auto",
        }}
      ></Box>
      <Box
        px={3}
        py={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Heading
          as="h4"
          sx={{
            fontWeight: "normal",
            pb: 2,
            mb: "auto",
          }}
        >
          {data?.title}
        </Heading>
        <Price amount={utils.format.formatNearAmount(data?.price, 2)} />
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let id = context.query.id || "";

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
          createdAt
          updatedAt

          items(where: { status: "Active" }) {
            id
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
    },
  };
}
