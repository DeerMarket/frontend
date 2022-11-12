import { NextPageContext } from "next";
import { Box, Container } from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import DisputeCard from "../../components/sections/DisputeCard";
import StoreCard from "../../components/sections/StoreCard";

export default function Dispute({ data }: any) {
  return (
    <DefaultLayout>
      <Container
        sx={{
          py: 4,
        }}
      >
        <Box
          sx={{
            variant: "box.card",
          }}
        >
          <StoreCard
            store={{
              id: data?.store?.id,
              name: data?.store?.name,
              description: data?.store?.description,
              image: data?.store?.logo,
              rating: 4.5,
              reviews: 100,
              products: 3,
              sales: 300,
            }}
            sx={{
              variant: "none",
            }}
          />
          <DisputeCard
            dispute={data?.dispute}
            sx={{
              variant: "none",
            }}
          />
        </Box>
      </Container>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let id = context.query.id;

  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const exampleData = {
    data: {
      dispute: {
        id: "3",
        title: "Dispute 3",
        description: "Dispute 3 description",
        disputer: "disputer3.testnet",
        item: "item3",
        store: "store3",
        endsAt: 1668161456000,
        prize: 88.56,
      },
      store: {
        id: "store3.near",
        name: "Store 3",
        description: "Store 3 description",
        logo: "https://i.imgur.com/8Km9tLL.png",
      },
    },
  };

  return {
    props: {
      data: exampleData.data,
    },
  };
}
