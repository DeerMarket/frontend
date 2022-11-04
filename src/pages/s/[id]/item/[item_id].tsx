import { gql } from "@apollo/client";
import { utils } from "near-api-js";
import { NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, Container, Heading, Paragraph, Text } from "theme-ui";
import Price from "../../../../components/common/Price";
import StoreAvatar from "../../../../components/common/StoreAvatar";
import StoreCover from "../../../../components/common/StoreCover";
import DefaultLayout from "../../../../components/layouts/Default";
import SwiperGallery from "../../../../components/sections/SwiperGallery";
import client from "../../../../configs/apollo-client";
import { contractsConfig } from "../../../../configs/contracts";
import { useAction } from "../../../../hooks/useAction";

export default function ItemPage({ data }: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { item, store } = data;

  const { item_buy } = useAction();

  const handleBuy = async () => {
    setLoading(true);
    await item_buy(
      store.id + "." + contractsConfig.store_factory.contractId,
      item.itemID,
      item.price
    );
    setLoading(false);
  };

  return (
    <DefaultLayout loading={loading}>
      <Container pb={4} pt={[1, 1, 4]}>
        <Box
          sx={{
            display: "grid",
            gridGap: 4,
            gridTemplateColumns: "minmax(300px, 2fr) minmax(300px, 1fr)",
            "@media screen and (max-width: 700px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <Box>
            {item?.images?.length > 0 && (
              <SwiperGallery slides={item?.images} />
            )}
            <Heading as="h1" variant="pageHeading" mt={4} mb={4}>
              {item?.title}
            </Heading>

            <Heading variant="sectionHeading" as="h3">
              Description &amp; Details
            </Heading>
            <Paragraph>{item?.description || "No description"}</Paragraph>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                mb: 5,
              }}
            >
              <Price
                amount={utils.format.formatNearAmount(item?.price, 2)}
                size={26}
              />
              <Button onClick={handleBuy}>Order Now</Button>
              <Paragraph>
                Payment will be released to the seller only after you receive
                the item purchased.
              </Paragraph>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {data?.store?.cover && (
                <StoreCover image={data?.store?.cover} height={90} />
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  p: 3,
                }}
              >
                <StoreAvatar image={data?.store?.logo} size={84} />
                <Link href={`/s/${data?.store?.id}`} passHref>
                  <Box
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Heading variant="account" as="h5">
                      s/{id}
                    </Heading>
                    <Heading
                      as="h4"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {data?.store?.name || "-"}
                    </Heading>
                    <Paragraph>100% positive feedback</Paragraph>
                  </Box>
                </Link>
              </Box>
              <Heading variant="sidebarHeading" as="h3" my={0}>
                About
              </Heading>
              <Paragraph px={2}>
                {data?.store?.description || "No description"}
              </Paragraph>
              <Heading variant="sidebarHeading" as="h3" mb={0} mt={3}>
                Terms
              </Heading>
              <Paragraph px={2}>
                {data?.store?.terms || "No terms and conditions"}
              </Paragraph>
            </Box>
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  );
  return (
    <DefaultLayout>
      <Container
        sx={{
          display: "grid",
          gridGap: 4,
          gridTemplateColumns: "minmax(300px, 2fr) minmax(300px, 1fr)",
          "@media screen and (max-width: 700px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box>
          <Heading as="h1" variant="pageHeading">
            {item?.title}
          </Heading>
          <Text>
            by{" "}
            <Link href={`/s/${id}`} passHref>
              <Heading
                as="h4"
                variant="account"
                sx={{
                  cursor: "pointer",
                }}
              >
                s/{id}
              </Heading>
            </Link>
          </Text>
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
            <Paragraph>674 Sales</Paragraph>
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          mt: 3,
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: "minmax(300px, 2fr) minmax(300px, 1fr)",
          "@media screen and (max-width: 700px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            minHeight: 400,
            overflow: "hidden",
            mb: "auto",
          }}
        >
          {item?.images?.length > 0 && <SwiperGallery slides={item?.images} />}
          <Box
            sx={{
              p: 3,
            }}
          >
            <Heading variant="sectionHeading" as="h3" my={2}>
              Description &amp; Details
            </Heading>
            <Paragraph>{item?.description || "No description"}</Paragraph>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              p: 3,
              mb: 3,
            }}
          >
            <Heading variant="sidebarHeading" as="h3">
              Store Info
            </Heading>
            <Box
              sx={{
                display: "flex",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ccc",
                  backgroundImage: `url(${data?.store?.logo})`,
                  height: 83,
                  width: 83,
                  borderRadius: 3,
                }}
              />
              <Box>
                <Heading variant="account" as="h5">
                  s/{id}
                </Heading>
                <Heading as="h4">{data?.store?.name || "-"}</Heading>
                <Paragraph>100% positive feedback</Paragraph>
              </Box>
            </Box>
            <Heading variant="sidebarHeading" as="h3" mt={4} mb={0}>
              Seller Terms
            </Heading>
            <Paragraph>
              {data?.store?.terms || "No terms and conditions"}
            </Paragraph>
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let storeId = context.query.id || "";
  let itemId = context.query.item_id || "";

  // remove store suffix if it exists
  if (typeof storeId === "string" && storeId.split(".").length > 1) {
    storeId = storeId.split(".")[0];
  }

  const { data } = await client.query({
    query: gql`
      query GetStoreItems($id: ID!, $sid: ID!) {
        item: storeItem(id: $id) {
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
        store: store(id: $sid) {
          id
          name
          description
          logo
          cover
          terms
        }
      }
    `,
    variables: {
      id: itemId,
      sid: storeId,
    },
  });

  if (!data?.item || data?.item?.status == "deleted") {
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
