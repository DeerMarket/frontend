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
import Tabs from "../../../components/common/Tabs";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [bought, setBought] = useState([]);
  const [sold, setSold] = useState([]);

  const [tab, setTab] = useState("bought");

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
        <Heading
          as="h1"
          sx={{
            variant: "pageHeading",
          }}
        >
          Your Orders
        </Heading>
        <Tabs
          tabs={[
            {
              id: "bought",
              name: "As Buyer",
              onClick: () => setTab("bought"),
              active: tab === "bought",
              note: bought?.length,
            },
            {
              id: "sold",
              name: "As Seller",
              onClick: () => setTab("sold"),
              active: tab === "sold",
              note: sold?.length,
            },
          ]}
        />
      </Flex>
      {tab === "bought" &&
        (bought?.length < 1 ? (
          <Paragraph>
            No orders yet. <A href="/stores">Explore stores</A> to buy
            something.
          </Paragraph>
        ) : (
          <Flex sx={{ flexDirection: "column", gap: 3, mt: 3 }}>
            <OrderList orders={bought} tab={tab} />
          </Flex>
        ))}
      {tab === "sold" &&
        (sold?.length < 1 ? (
          <Paragraph>
            No orders yet. When someone buys your products, you&apos;ll see them
            here.
          </Paragraph>
        ) : (
          <Flex sx={{ flexDirection: "column", gap: 3, mt: 3 }}>
            <OrderList orders={sold} tab={tab} />
          </Flex>
        ))}
    </DashboardLayout>
  );
}

function OrderList({ orders, tab }: any) {
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
              width: "100%",
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
              <StoreAvatar image={order?.item?.images?.[0]} size={90} />
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
                textAlign: "left",
              }}
            >
              <Box sx={{ ml: [0, 0] }}>
                <Heading as="h5">Ordered at</Heading>
                <Box>
                  {new Date(Number(order?.createdAt) * 1000).toLocaleString()}
                </Box>
              </Box>
              {tab === "bought" && (
                <Box sx={{ mx: [0, 0, "auto"] }}>
                  <Heading as="h5">Seller</Heading>
                  <Paragraph variant="account">{order?.seller?.id}</Paragraph>
                </Box>
              )}
              {tab === "sold" && (
                <Box sx={{ mx: [0, 0, "auto"] }}>
                  <Heading as="h5">Buyer</Heading>
                  <Paragraph variant="account">{order?.buyer?.id}</Paragraph>
                </Box>
              )}
              <Box
                sx={{
                  ml: [0, 0],
                  mt: ["auto", "auto", 0],
                  mr: [0, 0, 4],
                  width: ["100%", "100%", 100],
                }}
              >
                <Heading as="h5">Status</Heading>
                <Status status={order?.status} />
              </Box>
            </Flex>
          </Flex>
        </A>
      ))}
    </>
  );
}
