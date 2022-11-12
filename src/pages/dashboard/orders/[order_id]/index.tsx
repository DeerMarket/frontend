import { Box, Button, Flex, Heading, Link } from "theme-ui";
import ButtonWithIcon from "../../../../components/common/ButtonWithIcon";
import DashboardLayout from "../../../../components/layouts/Dashboard";
import A from "next/link";
import { useRouter } from "next/router";
import Price from "../../../../components/common/Price";

export default function ManageOrder() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <DashboardLayout tab="orders" loading={false}>
      <Flex
        sx={{
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Heading as="h2">Order: {order_id}</Heading>
      </Flex>
      <Flex
        sx={{
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Heading as="h4" mb={2}>
              Status
            </Heading>
            <Heading as="h4">PENDING</Heading>
          </Box>
          <Box>
            <Heading as="h4" mb={2}>
              Price
            </Heading>
            <Heading as="h4">
              <Price amount={11} />
            </Heading>
          </Box>
        </Flex>
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Heading as="h4" mb={2}>
              Store
            </Heading>
            <Heading as="h4" variant="account">
              <Link href="/dashboard/stores/1">s/something</Link>
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" mb={2}>
              Item ID
            </Heading>
            <Heading as="h4" variant="account">
              <Link href="/dashboard/stores/1">1</Link>
            </Heading>
          </Box>
        </Flex>
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Heading as="h4" mb={2}>
              Seller
            </Heading>
            <Heading as="h4" variant="account">
              <Link href="/dashboard/stores/1">something.testnet</Link>
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" mb={2}>
              Buyer
            </Heading>
            <Heading as="h4" variant="account">
              <Link href="/dashboard/stores/1">buyer.testnet</Link>
            </Heading>
          </Box>
        </Flex>
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Heading as="h4" mb={2}>
              Arbiter
            </Heading>
            <Heading as="h4" variant="account">
              <Link href="/dashboard/stores/1">arbiter.testnet</Link>
            </Heading>
          </Box>
        </Flex>
      </Flex>
      <Flex
        sx={{
          mt: 4,
          gap: 3,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button>Complete Order</Button>
        <Button>Dispute Order</Button>
      </Flex>
    </DashboardLayout>
  );
}
