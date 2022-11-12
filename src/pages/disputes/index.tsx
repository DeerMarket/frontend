import A from "next/link";
import { Box, Button, Container, Heading, Link, Paragraph } from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import PageHeader from "../../components/sections/PageHeader";

import { gql } from "@apollo/client";
import client from "../../configs/apollo-client";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import StoreAvatar from "../../components/common/StoreAvatar";
import Tabs from "../../components/common/Tabs";
import Price from "../../components/common/Price";
import DisputeCard from "../../components/sections/DisputeCard";

export default function Disputes({ data }: any) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [canVote, setCanVote] = useState(1);

  // new post loaded
  useEffect(() => {
    setIsLoading(false);
    console.log(data);
  }, [data]);

  return (
    <DefaultLayout>
      <PageHeader
        title="Public Disputes"
        subtitle="Here you can find all the public disputes that are currently open. Help the community by voting on the best resolution and earn rewards for your help."
      />
      <Container
        sx={{
          display: "grid",
          gridGap: [2, 2, 4],
          gridTemplateColumns: "minmax(400px, 3fr) minmax(400px, 1fr)",
          "@media screen and (max-width: 800px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            mb: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minHeight: 400,
            alignItems: "center",
            pb: 5,
          }}
        >
          <Tabs
            tabs={[
              {
                id: "open",
                name: "Open",
                onClick: () => {},
                active: true,
              },
              {
                id: "archived",
                name: "Archived",
                onClick: () => {},
                active: false,
              },
            ]}
            sx={{
              mr: "auto",
            }}
          />
          {isLoading && <Loading sx={{ my: "auto" }} />}
          {!isLoading && data?.disputes?.length < 1 && (
            <Heading as="h3" variant="cardHeading" my={"auto"}>
              No disputes found
            </Heading>
          )}
          {!isLoading &&
            data?.disputes?.map((dispute: any, i: any) => (
              <DisputeCard
                dispute={dispute}
                key={i}
                sx={{
                  cursor: "pointer",
                  variant: "box.card",
                  "&:hover": {
                    variant: "box.cardHover",
                  },
                }}
              />
            ))}
        </Box>
        {!canVote && (
          <Box
            sx={{
              mt: 3,
              mb: "auto",
            }}
          >
            <Heading as="h3" variant="sidebarHeading">
              Requirements to participate
            </Heading>
            <Paragraph variant="sidebarText" mb={3}>
              To participate in the dispute resolution process, you must be a
              whitelisted member of the community. If you are not a member, you
              can apply to join the community by clicking the button below.
            </Paragraph>
            <A href="/whitelist">
              <Button variant="primary" sx={{ width: "100%" }}>
                Apply to join
              </Button>
            </A>
            <Paragraph variant="sidebarText" mt={2}>
              The platform is currently in testnet, so you'll be instantly
              whitelisted.
            </Paragraph>
          </Box>
        )}
        {canVote && (
          <Box
            sx={{
              mt: 3,
              mb: "auto",
            }}
          >
            <Heading as="h3" variant="sidebarHeading">
              Requirements to participate
            </Heading>
            <Paragraph variant="sidebarText" mb={3}>
              You are currently whitelisted and can participate in the dispute
              resolution process and earn rewards for your help.
            </Paragraph>
            <Paragraph variant="sidebarText" mb={3}>
              Keep in mind that you can lose your stake if you vote incorrectly
              more than 3 times in a row. So make sure you are confident in your
              vote and keep it fair and honest.
            </Paragraph>
          </Box>
        )}
      </Container>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let category = context.query.category || "";

  //   const { data } = await client.query({
  //     query: gql`
  //       query GetStoresByCategory($category: String, $getAll: Boolean) {
  //         stores(where: { category_contains: $category }) @skip(if: $getAll) {
  //           id
  //           name
  //           description
  //           logo
  //         }
  //         stores @include(if: $getAll) {
  //           id
  //           name
  //           description
  //           logo
  //         }
  //       }
  //     `,
  //     variables: {
  //       category,
  //       getAll: category === "",
  //     },
  //   });
  const exampleData = {
    data: {
      disputes: [
        {
          id: "1",
          title: "Dispute 1",
          description:
            "Hey, my question is about self-sustainability. What are the best strategies to maintain the DAO without grants? It is possible to trace a standard path as a basis for keeping the work of those involved? Especially new projects that need an initial boost, how to do it?",
          disputer: "disputer1.near",
          item: "item1",
          store: "store1",
          endsAt: 1668161456000 + 1000 * 60 * 60 * 13 * 7,
          prize: 10,
        },
        {
          id: "2",
          title: "Dispute 2",
          description: "Dispute 2 description",
          disputer: "disputer2.testnet",
          item: "item2",
          store: "store2",
          endsAt: 1668161456000 + 1000 * 60 * 60 * 24 * 5,
          prize: 2,
        },
        {
          id: "3",
          title: "Dispute 3",
          description: "Dispute 3 description",
          disputer: "disputer3.testnet",
          item: "item3",
          store: "store3",
          endsAt: 1668161456000,
          prize: 88.56,
        },
      ],
    },
  };
  return {
    props: {
      data: exampleData.data,
    },
  };
}
