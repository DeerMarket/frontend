import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StoreAvatar from "../../../../components/common/StoreAvatar";
import StoreCover from "../../../../components/common/StoreCover";
import DashboardLayout from "../../../../components/layouts/Dashboard";
import { useNear } from "../../../../contexts/Near";
import { useData } from "../../../../hooks/useData";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Paragraph,
  Text,
} from "theme-ui";
import A from "next/link";
import ButtonWithIcon from "../../../../components/common/ButtonWithIcon";
import Price from "../../../../components/common/Price";
import { utils } from "near-api-js";
import ConfirmPopup from "../../../../components/popups/ConfirmDeletePopup";
import { useAction } from "../../../../hooks/useAction";

export default function Store() {
  const router = useRouter();
  const { id } = router.query;

  const [store, setStore] = useState<any>();
  const [storeItems, setStoreItems] = useState<any>();
  const [popup, setPopup] = useState<string | false>(false);

  const { get_store_metadata, get_store_items } = useData();
  const { delete_store, item_delete } = useAction();

  useEffect(() => {
    const getStore = async () => {
      const metadata = await get_store_metadata(id as string);
      setStore(metadata);
    };
    const getStoreItems = async () => {
      const items = await get_store_items(id as string);
      setStoreItems(items);
    };
    if (id) {
      getStore();
      getStoreItems();
    }
  }, [id]);

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
        }}
      >
        <Flex
          sx={{
            flexDirection: "row",
            alignItems: "center",
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

        <Flex
          sx={{
            alignItems: "center",
            gap: 3,
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
                Update Metadata
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
                List an Item
              </ButtonWithIcon>
            </Link>
          </A>
        </Flex>
      </Flex>

      <Box sx={{ p: 4 }}>
        <Heading as="h2">Items</Heading>
        <Flex
          sx={{
            flexDirection: "column",
            gap: 3,
            py: 3,
          }}
        >
          {storeItems?.map((item: any, i: any) => (
            <ItemCard
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
      </Box>
    </DashboardLayout>
  );
}

function ItemCard({ store_id, item, handleDeleteItemPopup }: any) {
  return (
    <Flex
      sx={{
        flexDirection: "row",
        gap: 3,
        variant: "box.card",
        p: 3,
      }}
    >
      <Image
        src={item?.metadata?.images?.[0]}
        sx={{
          width: 150,
          height: 100,
          objectFit: "cover",
          borderRadius: 3,
        }}
      />
      <Flex
        sx={{
          flexDirection: "column",
          gap: 1,
          maxWidth: 500,
        }}
      >
        <Heading as="h2">{item?.metadata?.title}</Heading>
        <Price
          amount={utils.format.formatNearAmount(
            BigInt(item?.price).toString(),
            2
          )}
        />
      </Flex>
      <Flex
        sx={{
          ml: "auto",
          my: "auto",
          gap: 3,
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
          onClick={() => handleDeleteItemPopup(item?.id)}
        >
          Delete Item
        </ButtonWithIcon>
        <A
          href={`/dashboard/stores/${store_id}/item/${item?.id}/update`}
          passHref
        >
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
              Update Item
            </ButtonWithIcon>
          </Link>
        </A>
      </Flex>
    </Flex>
  );
}
