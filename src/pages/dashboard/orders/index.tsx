import { Box, Flex, Heading, Link, Paragraph } from "theme-ui";
import DashboardLayout from "../../../components/layouts/Dashboard";
import A from "next/link";
import ButtonWithIcon from "../../../components/common/ButtonWithIcon";

import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { useGraph } from "../../../hooks/useGraph";
import StoreAvatar from "../../../components/common/StoreAvatar";
import Price from "../../../components/common/Price";
import { utils } from "near-api-js";
import Status from "../../../components/common/Status";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [bought, setBought] = useState([]);
  const [sold, setSold] = useState([]);

  const { account } = useData();
  const { get_orders_by_buyer, get_orders_by_seller } = useGraph();

  useEffect(() => {
    if (account?.account_id) {
      get_orders_by_buyer(account?.account_id).then((r) => {
        setBought(r?.data?.orders);
        setIsLoading(false);
      });
      get_orders_by_seller(account?.account_id).then((r) => {
        setSold(r?.data?.orders);
        setIsLoading(false);
      });
    }
  }, [account?.account_id]);

  return (
    <DashboardLayout tab="orders" loading={isLoading}>
      <Flex
        sx={{
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Heading as="h2">My orders</Heading>
        <A href="/stores" passHref>
          <Link>
            <ButtonWithIcon>Explore Stores</ButtonWithIcon>
          </Link>
        </A>
      </Flex>
      <Heading as="h2">Bought</Heading>
      {bought?.length < 1 ? (
        <Paragraph>
          No orders yet. <A href="/stores">Explore stores</A> to buy something.
        </Paragraph>
      ) : (
        <Flex sx={{ flexDirection: "column", gap: 3, mt: 3 }}>
          <OrderList orders={bought} />
        </Flex>
      )}
      <Heading as="h2" mt={4}>
        Sold
      </Heading>
      {sold?.length < 1 ? (
        <Paragraph>
          No orders yet. When someone buys your products, you&apos;ll see them
          here.
        </Paragraph>
      ) : (
        <Flex sx={{ flexDirection: "column", gap: 3, mt: 3 }}>
          <OrderList orders={sold} />
        </Flex>
      )}
    </DashboardLayout>
  );
}

function OrderList({ orders }: any) {
  return (
    <>
      {orders?.map((order: any, i: any) => (
        <A
          href={`/dashboard/orders/${order?.orderID}@${order?.store?.id}`}
          passHref
          key={i}
        >
          <Flex
            sx={{
              p: 3,
              alignItems: "center",
              gap: 3,
              cursor: "pointer",
              variant: "box.card",
              ":hover": {
                variant: "box.cardHover",
              },
              mx: ["auto", "auto", 0],
              minWidth: ["340px"],
              // flexDirection: ["column", "column", "row"],
            }}
          >
            <Flex
              sx={{
                flexDirection: ["column", "column", "row"],
                gap: 3,
                alignItems: "center",
                mr: "auto",
                flex: 1,
              }}
            >
              <StoreAvatar image={order?.item?.images[0]} size={90} />
              <Box ml={2}>
                <Heading as="h4" variant="account" mt={0}>
                  {order?.store?.id}
                </Heading>
                <Heading mb={2} as="h3">
                  {order?.item?.title}
                </Heading>
                <Price amount={utils.format.formatNearAmount(order?.price)} />
              </Box>
            </Flex>
            <Flex
              sx={{
                flexDirection: ["column", "column", "row"],
                alignItems: ["flex-start", "flex-start", "center"],
                gap: 3,
                ml: ["auto", "auto", 0],
                flex: 1,
              }}
            >
              <Box sx={{ ml: [0, 0, "auto"] }}>
                <Heading as="h5">Ordered at</Heading>
                <Box>
                  {new Date(Number(order?.createdAt) * 1000).toLocaleString()}
                </Box>
              </Box>
              <Box sx={{ ml: [0, 0, "auto"] }}>
                <Heading as="h5">Status</Heading>
                <Status status={order?.status} />
              </Box>
              <Box sx={{ ml: [0, 0, "auto"], mt: ["auto", "auto", 0] }}>
                <A
                  href={`/dashboard/orders/${order?.orderID}@${order?.store?.id}`}
                  passHref
                >
                  <Link>
                    <ButtonWithIcon
                      sx={{
                        fontSize: 1,
                      }}
                    >
                      Manage Order
                    </ButtonWithIcon>
                  </Link>
                </A>
              </Box>
            </Flex>
          </Flex>
        </A>
      ))}
    </>
  );
}
