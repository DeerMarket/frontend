import { Box, Button, Container, Heading, Paragraph } from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import PageHeader from "../../components/sections/PageHeader";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import Tabs from "../../components/common/Tabs";
import DisputeCard from "../../components/sections/DisputeCard";
import { useData } from "../../hooks/useData";
import { utils } from "near-api-js";
import { useAction } from "../../hooks/useAction";

export default function Disputes({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [canVote, setCanVote] = useState(false);
  const [disputes, setDisputes] = useState([]);
  const [tab, setTab] = useState("open");

  const { get_disputes, can_vote, account } = useData();
  const { whitelist_me, login } = useAction();

  useEffect(() => {
    setIsLoading(true);
    get_disputes({
      openOnly: tab === "open",
    })
      .then((res) => {
        setDisputes(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [tab]);

  useEffect(() => {
    can_vote(account?.account_id || "")
      .then((res: boolean) => {
        setCanVote(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [account]);

  const handleWhitelist = async () => {
    if (!account?.account_id) return;
    setIsLoading(true);
    await whitelist_me(account?.account_id);
    setIsLoading(false);
    window.location.reload();
  };

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
                id: "all",
                name: "All",
                onClick: () => {
                  setTab("all");
                },
                active: tab === "all",
              },
              {
                id: "open",
                name: "Active",
                onClick: () => {
                  setTab("open");
                },
                active: tab === "open",
              },
            ]}
            sx={{
              mr: "auto",
            }}
          />
          {isLoading && <Loading sx={{ my: "auto" }} />}
          {!isLoading && disputes?.length < 1 && (
            <Heading as="h3" variant="cardHeading" my={"auto"}>
              No disputes found
            </Heading>
          )}
          {!isLoading &&
            disputes?.map((dispute: any, i: any) => (
              <DisputeCard
                showStamp={true}
                dispute={{
                  ...dispute,
                  title: "Dispute #" + dispute?.id,
                  store: dispute?.store_id,
                  prize: utils.format.formatNearAmount(
                    BigInt(dispute?.fee).toString(),
                    2
                  ),
                }}
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
            {account ? (
              <Button
                variant="primary"
                sx={{ width: "100%" }}
                onClick={handleWhitelist}
              >
                Apply to join
              </Button>
            ) : (
              <Button variant="connect" sx={{ width: "100%" }} onClick={login}>
                Connect Wallet to Apply
              </Button>
            )}
            <Paragraph variant="sidebarText" mt={2}>
              The platform is currently in testnet, so you will be instantly
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
