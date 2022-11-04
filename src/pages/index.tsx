import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Flex, Heading, Paragraph } from "theme-ui";
import DefaultLayout from "../components/layouts/Default";
import BuiltPNG from "../assets/png/built.png";

const Home: NextPage = () => {
  return (
    <DefaultLayout headerVariant="dark">
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
          sx={{
            mt: "auto",
            mb: 0,
          }}
        >
          Welcome to <span sx={{ color: "primary" }}>deer</span>
        </Heading>

        <Heading
          as="h1"
          sx={{
            fontSize: [5, 5, 5, 6, 6],
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
          }}
        >
          Using the power of the NEAR blockchain, we are building a trustless,
          transparent, and secure marketplace for the community. Where you can
          buy and sell items physically or digitally.
        </Paragraph>

        <Flex sx={{ justifyContent: "center", gap: [3, 3, 3, 4, 4] }}>
          <Link href="/stores" passHref>
            <Button as="a" variant="primary">
              Explore Stores
            </Button>
          </Link>

          <Link href="/dashboard" passHref>
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
          height: "90vh",
          variant: "background.mesh",
          mb: 4,
          mt: 3,
          py: 5,
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
          <Heading
            as="h2"
            sx={{
              color: "white",
              fontSize: [4, 4, 4, 5, 5],
            }}
          >
            One Marketplace. Many Stores.
          </Heading>
          <Paragraph
            sx={{
              color: "white",
              maxWidth: 800,
              mb: 4,
              mt: 3,
            }}
          >
            Each store is a decentralized smart contract deployed on NEAR. This
            means that each store is owned and operated by the store owner.
          </Paragraph>
        </Container>
      </Box>
    </DefaultLayout>
  );
};

export default Home;
