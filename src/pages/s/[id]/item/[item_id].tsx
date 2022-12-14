import { gql } from "@apollo/client";
import { utils } from "near-api-js";
import { NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Container, Heading, Paragraph, Text } from "theme-ui";
import Price from "../../../../components/common/Price";
import StoreCover from "../../../../components/common/StoreCover";
import DefaultLayout from "../../../../components/layouts/Default";
import TransactionStatus from "../../../../components/popups/TransactionStatus";
import ItemCard from "../../../../components/sections/ItemCard";
import StoreCard from "../../../../components/sections/StoreCard";
import SwiperGallery from "../../../../components/sections/SwiperGallery";
import client from "../../../../configs/apollo-client";
import { contractsConfig } from "../../../../configs/contracts";
import { useAction } from "../../../../hooks/useAction";
import { useData } from "../../../../hooks/useData";

export default function ItemPage({ data, statusErrors }: any) {
  const router = useRouter();
  const { account, getTx } = useData();
  const { item_buy } = useAction();

  const [loading, setLoading] = useState(false);
  const [txPopup, setTxPopup] = useState({
    show: false,
    success: false,
    loading: false,
  });

  const { transactionHashes } = router.query;
  const { item, store } = data;

  useEffect(() => {
    if (transactionHashes) {
      setTxPopup({
        show: true,
        success: false,
        loading: true,
      });
      getTx(transactionHashes as string).then((tx: any) => {
        if (tx?.status?.SuccessValue) {
          setTxPopup({
            show: true,
            success: true,
            loading: false,
          });
        } else {
          setTxPopup({
            show: true,
            success: false,
            loading: false,
          });
        }
      });
    }
  }, [transactionHashes]);

  const handleBuy = async () => {
    setLoading(true);
    try {
      await item_buy(
        store.id + "." + contractsConfig.store_factory.contractId,
        item.itemID,
        item.price
      );
      window.location.href = "/dashboard/orders";
      setLoading(false);
    } catch (error) {
      alert("Error: " + error);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <DefaultLayout loading={loading} statusErrors={statusErrors}>
      <TransactionStatus
        show={txPopup.show}
        success={txPopup.success}
        loading={txPopup.loading}
        successTitle="Order Successful"
        successMessage="Your successfully bought this item."
        successConfirmText="View Orders"
        failureTitle="Order Failed"
        failureMessage="Your order failed."
        onSuccessConfirm={() => {
          router.push("/dashboard/orders");
        }}
        onFailConfirm={() => {
          setTxPopup({
            show: false,
            success: false,
            loading: false,
          });
        }}
        onClose={() => {
          setTxPopup({
            show: false,
            success: false,
            loading: false,
          });
        }}
      />
      <Container pb={4} pt={[1, 1, 3]}>
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

            <Heading variant="sectionHeading" as="h3" mb={3}>
              About this item
            </Heading>
            <Paragraph
              sx={{
                whiteSpace: "pre-line",
              }}
            >
              {item?.description
                ? item?.description?.replace(/\n\s*\n\s*\n/g, "\n\n")
                : "No description"}
            </Paragraph>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                mb: 4,
              }}
            >
              <Price
                amount={utils.format.formatNearAmount(item?.price, 2)}
                size={26}
              />
              {store?.owner?.id == account?.account_id || !account ? null : (
                <>
                  <Button onClick={handleBuy}>Order Now</Button>
                  <Paragraph>
                    Payment will be released to the seller only after you
                    receive the item purchased.
                  </Paragraph>
                </>
              )}
              {store?.owner?.id == account?.account_id && (
                <Link
                  href={`/dashboard/stores/${
                    store?.id + "." + contractsConfig.store_factory.contractId
                  }`}
                >
                  <Button>Manage Item</Button>
                </Link>
              )}

              {account == null ? (
                <>
                  <Button onClick={handleBuy} variant="connect">
                    Connect Wallet to Order
                  </Button>
                  <Paragraph>
                    Please connect your wallet to order this item.
                  </Paragraph>
                </>
              ) : null}
            </Box>
            <Heading as="h4" variant="sectionHeading" mb={3}>
              Store Information
            </Heading>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 10,
                overflow: "hidden",
                variant: "box.card",
                pb: 3,
              }}
            >
              <Link href={`/s/${data?.store?.id}`} passHref>
                <Box
                  sx={{
                    cursor: "pointer",
                    mb: 3,
                  }}
                >
                  {data?.store?.cover && (
                    <StoreCover image={data?.store?.cover} height={90} />
                  )}
                  <StoreCard
                    store={{
                      id: data?.store?.id,
                      name: data?.store?.name,
                      image: data?.store?.logo,
                    }}
                  />
                </Box>
              </Link>

              <Heading variant="tiny" as="h4" my={0} mx={3}>
                About
              </Heading>
              <Paragraph mx={3} mt={1}>
                {data?.store?.description || "No description"}
              </Paragraph>
              <Heading variant="tiny" as="h4" mb={0} mt={3} mx={3}>
                Terms
              </Heading>
              <Paragraph mx={3} mt={1}>
                {data?.store?.terms || "No terms and conditions"}
              </Paragraph>
            </Box>

            <Heading as="h4" variant="sectionHeading" mb={3} mt={4}>
              Other Items
            </Heading>
            <Box
              sx={{
                width: "100%",
                gap: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {data?.store?.items?.length > 0 ? (
                data?.store?.items?.map((item: any, i: any) => (
                  <Link
                    key={i}
                    href={`/s/${data?.store?.id}/item/${item?.itemID}`}
                    passHref
                  >
                    <Box>
                      <ItemCard
                        item={{
                          title: item?.title,
                          price: item?.price,
                          images: item?.images,
                        }}
                        horizontal={true}
                        ratio={1.3}
                      />
                    </Box>
                  </Link>
                ))
              ) : (
                <Paragraph>No items found.</Paragraph>
              )}
            </Box>
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
  let id = storeId + ":i:" + itemId;

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
          owner {
            id
          }
          items(first: 6, where: { status: "Active", id_not: $id }) {
            id
            itemID
            price
            title
            images
          }
        }
      }
    `,
    variables: {
      id: id,
      sid: storeId,
    },
  });

  // if (!data?.item || data?.item?.status == "deleted") {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: {
      data: { ...data, id },
    },
  };
}
