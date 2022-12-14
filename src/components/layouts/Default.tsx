import Head from "next/head";
import { Box, Paragraph } from "theme-ui";
import Header from "../Header";
import Footer from "../Footer";
import Loading from "../common/Loading";

export default function DefaultLayout({
  children,
  headerVariant,
  loading,
  statusErrors,
  ...rest
}: {
  children: React.ReactNode;
  headerVariant?: string;
  loading?: boolean;
  statusErrors: any;
}) {
  return (
    <>
      <Head>
        <title>DEER - Your Decentralized Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header variant={headerVariant} statusErrors={statusErrors} />
      <Box
        sx={{
          position: "relative",
          variant: "background.background",
          pt: 70,
          height: "100%",
          minHeight: "100vh",
        }}
        {...rest}
      >
        {loading ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </Box>
        ) : (
          children
        )}
      </Box>
      <Footer />
    </>
  );
}
