import Head from "next/head";
import { Flex } from "theme-ui";
import Header from "../Header";

export default function FormLayout({ children, ...rest }: any) {
  return (
    <>
      <Head>
        <title>DeerJobs - form</title>
        <meta name="description" content="DeerJobs form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Flex
        sx={{
          position: "relative",
          minHeight: "100vh",
          flexDirection: "column",
          pt: 120,
        }}
        {...rest}
      >
        {children}
      </Flex>
    </>
  );
}
