import { NextPageContext } from "next";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Paragraph,
  Select,
} from "theme-ui";
import DefaultLayout from "../../components/layouts/Default";
import DisputeCard from "../../components/sections/DisputeCard";
import HistoryList from "../../components/sections/HistoryList";
import StoreCard from "../../components/sections/StoreCard";
import VotingChart from "../../components/sections/VotingChart";

export default function Dispute({ data }: any) {
  const [canVote, setCanVote] = useState(true);
  const [isBuyer, setIsBuyer] = useState(true);
  const [isSeller, setIsSeller] = useState(true);

  const historyItems = [
    {
      subject: "seller.near",
      verb: "started",
      object: "dispute",
      time: "2 days ago",
    },
    {
      subject: "voter1.near",
      verb: "voted",
      object: "yes",
      objectSx: {
        fontWeight: 600,
        color: "#2fd5a9",
      },
      time: "7 hours ago",
    },
    {
      subject: "voter2.near",
      verb: "voted",
      object: "no",
      objectSx: {
        fontWeight: 600,
        color: "#f97979",
      },
      time: "6 hours ago",
    },
    {
      subject: "voter3.near",
      verb: "voted",
      object: "yes",
      objectSx: {
        fontWeight: 600,
        color: "#2fd5a9",
      },
      time: "6 hours ago",
    },
    {
      subject: "voter4.near",
      verb: "voted",
      object: "split",
      objectSx: {
        fontWeight: 600,
        color: "#cf8d04",
      },
      time: "2 minutes ago",
    },
  ];
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
            mb: 4,
          }}
        >
          <StoreCard
            store={{
              id: data?.store?.id,
              name: data?.store?.name,
              image: data?.store?.logo,
            }}
            showExtra={false}
            sx={{
              variant: "none",
              p: 4,
            }}
          />
          <Heading
            as="h1"
            px={4}
            sx={{
              fontWeight: 700,
            }}
          >
            Dispute #{data?.dispute?.id}
          </Heading>
          <DisputeCard dispute={data?.dispute} />
        </Box>
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
                  {data?.dispute?.voting?.votes}/
                  {data?.dispute?.voting?.required}
                </Heading>
              </Box>
              <Box>
                <Heading as="h4" variant="tiny">
                  voting status
                </Heading>
                <Heading as="h3" variant="cardHeading" mb={4}>
                  {data?.dispute?.voting?.status}
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
            {data?.dispute?.voting?.status === "finished" ? (
              <VotingChart voting={data?.dispute?.voting} />
            ) : (
              "Results will be available after voting is finished."
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

            {data?.dispute?.voting?.status === "finished" ? (
              <HistoryList items={historyItems} />
            ) : (
              "History will be available after voting is finished."
            )}
          </Box>
        </Box>
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
              mb: 3,
            }}
          >
            Evidence
          </Heading>
          <Box
            sx={{
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
                  mb: 3,
                }}
              >
                Seller
              </Heading>
              {data?.dispute?.evidence?.seller?.length < 1 && (
                <Paragraph>No evidence provided.</Paragraph>
              )}
              {data?.dispute?.evidence?.seller?.map((evidence: any, i: any) => (
                <Box
                  key={i}
                  p={3}
                  sx={{
                    borderTop: "1px solid #eaeaea",
                  }}
                >
                  <Heading as="h5" variant="tiny">
                    evidence #{i}
                  </Heading>
                  <Paragraph>{evidence?.description}</Paragraph>
                  {evidence?.image && (
                    <a href={evidence?.image} target="_blank">
                      <Image
                        src={evidence?.image}
                        sx={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  )}
                </Box>
              ))}
              {isSeller && (
                <Button
                  sx={{
                    display: "block",
                    mx: "auto",
                    mt: "auto",
                  }}
                >
                  Add evidence
                </Button>
              )}
            </Box>
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
                  mb: 3,
                }}
              >
                Buyer
              </Heading>
              {data?.dispute?.evidence?.buyer?.length < 1 && (
                <Paragraph>No evidence provided.</Paragraph>
              )}
              {data?.dispute?.evidence?.buyer?.map((evidence: any, i: any) => (
                <Box
                  key={i}
                  p={3}
                  sx={{
                    borderTop: "1px solid #eaeaea",
                  }}
                >
                  <Heading as="h5" variant="tiny">
                    evidence #{i}
                  </Heading>
                  <Paragraph>{evidence?.description}</Paragraph>
                  {evidence?.image && (
                    <a href={evidence?.image} target="_blank">
                      <Image
                        src={evidence?.image}
                        sx={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  )}
                </Box>
              ))}
              {isBuyer && (
                <Button
                  sx={{
                    display: "block",
                    mx: "auto",
                    mt: "auto",
                  }}
                >
                  Add evidence
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        {canVote && (
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
                Read the dispute details carefully and the evidence provided by
                the seller and buyer. If you believe the seller is in the right,
                vote for the seller. If you believe the buyer is in the right,
                vote for the buyer. If you believe they should split the funds,
                vote for split.
              </Paragraph>
              <Box sx={{ display: "flex" }}>
                <Select
                  sx={{
                    width: "180px",
                    variant: "input.default",
                    height: "100%",
                    my: 0,
                  }}
                >
                  <option disabled selected>
                    Select a vote
                  </option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                  <option value="split">Split</option>
                </Select>
                <Button
                  variant="default"
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  Vote
                </Button>
              </Box>
              <Paragraph>
                If your vote is dishonest or not justified, you may lose your
                stacked funds and lose the ability to vote in future disputes.
              </Paragraph>
            </Box>
          </Box>
        )}
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
        disputer: "disputer3.testnet",
        item: "item3",
        store: "store3",
        endsAt: 1668161456000,
        prize: 88.56,
        voting: {
          required: 100,
          votes: 50,
          period: "1 day",
          status: "finished",
          results: {
            yes: 69,
            no: 24,
            split: 7,
          },
        },
        evidence: {
          seller: [
            {
              title: "Evidence 1",
              description: "Evidence 1 description",
              image: "https://picsum.photos/200",
            },
            {
              title: "Evidence 2",
              description: "Evidence 2 description",
            },
          ],
          buyer: [
            {
              title: "Evidence 1",
              description: "Evidence 1 description",
              image: "https://picsum.photos/200",
            },
          ],
        },
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
