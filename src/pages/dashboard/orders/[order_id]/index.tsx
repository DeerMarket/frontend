import { Flex, Heading, Link } from "theme-ui";
import ButtonWithIcon from "../../../../components/common/ButtonWithIcon";
import DashboardLayout from "../../../../components/layouts/Dashboard";
import A from "next/link";
import { useRouter } from "next/router";

export default function ManageOrder() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <DashboardLayout tab="orders" loading={0}>
      <Flex
        sx={{
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Heading as="h2">Order: {order_id}</Heading>
        <A href="/stores" passHref>
          <Link>
            <ButtonWithIcon>Explore Stores</ButtonWithIcon>
          </Link>
        </A>
      </Flex>
    </DashboardLayout>
  );
}
