import { Box, Flex, Heading, Link } from "theme-ui";
import DashboardLayout from "../../../components/layouts/Dashboard";
import A from "next/link";
import ButtonWithIcon from "../../../components/common/ButtonWithIcon";

import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { useGraph } from "../../../hooks/useGraph";
import StoreAvatar from "../../../components/common/StoreAvatar";
import Price from "../../../components/common/Price";
import { utils } from "near-api-js";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [accountId, setAccountId] = useState<string | null>(null);

  const { get_account_id } = useData();
  const { get_orders_by_buyer } = useGraph();

  useEffect(() => {
    const getAccountId = async () => {
      const accountId = await get_account_id();
      setAccountId(accountId);
    };
    getAccountId();
  }, [get_account_id]);

  useEffect(() => {
    if (accountId) {
      get_orders_by_buyer(accountId).then((r) => {
        setOrders(r?.data?.orders);
        setIsLoading(false);
      });
    }
  }, [accountId]);

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
      <Flex sx={{ flexDirection: "column", gap: 4 }}>
        {orders?.map((order: any, i) => (
          <A href={`/dashboard/orders/${order?.id}`} passHref key={i}>
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
                }}
              >
                <StoreAvatar image={order?.item?.images[0]} size={99} />
                <Box>
                  <Heading as="h4" variant="account">
                    s/{order?.store?.id}
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
                  <Box>
                    {order?.status == "PENDING" ? (
                      <Box sx={{ color: "primary" }}>Pending</Box>
                    ) : order?.status == "COMPLETED" ? (
                      <Box sx={{ color: "success" }}>Completed</Box>
                    ) : order?.status == "CANCELLED" ? (
                      <Box sx={{ color: "error" }}>Cancelled</Box>
                    ) : order?.status == "DISPUTED" ? (
                      <Box sx={{ color: "error" }}>Disputed</Box>
                    ) : order?.status == "RESOLVED" ? (
                      <Box sx={{ color: "success" }}>Resolved</Box>
                    ) : (
                      <Box>{order?.status}</Box>
                    )}
                  </Box>
                </Box>
                <Box sx={{ ml: [0, 0, "auto"], mt: ["auto", "auto", 0] }}>
                  <A href={`/dashboard/orders/${order?.id}`} passHref>
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
      </Flex>
    </DashboardLayout>
  );
}
