import { Box, Button, Flex, Heading, Link } from "theme-ui";
import DashboardLayout from "../../../../components/layouts/Dashboard";
import A from "next/link";
import Router, { useRouter } from "next/router";
import Price from "../../../../components/common/Price";
import { useData } from "../../../../hooks/useData";
import { useEffect, useState } from "react";
import { contractsConfig } from "../../../../configs/contracts";
import { utils } from "near-api-js";
import Status from "../../../../components/common/Status";
import { useAction } from "../../../../hooks/useAction";
import ConfirmBox from "../../../../components/popups/ConfirmBox";

export default function ManageOrder() {
  const router = useRouter();
  const { order_id } = router.query;
  let store_id =
    order_id?.toString().split("@")[1] +
    "." +
    contractsConfig.store_factory.contractId;

  const { get_order, get_store_owner, account } = useData();
  const [order, setOrder] = useState<any>(null);
  const [owner, setOwner] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (order_id) {
      setLoading(true);
      let oid = order_id.toString().split("@")[0];
      get_order(store_id, oid)
        .then((r) => {
          setOrder(r);
          console.log(r);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
        });

      get_store_owner(store_id)
        .then((r: string) => {
          setOwner(r);
        })
        .catch((e: any) => {
          console.error(e);
        });
    }
  }, [order_id]);

  return (
    <DashboardLayout tab="orders" loading={loading}>
      <Flex
        sx={{
          justifyContent: "space-between",
          mb: 4,
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Heading as="h2">Order Details</Heading>
        <Flex
          sx={{
            gap: 3,
            alignItems: "flex-start",
            ml: "auto",
          }}
        >
          <OrderActions order={order} owner={owner} account={account} />
        </Flex>
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
          flexWrap: "wrap",
          variant: "box.card",
          p: 4,
        }}
      >
        <Flex
          sx={{
            width: "100%",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box>
            <Heading as="h4" mb={2}>
              Status
            </Heading>
            <Status status={order?.status} />
          </Box>
          <Box>
            <Heading as="h5" mb={2}>
              Price
            </Heading>
            <Price
              amount={
                order?.amount &&
                utils.format.formatNearAmount(
                  BigInt(order?.amount).toString(),
                  2
                )
              }
            />
          </Box>
        </Flex>
        <Flex
          sx={{
            width: "100%",
            flexWrap: "wrap",
            gap: 5,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 300,
            }}
          >
            <Heading as="h4" mb={2}>
              Store
            </Heading>
            <Heading as="h4" variant="account">
              <Link href={"/s/" + store_id}>{store_id}</Link>
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" mb={2}>
              Item ID
            </Heading>
            <Heading as="h4" variant="account">
              <Link href={"/s/" + store_id}>{order?.item_id}</Link>
            </Heading>
          </Box>
        </Flex>
        <Flex
          sx={{
            width: "100%",
            flexWrap: "wrap",
            gap: 5,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 300,
            }}
          >
            <Heading as="h4" mb={2}>
              Buyer
            </Heading>
            <Heading as="h4" variant="account">
              {order?.buyer_id}
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" mb={2}>
              Seller
            </Heading>
            <Heading as="h4" variant="account">
              {owner}
            </Heading>
          </Box>
        </Flex>
        <Flex
          sx={{
            width: "100%",
            flexWrap: "wrap",
            gap: 5,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 300,
            }}
          >
            <Heading as="h4" mb={2}>
              Arbiter
            </Heading>
            <Heading as="h4" variant="account">
              arbiter.testnet
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}

// TODO: Complete this
// TODO: Add animation between pages
function OrderActions({ order, owner, account }: any) {
  const isSeller = owner === account?.account_id;
  const isBuyer = order?.buyer_id === account?.account_id;

  let status = order?.status.toLowerCase(); // pending, shipped, completed, cancelled, disputed, resolved

  let [loading, setLoading] = useState<boolean>(false);
  let [showConfirm, setShowConfirm] = useState<boolean>(false);
  let [confirmTitle, setConfirmTitle] = useState<string>("");
  let [confirmText, setConfirmText] = useState<string>("");
  let [confirmCB, setConfirmCB] = useState<any>(null);

  const { order_cancel, order_complete, order_shipped } = useAction();

  /** Handlers */
  const handleCancel = () => {
    setShowConfirm(true);
    setConfirmTitle("Cancel Order");
    setConfirmText("Are you sure you want to cancel this order?");
    setConfirmCB(() => {
      return () => {
        setLoading(true);
        order_cancel(order?.store_id, order?.order_id)
          .then((r) => {
            window.location.reload();
          })
          .catch((e) => {
            console.error(e);
            alert("Failed to cancel order: check explorer for details");
            Router.push("/dashboard");
          });
      };
    });
  };
  const handleShipped = () => {
    setShowConfirm(true);
    setConfirmTitle("Mark as Shipped");
    setConfirmText("Are you sure you want to mark this order as shipped?");
    setConfirmCB(() => {
      return () => {
        setLoading(true);
        order_shipped(order?.store_id, order?.order_id)
          .then((r) => {
            window.location.reload();
          })
          .catch((e) => {
            console.error(e);
            alert(
              "Failed to mark order as shipped: check explorer for details"
            );
            Router.push("/dashboard");
          });
      };
    });
  };
  const handleReceived = () => {
    setShowConfirm(true);
    setConfirmTitle("Mark as Received");
    setConfirmText(
      "Are you sure you want to mark this order as received and release the payment?"
    );
    setConfirmCB(() => {
      return () => {
        setLoading(true);
        order_complete(order?.store_id, order?.order_id)
          .then((r) => {
            window.location.reload();
          })
          .catch((e) => {
            console.error(e);
            alert("Failed to complete order: check explorer for details");
            Router.push("/dashboard");
          });
      };
    });
  };
  const handleStartDispute = () => {
    Router.push(Router.asPath + "/dispute");
  };
  const handleViewDispute = () => {
    Router.push("/disputes/");
  };

  let Buttons: React.ReactElement = <></>;
  if (isSeller) {
    Buttons = (
      <>
        {(status == "pending" || status == "shipped") && (
          <Button variant="outline" onClick={handleCancel}>
            Cancel Order
          </Button>
        )}

        {status == "shipped" && (
          <Button variant="outline" onClick={handleStartDispute}>
            Start a Dispute?
          </Button>
        )}

        {status == "pending" && (
          <Button onClick={handleShipped}>Mark as Shipped</Button>
        )}

        {(status == "disputed" || status == "resolved") && (
          <Button onClick={handleViewDispute}>View Dispute</Button>
        )}
      </>
    );
  }
  if (isBuyer) {
    Buttons = (
      <>
        {status == "pending" && (
          <Button variant="outline" onClick={handleCancel}>
            Cancel Order
          </Button>
        )}
        {status == "shipped" && (
          <Button variant="outline" onClick={handleStartDispute}>
            Start a Dispute?
          </Button>
        )}
        {status == "shipped" && (
          <Button onClick={handleReceived}>I Received the Item</Button>
        )}
        {(status == "disputed" || status == "resolved") && (
          <Button onClick={handleViewDispute}>View Dispute</Button>
        )}
      </>
    );
  }
  return (
    <>
      {Buttons}
      <ConfirmBox
        show={showConfirm}
        message={confirmText}
        title={confirmTitle}
        loading={loading}
        onConfirm={confirmCB}
        onCancel={() => {
          setLoading(false);
          setShowConfirm(false);
        }}
      />
    </>
  );
}
