import { Box, Container, Link, Paragraph } from "theme-ui";
import Logo from "./svg/logo";

import Twitter from "./svg/twitter";
import Discord from "./svg/discord";
import Telegram from "./svg/telegram";
import Github from "./svg/github";
import Astro from "./svg/astro";

const socials = [
  {
    name: "Twitter",
    href: "https://twitter.com/DEERMarketplace",
    icon: <Twitter width={24} />,
  },
  {
    name: "Discord",
    href: "#",
    icon: <Discord width={24} />,
  },
  {
    name: "Telegram",
    href: "#",
    icon: <Telegram width={24} />,
  },
  {
    name: "Github",
    href: "https://github.com/DeerMarket",
    icon: <Github width={24} />,
  },
  {
    name: "DAO",
    href: "https://app.astrodao.com/dao/deer.sputnik-dao.near",
    icon: <Astro width={24} />,
  },
];

export default function Footer() {
  return (
    <Box
      sx={{
        minHeight: 300,
        py: 5,
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo size={6} variant="" />
        <Paragraph
          sx={{
            maxWidth: 500,
            mt: 3,
          }}
        >
          A decentralized marketplace for physical products, digital products,
          services, and more.
        </Paragraph>
      </Container>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            mb: 4,
          }}
        >
          {socials.map((social, i) => {
            return (
              <Link
                key={i}
                sx={{
                  cursor: "pointer",
                  color: "text",
                  display: "flex",
                  gap: 2,
                  "&:hover": {
                    color: "primary",
                    textDecoration: "none",
                  },
                }}
                href={social?.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social?.icon} {social?.name}
              </Link>
            );
          })}
        </Box>
        <Box>
          <Paragraph sx={{ textAlign: "center", mt: 3 }} variant="tiny">
            Currently running on NEAR testnet. All data/transactions are fake
            and for demo purposes only.
          </Paragraph>
        </Box>
      </Container>
    </Box>
  );
}
