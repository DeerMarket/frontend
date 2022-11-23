import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StoreAvatar from "../../../../components/common/StoreAvatar";
import StoreCover from "../../../../components/common/StoreCover";
import DashboardLayout from "../../../../components/layouts/Dashboard";
import { useData } from "../../../../hooks/useData";
import { Flex, Heading, Link, Paragraph } from "theme-ui";
import A from "next/link";
import ButtonWithIcon from "../../../../components/common/ButtonWithIcon";
import ConfirmPopup from "../../../../components/popups/ConfirmDeletePopup";
import { useAction } from "../../../../hooks/useAction";
import ItemCard from "../../../../components/sections/ItemCard";

export default function Store() {
  const router = useRouter();
  const { id } = router.query;

  const [store, setStore] = useState<any>();
  const [storeItems, setStoreItems] = useState<any>();
  const [popup, setPopup] = useState<string | false>(false);

  const { get_store_metadata, get_store_items, account, get_store_owner } =
    useData();
  const { delete_store, item_delete } = useAction();

  const { transactionHashes } = router.query;

  useEffect(() => {
    if (transactionHashes) {
      router.push(`/dashboard/stores?transactionHashes=${transactionHashes}`);
      return;
    }
    const getStore = async () => {
      const metadata = await get_store_metadata(id as string);
      setStore(metadata);
    };
    const getStoreItems = async () => {
      const items = await get_store_items(id as string);
      setStoreItems(items);
    };
    const getOwner = async () => {
      const owner = await get_store_owner(id as string);
      if (!account || owner !== account.account_id) {
        router.push(`/dashboard/stores`);
        return null;
      }
    };

    if (id) {
      getStore();
      getStoreItems();
      getOwner();
    }
  }, [id, transactionHashes]);

  async function handleDeleteStore() {
    await delete_store(id as string);
    setPopup(false);
  }
  async function handleDeleteItem(itemId: string) {
    await item_delete(id as string, itemId);
    setPopup(false);
  }

  return (
    <DashboardLayout
      tab="stores"
      loading={store === undefined || storeItems === undefined}
    >
      <StoreCover image={store?.cover} />
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 3,
          variant: "box.card",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <A href={`/s/${id}`}>
          <Flex
            sx={{
              flexDirection: ["column", "column", "column", "row"],
              alignItems: "left",
              gap: 4,
              cursor: "pointer",
            }}
          >
            <StoreAvatar image={store?.logo} size={99} />
            <Flex
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Heading as="h4" variant="account">
                {id}
              </Heading>
              <Heading as="h3" sx={{}}>
                {store?.name}
              </Heading>
            </Flex>
          </Flex>
        </A>

        <Flex
          sx={{
            gap: 3,
            flexDirection: ["column", "column", "column", "row"],
            alignItems: "flex-end",
          }}
        >
          <ButtonWithIcon
            icon={
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                sx={{
                  fill: "red",
                }}
              >
                <path d="M13 18H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2zm3-15a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1z" />
              </svg>
            }
            sx={{
              fontSize: 1,
              backgroundColor: "red",
              ":hover": {
                backgroundColor: "red",
              },
            }}
            onClick={() => setPopup("delete_store")}
          >
            Delete Store
          </ButtonWithIcon>
          <ConfirmPopup
            confirmButtonText="Delete Store"
            show={popup === "delete_store"}
            title="Confirm Delete Store"
            message={
              <>
                By deleting this store you are deleting the whole account and
                all the items associated with it. This action is irreversible.
                You&apos;ll receive a refund for the storage you&apos;ve paid
                for.
              </>
            }
            onCancel={() => setPopup(false)}
            onConfirm={() => {
              handleDeleteStore();
            }}
          />
          <A href={`/dashboard/stores/${id}/update`} passHref>
            <Link>
              <ButtonWithIcon
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 258.461 258.461"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      fill: "primary",
                    }}
                  >
                    <path
                      d="M258.461,39.842c0-10.643-4.144-20.647-11.67-28.172c-7.524-7.524-17.529-11.669-28.171-11.669
		c-10.643,0-20.647,4.145-28.172,11.669l-11.95,11.95l-0.04-0.04l-1.115,1.194L118.617,83.5c-0.799,0.801-1.62,1.69-2.44,2.643
		c-2.708,3.148-1.309,5.422-0.233,6.497l50.11,50.11c0.933,0.933,1.899,1.406,2.872,1.406c1.337,0,2.272-0.86,2.892-1.43
		c0.093-0.086,0.18-0.166,0.26-0.234c1.048-0.891,2.019-1.782,2.885-2.648l58.7-58.7l1.206-1.154l-0.026-0.026l11.95-11.949
		C254.317,60.489,258.461,50.484,258.461,39.842z"
                    />
                    <path
                      d="M97.903,117.119c-0.923-0.923-2.144-1.431-3.438-1.431c-1.339,0-2.636,0.566-3.556,1.555l-71.564,76.819
		c-1.578,1.692-3.526,4.831-4.345,6.996l-3.714,9.832c-0.92,2.438-0.198,5.789,1.644,7.631l0.719,0.719L0.323,254.522
		c-0.579,1.534-0.271,2.478,0.089,2.999c0.419,0.605,1.112,0.94,1.953,0.94c0.481,0,1.012-0.108,1.576-0.321l35.28-13.327
		l0.719,0.719c1.258,1.258,3.296,2.04,5.319,2.04c0.838,0,1.615-0.134,2.312-0.396l9.832-3.714c2.163-0.817,5.302-2.766,6.997-4.344
		l76.818-71.564c0.979-0.912,1.531-2.145,1.555-3.471c0.023-1.326-0.484-2.577-1.431-3.523L97.903,117.119z"
                    />
                  </svg>
                }
                sx={{
                  fontSize: 1,
                }}
              >
                Edit Store
              </ButtonWithIcon>
            </Link>
          </A>
          <A href={`/dashboard/stores/${id}/list`} passHref>
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
                New Item
              </ButtonWithIcon>
            </Link>
          </A>
        </Flex>
      </Flex>

      <Flex
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
          py: 4,
        }}
      >
        {storeItems?.map((item: any, i: any) => (
          <ItemCard2
            store_id={id}
            item={item}
            key={i}
            handleDeleteItemPopup={() => {
              setPopup("delete_item:" + item.id);
            }}
          />
        ))}
        {storeItems?.length === 0 && (
          <Paragraph>You have no items in this store.</Paragraph>
        )}
        {popup && popup.startsWith("delete_item:") && (
          <ConfirmPopup
            confirmButtonText="Delete Item"
            show={popup.startsWith("delete_item:")}
            title="Confirm Delete Item"
            onCancel={() => setPopup(false)}
            onConfirm={() => {
              handleDeleteItem(popup.split(":")[1]);
            }}
          />
        )}
      </Flex>
    </DashboardLayout>
  );
}

