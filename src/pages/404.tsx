import Link from "next/link";
import Lottie from "react-lottie-player";
import { Box, Button, Container, Heading } from "theme-ui";
import DefaultLayout from "../components/layouts/Default";

export default function FourOhFour() {
  return (
    <DefaultLayout>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "84vh",
        }}
      >
        <Box>
          <Lottie
            loop
            animationData={require("../assets/animations/404.json")}
            play
            sx={{
              width: 600,
              height: 600,
              maxWidth: "100vw",
              maxHeight: "100vh",
            }}
          />
        </Box>
        <Heading
          as="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          Sorry! The page you’re looking for cannot be found.
        </Heading>
        <Link href="/">
          <a>
            <Button variant="outline">Go To Homepage</Button>
          </a>
        </Link>
      </Container>
    </DefaultLayout>
  );
}
