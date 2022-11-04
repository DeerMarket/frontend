import type { NextPage } from "next";
import Link from "next/link";
import { Box, Button, Container, Flex, Heading, Paragraph } from "theme-ui";
import DefaultLayout from "../components/layouts/Default";

const Home: NextPage = () => {
  return (
    <DefaultLayout headerVariant="dark">
      <Box
        sx={{
          variant: "backgrounds.mesh",
          color: "black",
          mt: -72,
        }}
      >
        <Container
          sx={{
            height: 600,
            display: "flex",
            gap: 2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            textAlign: "start",
          }}
        >
          <Heading
            as="h1"
            sx={{
              fontSize: "6",
              fontWeight: "medium",
              maxWidth: 650,
              fontFamily: "serif",
            }}
          >
            Decentralized Marketplace For All Your Needs
          </Heading>

          <Paragraph
            sx={{
              mb: 4,
              maxWidth: 800,
            }}
          >
            We are using the power of blockchain to secure payments and
            decentralize client to provider relationships. To create a fair,
            trustless and transparent experience for everyone.
          </Paragraph>

          <Button>Learn more</Button>
        </Container>
      </Box>
      <Box
        sx={{
          height: "200vh",
        }}
      ></Box>
    </DefaultLayout>
  );
};

export default Home;
