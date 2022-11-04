import { Avatar, Box, Button, Flex, Heading, Link, Paragraph } from "theme-ui";
import DashboardLayout from "../../../components/layouts/Dashboard";
import A from "next/link";
import ButtonWithIcon from "../../../components/common/ButtonWithIcon";
import Image from "next/image";

import Rocket from "../../../assets/jpg/maker.gif";
import { useData } from "../../../hooks/useData";
import { useEffect, useState } from "react";
import Loading from "../../../components/common/Loading";
import StoreAvatar from "../../../components/common/StoreAvatar";

export default function Stores() {
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [accountId, setAccountId] = useState<string | null>(null);

  const { get_stores_by_creator, get_account_id, get_store_metadata } =
    useData();

  useEffect(() => {
    const getAccountId = async () => {
      const accountId = await get_account_id();
      setAccountId(accountId);
    };
    getAccountId();
  }, [get_account_id]);

  useEffect(() => {
    const getStores = async () => {
      const stores = await get_stores_by_creator(accountId!);
      let storeMetadata: any = [];
      for (let i = 0; i < stores.length; i++) {
        const metadata = await get_store_metadata(stores[i]);
        let storeId = stores[i];
        storeMetadata.push({
          id: storeId,
          ...metadata,
        });
      }
      setStores(storeMetadata);
      setIsLoading(false);
    };
    if (accountId) {
      getStores();
    }
  }, [accountId]);

  return (
    <DashboardLayout tab="stores" loading={isLoading}>
      <Flex
        sx={{
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Heading as="h2">My stores</Heading>{" "}
        <A href="/dashboard/stores/create" passHref>
          <Link>
            <ButtonWithIcon>Create a Store</ButtonWithIcon>
          </Link>
        </A>
      </Flex>
      {!stores?.length && !isLoading && <NoStore />}
      {stores?.length > 0 && <StoresList stores={stores} />}
    </DashboardLayout>
  );
}

function StoresList({ stores }: any) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        mt: 2,
        gap: 4,
      }}
    >
      {stores.map((store: any, i: number) => (
        <StoreCard store={store} key={i} />
      ))}
    </Flex>
  );
}

function StoreCard({ store }: any) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        p: 3,
        gap: 2,

        variant: "box.card",
        "&:hover": {
          variant: "box.cardHover",
        },
        mx: ["auto", "auto", 0],
        minWidth: ["340px"],
      }}
    >
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: [4, 4, 2],
        }}
      >
        <A href={`/dashboard/stores/${store.id}`} passHref>
          <Flex
            sx={{
              gap: [3, 3, 4],
              cursor: "pointer",
              flexDirection: ["column", "column", "row"],
              alignItems: ["flex-start", "flex-start", "center"],
            }}
          >
            <StoreAvatar image={store?.logo} size={99} />
            <Flex
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Heading
                as="h4"
                variant="account"
                sx={{
                  maxWidth: [160, 160, "70%"],
                }}
              >
                {store.id}
              </Heading>
              <Heading
                as="h3"
                sx={{
                  maxWidth: [160, 160, "70%"],
                }}
              >
                {store.name}
              </Heading>
            </Flex>
          </Flex>
        </A>

        <A href={`/dashboard/stores/${store.id}/list`} passHref>
          <Link>
            <ButtonWithIcon
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  sx={{
                    stroke: "#7b52b9",
                  }}
                >
                  <path
                    d="M10 5V15"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 10H15"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              sx={{
                fontSize: 1,
              }}
            >
              List an Item
            </ButtonWithIcon>
          </Link>
        </A>
      </Flex>
    </Flex>
  );
}

function NoStore() {
  return (
    <Flex
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        my: 0,
      }}
    >
      <Heading my={0} as="h1" sx={{}}>
        You don&apos;t have a store yet!
      </Heading>
      <Image
        src={Rocket}
        width={600}
        height={360}
        objectFit={"contain"}
        alt=""
      />
      <span
        sx={{
          fontSize: "12px",
          textAlign: "center",
          opacity: 0.8,
          mt: -30,
        }}
      >
        Illustration by{" "}
        <a
          href="https://icons8.com/l/animations"
          target={"_blank"}
          rel={"noreferrer"}
        >
          Icons8
        </a>
      </span>
      <Heading
        mt={4}
        mb={3}
        as="h3"
        sx={{
          fontWeight: "normal",
        }}
      >
        Create a store to start selling your services in minutes
      </Heading>
      <A href="/dashboard/stores/create" passHref>
        <Link>
          <ButtonWithIcon>Create a Store</ButtonWithIcon>
        </Link>
      </A>
    </Flex>
  );
}
