import Head from "next/head";
import { Box, Container, Flex } from "theme-ui";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../dashboard/SideBar";
import Loading from "../common/Loading";

export default function DefaultLayout({
  children,
  tab,
  loading = false,
  ...rest
}: {
  children: React.ReactNode;
  tab?: string;
  loading?: boolean;
}) {
  return (
    <>
      <Head>
        <title>DeerJobs - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          variant: "background.background",
        }}
        {...rest}
      >
        <Container
          sx={{
            py: [40, 40, 72],
            mt: 4,
            minHeight: ["auto", "auto", "100vh"],
            display: "flex",
            flexDirection: ["column", "column", "row"],
          }}
        >
          <Box
            sx={{
              maxWidth: ["100vw", "100vw", 135],
              width: "100%",
              height: "100%",
              flex: 1,
              mb: [40, 40, 0],
            }}
          >
            <SideBar
              tab={tab}
              sx={{
                position: ["relative", "relative", "fixed"],
              }}
            />
          </Box>

          <Flex
            sx={{
              flexDirection: "column",
              flex: 1,
            }}
          >
            {!loading && children}
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading />
              </Box>
            )}
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
