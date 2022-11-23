import { Box, Flex, Heading, Link } from "theme-ui";
import DashboardLayout from "../../../components/layouts/Dashboard";
import A from "next/link";
import ButtonWithIcon from "../../../components/common/ButtonWithIcon";
import Image from "next/image";

import Rocket from "../../../assets/jpg/maker.gif";
import { useData } from "../../../hooks/useData";
import { useEffect, useState } from "react";
import StoreCard from "../../../components/sections/StoreCard";
import TransactionStatus from "../../../components/popups/TransactionStatus";
import { contractsConfig } from "../../../configs/contracts";
import { useRouter } from "next/router";

export default function Stores() {
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);

  const { get_stores_by_creator, account, get_store_metadata, getTx } =
    useData();

  const [txPopup, setTxPopup] = useState({
    show: false,
    success: false,
    loading: false,
  });
  const [txStoreId, setTxStoreId] = useState("");
  const [txMethod, setTxMethod] = useState("");
  const [txEvent, setTxEvent] = useState({});

  const router = useRouter();
  const { transactionHashes } = router.query;

  useEffect(() => {
    if (transactionHashes) {
      setTxPopup({
        show: true,
        success: false,
        loading: true,
      });
      getTx(transactionHashes as string).then((tx: any) => {
        let fn = tx?.transaction?.actions?.[0]?.FunctionCall;
        setTxMethod(fn.method_name);

        if (fn.method_name === "create") {
          let txArgs = fn?.args;
          txArgs = JSON.parse(Buffer.from(txArgs, "base64").toString("ascii"));
          setTxStoreId(txArgs.name);
        }

        if (
          fn.method_name === "item_create" ||
          fn.method_name === "item_update" ||
          fn.method_name === "item_delete" ||
          fn.method_name === "update_store_metadata"
        ) {
          let event = JSON.parse(
            tx?.receipts_outcome?.[0]?.outcome?.logs?.[0].substr(11)
          );
          setTxEvent(event);
          let storeId = tx?.transaction?.receiver_id;
          setTxStoreId(storeId);
        }

        if (tx?.status?.SuccessValue !== undefined) {
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
    } else {
      setTxPopup({
        show: false,
        success: false,
        loading: false,
      });
    }
  }, [transactionHashes]);

  useEffect(() => {
    const getStores = async () => {
      const stores = await get_stores_by_creator(account?.account_id!);

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
    if (account?.account_id) {
      getStores();
    }
  }, [account?.account_id]);

  let successTitle, successMessage, failureTitle, failureMessage, onSuccessConfirm, successConfirmText;

  if (txMethod === "create") {
    successTitle = "Your store was created successfully!";
    successMessage = "You can now start adding products to your store.";
    failureTitle = "Store Creation Failed";
    failureMessage =
      "Something went wrong while creating your store. Please try again.";
  } else if (txMethod === "item_create") {
    successTitle = "Item published successfully!";
    successMessage = "You can now start selling your item.";
    failureTitle = "Item Creation Failed";
    failureMessage =
      "Something went wrong while creating your item. Please try again.";
  } else if (txMethod === "item_update") {
    successTitle = "Item updated successfully!";
    successMessage = "";
    failureTitle = "Item Update Failed";
    failureMessage =
      "Something went wrong while updating your item. Please try again.";
  } else if (txMethod === "update_store_metadata") {
    successTitle = "Store updated successfully!";
    successMessage = "";
    failureTitle = "Store Update Failed";
    failureMessage =
      "Something went wrong while updating your store. Please try again.";
  } else if (txMethod === "item_delete") {
    successTitle = "Item deleted successfully!";
    successMessage = "";
    failureTitle = "Item Delete Failed";
    failureMessage =
      "Something went wrong while deleting your item. Please try again.";
  } else if (txMethod === "delete_self") {
    successTitle = "Store deleted successfully!";
    successMessage = "Feel free to create a new store anytime.";
    successConfirmText = "Close";
    onSuccessConfirm = () => {
      router.push("/dashboard/stores");
    };
    failureTitle = "Store Delete Failed";
    failureMessage =
      "Something went wrong while deleting your store. Please try again.";
  }


  return (
    <DashboardLayout tab="stores" loading={isLoading}>
      <TransactionStatus
        show={txPopup.show}
        success={txPopup.success}
        loading={txPopup.loading}
        successTitle={successTitle}
        successMessage={successMessage}
        successConfirmText={successConfirmText?successConfirmText:"Go to your store"}
        failureTitle={failureTitle}
        failureMessage={failureMessage}
        onSuccessConfirm={onSuccessConfirm ? onSuccessConfirm : () => {
          if(txStoreId.split(".").length > 0){
            router.push(`/dashboard/stores/${txStoreId.split(".")[0]}.${contractsConfig.store_factory.contractId}`);
          }else{
            router.push(`/dashboard/stores/${txStoreId}.${contractsConfig.store_factory.contractId}`);
          }
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
      {stores?.length > 0 && (
        <>
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
              Your Stores
            </Heading>{" "}
            <A href="/dashboard/stores/create" passHref>
              <Link>
                <ButtonWithIcon>Create a Store</ButtonWithIcon>
              </Link>
            </A>
          </Flex>
          <StoresList stores={stores} />
        </>
      )}
      {!stores?.length && !isLoading && <NoStore />}
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
        <StoreCardA store={store} key={i} />
      ))}
    </Flex>
  );
}

function StoreCardA({ store }: any) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        pr: 4,
        pl: 3,
        py: 3,
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
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <StoreCard
              store={{
                id: store.id,
                name: store.name,
                image: store.logo,
              }}
              showExtra={false}
            />
          </Box>
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
                    stroke: "primary",
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
