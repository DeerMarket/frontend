import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Flex, Heading, Paragraph } from "theme-ui";
import DefaultLayout from "../components/layouts/Default";
import BuiltPNG from "../assets/png/built.png";
import MediaWithCredit from "../components/common/MediaWithCredit";

// TODO: Lazy load images and animations

const Home: NextPage = ({ statusErrors }: any) => {
  return (
    <DefaultLayout headerVariant="dark" statusErrors={statusErrors}>
      <Container
        sx={{
          height: "85vh",
          maxHeight: 800,
          display: "flex",
          gap: 2,
          pb: 4,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Heading
          as="h3"
          mb={3}
          sx={{
            mt: "auto",
            mb: 0,
          }}
        >
          Welcome to <span sx={{ color: "primary" }}>deer</span>
        </Heading>

        <Heading
          as="h1"
          variant="h1"
          sx={{
            mb: 2,
            mt: 0,
          }}
        >
          Your Decentralized <span sx={{ color: "primary" }}>Marketplace</span>{" "}
          on Near
        </Heading>

        <Paragraph
          sx={{
            mb: [3, 3, 3, 4, 4],
            maxWidth: 800,
            px: 3,
            fontSize: [1, 1, 1, 2, 2],
            lineHeight: 1.8,
          }}
        >
          {/* Buy and sell items personally or digitally on our trustless
          marketplace - it's up to each individual what they want their
          experience in this new era for commerce! */}
          {/* Deer is an innovative, cutting-edge platform that allows you to buy and sell items with complete transparency. No more relying on third party platforms or trusting someone else's words - everything can be seen by everyone in real time! */}
          {/* DEER is a trustless, transparent and secure marketplace for the community. Where you can buy or sell items physically (in person) as well digitally with no need of an inconvenient third party! */}
          We&apos;re changing the way people buy and sell items by creating a
          trustless, transparent marketplace with no need for third party
          interference. Join us on this journey!
        </Paragraph>

        <Flex sx={{ justifyContent: "center", gap: [3, 3, 3, 4, 4] }}>
          <Link href="/stores" passHref>
            <Button as="a" variant="primary">
              Explore Stores
            </Button>
          </Link>

          <Link href="/dashboard/stores" passHref>
            <Button as="a" variant="outline">
              Create Store
            </Button>
          </Link>
        </Flex>

        <Box
          sx={{
            mt: "auto",
          }}
        >
          <a href="https://near.org" target="_blank" rel="noreferrer">
            <Image src={BuiltPNG} alt="Built on NEAR" height={48} width={213} />
          </a>
        </Box>
      </Container>
      <Box
        sx={{
          variant: "background.mesh",
          color: "dark",
          mt: 4,
          pt: 4,
          pb: 4,
          mb: "-1px",
          borderTopLeftRadius: "15vw",
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 4,
          }}
        >
          <Heading as="h2" variant="h2">
            One Marketplace. Many Stores.
          </Heading>
          <Paragraph
            sx={{
              maxWidth: 800,
              mb: 4,
              mt: 3,
            }}
          >
            {/* Buy and sell anything you want on deer, the world's first 100% decentralized marketplace. With Deer, you can be sure that your transactions are secure and fair. Our arbitration and escrow features help to resolve disputes quickly and easily, and our trustless escrow system ensures that your funds are always safe. Plus, our fast transaction times mean that you'll never have to wait long for your purchases to go through. So what are you waiting for? Start shopping today! */}
            Each store is a decentralized smart contract on the NEAR blockchain.
            This means that no one has the upper hand - everyone is fairly and
            equally in control.
          </Paragraph>
          <Flex
            sx={{
              gap: 4,
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "center",
              my: 4,
            }}
          >
            <Box
              variant="box.light"
              sx={{
                p: 4,
                width: ["100%", "100%", "40%", "30%"],
                textAlign: "center",
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: [2, 2, 2, 3, 3],
                }}
                mb={3}
              >
                Buy/Sell Anything
              </Heading>
              <Paragraph mb={0}>
                Physical or digital items. You can sell anything on deer even
                your services.
              </Paragraph>
            </Box>
            <Box
              variant="box.light"
              sx={{
                p: 4,
                width: ["100%", "100%", "40%", "30%"],
                textAlign: "center",
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: [2, 2, 2, 3, 3],
                }}
                mb={3}
              >
                100% Decentralized
              </Heading>
              <Paragraph mb={0}>
                Deer is built on NEAR blockchain and only uses decentralized
                technologies to operate.
              </Paragraph>
            </Box>
            <Box
              variant="box.light"
              sx={{
                p: 4,
                width: ["100%", "100%", "40%", "30%"],
                textAlign: "center",
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: [2, 2, 2, 3, 3],
                }}
                mb={3}
              >
                Arbitration &amp; Escrow
              </Heading>
              <Paragraph mb={0}>
                We have built in arbitration and escrow features to help you
                resolve disputes with your customers.
              </Paragraph>
            </Box>
            <Box
              variant="box.light"
              sx={{
                p: 4,
                width: ["100%", "100%", "40%", "30%"],
                textAlign: "center",
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: [2, 2, 2, 3, 3],
                }}
                mb={3}
              >
                Trustless escrow
              </Heading>
              <Paragraph mb={0}>
                We secure your trades and funds with a trustless contract. And
                you can review the code yourself to know exactly how it works.
              </Paragraph>
            </Box>
            <Box
              variant="box.light"
              sx={{
                p: 4,
                width: ["100%", "100%", "40%", "30%"],
                textAlign: "center",
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: [2, 2, 2, 3, 3],
                }}
                mb={3}
              >
                Fair Dispute Resolution
              </Heading>
              <Paragraph mb={0}>
                In the event of a dispute, we use a decentralized voting system
                to ensure that the outcome is fair and unbiased.
              </Paragraph>
            </Box>
            <Box
              variant="box.light"
              sx={{
                p: 4,
                width: ["100%", "100%", "40%", "30%"],
                textAlign: "center",
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: [2, 2, 2, 3, 3],
                }}
                mb={3}
              >
                Less Fees. Faster Transactions.
              </Heading>
              <Paragraph mb={0}>
                The process of buying and selling on deer is cheaper and faster
                than any other Web2 marketplace.
              </Paragraph>
            </Box>
          </Flex>
          <Box>
            <Button>Learn More</Button>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          background: "white",
          pb: 6,
          pt: 5,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            gap: "160px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: [
                "column-reverse",
                "column-reverse",
                "column-reverse",
                "row",
              ],
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box
              sx={{
                maxWidth: 600,
              }}
            >
              <Heading
                as="h2"
                variant="h2"
                sx={{
                  mr: "auto",
                }}
              >
                The Benefits for Sellers
              </Heading>
              <Paragraph mb={4}>
                As a seller, you can enjoy sell anything you want on a store
                controlled by you. And you can rest assured that all your
                transactions are secure.
              </Paragraph>
              <List
                items={[
                  "Create your own 100% decentralized store with ease.",
                  "Eliminate the need for costly third-party fees.",
                  "Enjoy Faster & simpler transactions between you and buyers",
                ]}
              />
            </Box>

            <MediaWithCredit
              lottie={require("../assets/animations/woman-work.json")}
              play
              width={600}
              height={360}
              creditLink="https://lottiefiles.com/Mikhail_V94"
              credit="Mikhail"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: [
                "column-reverse",
                "column-reverse",
                "column-reverse",
                "row-reverse",
              ],
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box
              sx={{
                maxWidth: 600,
              }}
            >
              <Heading
                as="h2"
                variant="h2"
                sx={{
                  mr: "auto",
                }}
              >
                The Benefits for Buyers
              </Heading>
              <Paragraph mb={4}>
                As a buyer, you can enjoy a wide variety of products and
                services from sellers all over the world. And you can rest
                assured that all your funds are secure.
              </Paragraph>
              <List
                items={[
                  "Shop with confidence knowing that your funds are safe.",
                  "Enjoy a frictionless buying experience.",
                  "Easily check the reputation of sellers before making a purchase.",
                ]}
              />
            </Box>
            <MediaWithCredit
              lottie={require("../assets/animations/store.json")}
              play
              width={600}
              height={360}
              creditLink="https://lottiefiles.com/Mikhail_V94"
              credit="Mikhail"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: [
                "column-reverse",
                "column-reverse",
                "column-reverse",
                "row",
              ],
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box
              sx={{
                maxWidth: 600,
              }}
            >
              <Heading
                as="h2"
                variant="h2"
                sx={{
                  mr: "auto",
                }}
              >
                The Benefits for the Community
              </Heading>
              <Paragraph mb={4}>
                As a community member, you can enjoy helping to build a
                decentralized marketplace that is fair and secure for everyone.
                While also earning rewards for your contributions.
              </Paragraph>
              <List
                items={[
                  "A new way to earn money by solving disputes.",
                  "A new way to earn money by reporting stores that violate community terms.",
                  "Be a part of a community that is building the future of commerce.",
                ]}
              />
            </Box>

            <MediaWithCredit
              lottie={require("../assets/animations/community.json")}
              play
              width={600}
              height={360}
              creditLink="https://lottiefiles.com/Mikhail_V94"
              credit="Mikhail"
            />
          </Box>
        </Container>
      </Box>
    </DefaultLayout>
  );
};

export default Home;

const List = ({ items }: { items: string[] }) => {
  return (
    <ul
      sx={{
        ml: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <svg
            width="26px"
            height="26px"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
              strokeWidth="4"
              strokeLinejoin="round"
              sx={{
                fill: "white",
                stroke: "black",
              }}
            />
            <path
              d="M16 24L22 30L34 18"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              sx={{
                stroke: "black",
              }}
            />
          </svg>
          <Heading as="h3" my={0}>
            {item}
          </Heading>
        </li>
      ))}
    </ul>
  );
};