function ItemCard2({ store_id, item, handleDeleteItemPopup }: any) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        gap: 3,
        // variant: "box.card",
        width: "100%",
      }}
    >
      <Flex
        sx={{
          gap: 3,
          alignItems: "center",
          ml: 3,
        }}
      >
        <Heading as="h3" mr={"auto"}>
          item#{item?.id}
        </Heading>
        <ButtonWithIcon
          title="Delete Item"
          icon={
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                fill: "red",
              }}
            >
              <path d="M13 18H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2zm3-15a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1z" />
            </svg>
          }
          sx={{
            fontSize: 1,
            backgroundColor: "red",
            ":hover": {
              backgroundColor: "red",
            },
          }}
          onClick={() => handleDeleteItemPopup(item?.id)}
        ></ButtonWithIcon>
        <A
          href={`/dashboard/stores/${store_id}/item/${item?.id}/update`}
          passHref
        >
          <Link>
            <ButtonWithIcon
              title="Edit Item"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 258.461 258.461"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  sx={{
                    fill: "primary",
                  }}
                >
                  <path
                    d="M258.461,39.842c0-10.643-4.144-20.647-11.67-28.172c-7.524-7.524-17.529-11.669-28.171-11.669
  c-10.643,0-20.647,4.145-28.172,11.669l-11.95,11.95l-0.04-0.04l-1.115,1.194L118.617,83.5c-0.799,0.801-1.62,1.69-2.44,2.643
  c-2.708,3.148-1.309,5.422-0.233,6.497l50.11,50.11c0.933,0.933,1.899,1.406,2.872,1.406c1.337,0,2.272-0.86,2.892-1.43
  c0.093-0.086,0.18-0.166,0.26-0.234c1.048-0.891,2.019-1.782,2.885-2.648l58.7-58.7l1.206-1.154l-0.026-0.026l11.95-11.949
  C254.317,60.489,258.461,50.484,258.461,39.842z"
                  />
                  <path
                    d="M97.903,117.119c-0.923-0.923-2.144-1.431-3.438-1.431c-1.339,0-2.636,0.566-3.556,1.555l-71.564,76.819
  c-1.578,1.692-3.526,4.831-4.345,6.996l-3.714,9.832c-0.92,2.438-0.198,5.789,1.644,7.631l0.719,0.719L0.323,254.522
  c-0.579,1.534-0.271,2.478,0.089,2.999c0.419,0.605,1.112,0.94,1.953,0.94c0.481,0,1.012-0.108,1.576-0.321l35.28-13.327
  l0.719,0.719c1.258,1.258,3.296,2.04,5.319,2.04c0.838,0,1.615-0.134,2.312-0.396l9.832-3.714c2.163-0.817,5.302-2.766,6.997-4.344
  l76.818-71.564c0.979-0.912,1.531-2.145,1.555-3.471c0.023-1.326-0.484-2.577-1.431-3.523L97.903,117.119z"
                  />
                </svg>
              }
              sx={{
                fontSize: 1,
              }}
            ></ButtonWithIcon>
          </Link>
        </A>
        <A href={`/s/${store_id}/item/${item?.id}`} passHref>
          <Link>
            <ButtonWithIcon
              title="View Item"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 612 612"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  sx={{
                    fill: "primary",
                  }}
                >
                  <path
                    d="M609.608,315.426c3.19-5.874,3.19-12.979,0-18.853c-58.464-107.643-172.5-180.72-303.607-180.72
			S60.857,188.931,2.393,296.573c-3.19,5.874-3.19,12.979,0,18.853C60.858,423.069,174.892,496.147,306,496.147
			S551.143,423.069,609.608,315.426z M306,451.855c-80.554,0-145.855-65.302-145.855-145.855S225.446,160.144,306,160.144
			S451.856,225.446,451.856,306S386.554,451.855,306,451.855z"
                  />
                  <path
                    d="M306,231.67c-6.136,0-12.095,0.749-17.798,2.15c5.841,6.76,9.383,15.563,9.383,25.198c0,21.3-17.267,38.568-38.568,38.568
			c-9.635,0-18.438-3.541-25.198-9.383c-1.401,5.703-2.15,11.662-2.15,17.798c0,41.052,33.279,74.33,74.33,74.33
			s74.33-33.279,74.33-74.33S347.052,231.67,306,231.67z"
                  />
                </svg>
              }
              sx={{
                fontSize: 1,
              }}
            ></ButtonWithIcon>
          </Link>
        </A>
      </Flex>
      <ItemCard
        item={{
          title: item?.metadata?.title,
          images: item?.metadata?.images,
          price: item?.price,
        }}
        horizontal={true}
        hover={false}
      />
    </Flex>
  );
}
