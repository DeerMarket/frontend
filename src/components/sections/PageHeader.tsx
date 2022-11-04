import React from "react";
import { Box, Container, Heading, Paragraph } from "theme-ui";

export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        py: [2, 2, 4],
      }}
      variant="background.bottom.0"
    >
      <Container>
        <Heading as="h1" variant="pageHeading">
          {title}
        </Heading>
        <Paragraph variant="pageSubHeading">{subtitle}</Paragraph>
        {children}
      </Container>
    </Box>
  );
}
