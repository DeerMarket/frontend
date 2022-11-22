import { utils } from "near-api-js";
import { NextPageContext } from "next";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Link,
  Paragraph,
  Select,
} from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import AddEvidencePopup from "../../components/popups/AddEvidencePopup";
import DisputeCard from "../../components/sections/DisputeCard";
import HistoryList from "../../components/sections/HistoryList";
import StoreCard from "../../components/sections/StoreCard";
import VotingChart from "../../components/sections/VotingChart";
import { useAction } from "../../hooks/useAction";
import { useData } from "../../hooks/useData";
import A from "next/link";
import ItemCard from "../../components/sections/ItemCard";

export default function Dispute() {
  const router = useRouter();
  const { id: dispute_id } = router.query;

  /** State */
  const [dispute, setDispute] = useState<any>(null);
  const [evidences, setEvidences] = useState<any>(null);
  const [votes, setVotes] = useState<any>(null);
  const [store, setStore] = useState<any>(null);
  const [item, setItem] = useState<any>(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Functions */
  const {
    get_dispute,
    get_evidence,
    get_votes,
    can_vote,
    get_store_metadata,
    get_item,
    account,
  } = useData();
  const { add_evidence, vote, whitelist_me } = useAction();

  /* Handlers */
  const handleEvidence = async (description: string, link: string) => {
    await add_evidence(dispute_id as string, description, link);
    window.location.reload();
  };
  const handleVote = async (input: any) => {
    if (!input) return;
    await vote(dispute_id as string, input);
    window.location.reload();
  };
  const handleWhitelist = async () => {
    if (!account?.account_id) return;
    await whitelist_me(account.account_id);
    window.location.reload();
  };

  /** Data fetching */
  useEffect(() => {
    can_vote(account?.account_id || "").then((res) => {
      setIsWhitelisted(res);
    });
  }, [account]);
  useEffect(() => {
    if (dispute_id === undefined) return;
    setLoading(true);
    // Dispute
    get_dispute(dispute_id as string)
      .then((res) => {
        setDispute(res);
        console.log(res);

        get_store_metadata(res.store_id).then((res) => {
          setStore(res);
        });
        get_item(res?.store_id, res?.item_id).then((res) => {
          console.log(res);
          setItem(res);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // Evidences
    get_evidence(dispute_id as string)
      .then((res) => {
        let seller_evidence = res.filter(
          (e: any) => e.evidence_type.toLowerCase() == "seller"
        );
        let buyer_evidence = res.filter(
          (e: any) => e.evidence_type.toLowerCase() == "buyer"
        );
        setEvidences({
          seller: seller_evidence,
          buyer: buyer_evidence,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // Votes
    get_votes(dispute_id as string)
      .then((res) => {
        setVotes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispute_id]);

  const isSeller = account?.account_id == dispute?.seller_id;
  const isBuyer = account?.account_id == dispute?.buyer_id;
  const alreadyVoted =
    votes?.filter((v: any) => v.voter == account?.account_id).length > 0;

  return (
    <DefaultLayout loading={loading}>
      <Container
        sx={{
          py: 4,
        }}
      >
        <Box
          sx={{
            variant: "box.card",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "column", "row"],
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Heading
                as="h4"
                variant="tiny"
                sx={{
                  px: 4,
                  pt: 4,
                }}
              >
                Item Disputed
              </Heading>
              <A
                href={`/s/${dispute?.store_id}/item/${dispute?.item_id}`}
                passHref
              >
                <Box
                  sx={{
                    width: "100%",
                    p: 4,
                  }}
                >
                  <ItemCard
                    item={{
                      title: item?.metadata?.title,
                      price: item?.price,
                      images: item?.metadata?.images,
                    }}
                    horizontal={true}
                  />
                </Box>
              </A>
            </Box>
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Heading
                as="h4"
                variant="tiny"
                sx={{
                  px: 4,
                  pt: 4,
                }}
              >
                Store
              </Heading>
              <A href={`/s/${dispute?.store_id}`} passHref>
                <Box p={4}>
                  <StoreCard
                    store={{
                      id: dispute?.store_id,
                      name: store?.name,
                      image: store?.logo,
                    }}
                    showExtra={false}
                    sx={{
                      variant: "none",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </A>
            </Box>
          </Box>
          <DisputeCard
            dispute={{
              ...dispute,
              title: "Dispute #" + dispute?.id,
              store: dispute?.store_id,
              prize:
                dispute?.fee &&
                utils.format.formatNearAmount(
                  BigInt(dispute?.fee).toString(),
                  2
                ),
            }}
            sx={{
              pt: 0,
            }}
          />
        </Box>
        <VotingBox votes={votes} dispute={dispute} evidences={evidences} />
        <EvidenceBox
          canAdd={dispute?.status == "Voting" || dispute?.status == "Pending"}
          evidences={evidences}
          isSeller={isSeller}
          isBuyer={isBuyer}
          handleEvidence={handleEvidence}
          seller={dispute?.seller_id}
          buyer={dispute?.buyer_id}
        />
        {dispute?.status == "Voting" &&
          !alreadyVoted &&
          !isBuyer &&
          !isSeller &&
          isWhitelisted && <VoteBox handleVote={handleVote} />}

        {dispute?.status == "Voting" &&
          !alreadyVoted &&
          !isBuyer &&
          !isSeller &&
          !isWhitelisted && (
            <NotWhitelisted handleWhitelist={handleWhitelist} />
          )}
        {dispute?.status == "Voting" && alreadyVoted && <AlreadyVoted />}
      </Container>
    </DefaultLayout>
  );
}

const VotingBox = ({ votes, dispute, evidences }: any) => {
  /**
   * Processing votes
   */
  const totalVotes = votes?.length;
  const totalBuyerVotes = votes?.filter(
    (v: any) => v.vote_type?.toLowerCase() == "buyer"
  ).length;
  const totalSellerVotes = votes?.filter(
    (v: any) => v.vote_type?.toLowerCase() == "seller"
  ).length;
  const totalSplitVotes = votes?.filter(
    (v: any) => v.vote_type?.toLowerCase() == "draw"
  ).length;

  let historyItems: any = [
    {
      subject: dispute?.disputer === dispute?.buyer_id ? "Buyer" : "Seller",
      verb: "started",
      object: "dispute",
      time: dispute?.created_at,
    },
  ];
  votes?.forEach((v: any) => {
    historyItems.push({
      subject: v.voter,
      verb: "voted",
      object: v.vote_type,
      objectSx: {
        color:
          v.vote_type?.toLowerCase() == "buyer"
            ? "green"
            : v.vote_type?.toLowerCase() == "seller"
            ? "red"
            : "orange",
      },
      time: v.created_at,
    });
  });
  evidences?.seller?.forEach((e: any, i: any) => {
    historyItems.push({
      subject: "Seller",
      verb: "added",
      object: "evidence #" + i,
      time: e.created_at || 1668556629,
    });
  });
  evidences?.buyer?.forEach((e: any, i: any) => {
    historyItems.push({
      subject: "Buyer",
      verb: "added",
      object: "evidence #" + i,
      time: e.created_at || 1668556629,
    });
  });

  if (dispute?.status?.toLowerCase() != "voting") {
    historyItems.push({
      subject: "Dispute",
      verb: "result is",
      object: dispute?.status,
      objectSx: {
        color:
          dispute?.status?.toLowerCase() == "buyer"
            ? "green"
            : dispute?.status?.toLowerCase() == "seller"
            ? "red"
            : "orange",
      },
      time: dispute?.resolved_at,
    });
  }

  // Sort by time
  historyItems.sort((a: any, b: any) => {
    return a.time - b.time;
  });

  return (
    <Box
      sx={{
        variant: "box.card",
        p: 4,
        mb: 4,
        display: "grid",
        gridGap: 4,
        gridTemplateColumns: "1fr 1fr",
        "@media screen and (max-width: 800px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      <Box>
        <Heading
          as="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Voting
        </Heading>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: ["column", "column", "row"],
          }}
        >
          <Box>
            <Heading as="h4" variant="tiny">
              required votes
            </Heading>
            <Heading as="h3" variant="cardHeading" mb={4}>
              {totalVotes}/{dispute?.required_votes}
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" variant="tiny">
              voting status
            </Heading>
            <Heading as="h3" variant="cardHeading" mb={4}>
              {dispute?.status}
            </Heading>
          </Box>
        </Box>
        <Heading
          as="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Results
        </Heading>
        {dispute?.status == "Voting" ? (
          "Results will be available after voting is finished."
        ) : (
          <VotingChart
            buyer={totalBuyerVotes}
            seller={totalSellerVotes}
            split={totalSplitVotes}
          />
        )}
      </Box>
      <Box>
        <Heading
          as="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          History
        </Heading>

        {dispute?.status == "Voting" ? (
          "History will be available after voting is finished."
        ) : (
          <HistoryList items={historyItems} />
        )}
      </Box>
    </Box>
  );
};

const EvidenceBox = ({
  canAdd,
  evidences,
  isSeller,
  isBuyer,
  handleEvidence,
  seller,
  buyer,
}: any) => {
  const [showEvidencePopup, setShowEvidencePopup] = useState(false);

  return (
    <Box
      sx={{
        variant: "box.card",
        mb: 4,
        p: 4,
      }}
    >
      <Heading
        as="h2"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Evidence
      </Heading>
      <Paragraph>
        The buyer and seller can submit evidence below to support their case.
      </Paragraph>
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridGap: 4,
          gridTemplateColumns: "1fr 1fr",
          "@media screen and (max-width: 800px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Heading
            as="h3"
            sx={{
              fontWeight: 700,
              pb: 2,
              borderBottom: "1px solid #eaeaea",
            }}
          >
            Seller
            <Heading ml={2} variant="account">
              {seller}
            </Heading>
          </Heading>
          {evidences?.seller?.length < 1 && (
            <Paragraph mb={"auto"} mt={3}>
              No evidence provided.
            </Paragraph>
          )}

          {evidences?.seller?.map((evidence: any, i: any) => (
            <Box key={i}>
              <Heading
                as="h5"
                variant="tiny"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                evidence #{i}
              </Heading>
              <Paragraph my={0}>{evidence?.description}</Paragraph>
              {evidence?.link && (
                <Link
                  href={evidence?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {evidence?.link} 🡕
                </Link>
              )}
            </Box>
          ))}
          {canAdd && isSeller && (
            <Button
              sx={{
                display: "block",
                mx: "auto",
                mt: 3,
              }}
              onClick={() => {
                setShowEvidencePopup(true);
              }}
            >
              Add evidence
            </Button>
          )}
        </Box>
        <AddEvidencePopup
          show={showEvidencePopup}
          onCancel={() => {
            setShowEvidencePopup(false);
          }}
          onConfirm={(description: string, link: string) => {
            setShowEvidencePopup(false);
            handleEvidence(description, link);
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Heading
            as="h3"
            sx={{
              fontWeight: 700,
              pb: 2,
              borderBottom: "1px solid #eaeaea",
            }}
          >
            Buyer
            <Heading ml={2} variant="account">
              {buyer}
            </Heading>
          </Heading>

          {evidences?.buyer?.length < 1 && (
            <Paragraph mb={"auto"} mt={3}>
              No evidence provided.
            </Paragraph>
          )}

          {evidences?.buyer?.map((evidence: any, i: any) => (
            <Box key={i}>
              <Heading
                as="h5"
                variant="tiny"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                evidence #{i}
              </Heading>
              <Paragraph my={0}>{evidence?.description}</Paragraph>
              {evidence?.link && (
                <Link
                  href={evidence?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {evidence?.link} 🡕
                </Link>
              )}
            </Box>
          ))}
          {canAdd && isBuyer && (
            <Button
              sx={{
                display: "block",
                mx: "auto",
                mt: 3,
              }}
              onClick={() => {
                setShowEvidencePopup(true);
              }}
            >
              Add evidence
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const VoteBox = ({ handleVote }: any) => {
  const [voteInput, setVoteInput] = useState<any>(null);

  return (
    <Box
      sx={{
        variant: "box.card",
        p: 4,
        mb: 4,
      }}
    >
      <Heading
        as="h2"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Vote
      </Heading>
      <Box>
        <Paragraph mb={4}>
          Read the dispute details carefully and the evidence provided by the
          seller and buyer. If you believe the seller is in the right, vote for
          the seller. If you believe the buyer is in the right, vote for the
          buyer. If you believe they should split the funds, vote for split.
        </Paragraph>
        <Box sx={{ display: "flex" }}>
          <Select
            sx={{
              width: "180px",
              variant: "input.default",
              height: "100%",
              my: 0,
            }}
            value={voteInput}
            onChange={(e: any) => {
              setVoteInput(e.target.value);
            }}
          >
            <option disabled selected>
              Select a vote
            </option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
            <option value="Draw">Split</option>
          </Select>
          <Button
            variant="default"
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onClick={() => {
              handleVote(voteInput);
            }}
          >
            Vote
          </Button>
        </Box>
        <Paragraph>
          If your vote is dishonest or not justified, you may lose your stacked
          funds and lose the ability to vote in future disputes.
        </Paragraph>
      </Box>
    </Box>
  );
};

const NotWhitelisted = ({ handleWhitelist }: any) => {
  return (
    <Box
      sx={{
        variant: "box.card",
        p: 4,
        mb: 4,
      }}
    >
      <Heading
        as="h2"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Vote
      </Heading>
      <Box>
        <Paragraph mb={4}>
          To participate in the dispute resolution process, you must be a
          whitelisted member of the community. If you are not a member, you can
          apply to join the community by clicking the button below.
        </Paragraph>
        {/* TODO: Add link to whitelist application */}
        <Button variant="default" onClick={handleWhitelist}>
          Get Whitelisted
        </Button>
      </Box>
    </Box>
  );
};

const AlreadyVoted = () => {
  return (
    <Box
      sx={{
        variant: "box.card",
        p: 4,
        mb: 4,
      }}
    >
      <Heading
        as="h2"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Vote
      </Heading>
      <Box>
        <Paragraph mb={2}>
          You have already voted in this dispute. You can only vote once.
        </Paragraph>
      </Box>
    </Box>
  );
};
