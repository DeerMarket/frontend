/** @jsxImportSource theme-ui */

import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Container, Flex, NavLink, Paragraph } from "theme-ui";
import { useAction } from "../hooks/useAction";
import { useData } from "../hooks/useData";
import UserButton from "./sections/UserButton";
import Logo from "./svg/logo";

export default function Header({
  variant = "default",
  statusErrors,
  ...rest
}: any) {
  const { login } = useAction();
  const { account } = useData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConnect = async (e: any) => {
    e.preventDefault();
    await login();
  };

  const allGood =
    !statusErrors || (!statusErrors?.graph && !statusErrors?.near);

  return (
    <>
      {!allGood && (
        <Box
          sx={{
            height: 20,
          }}
        />
      )}
      <Box
        as="header"
        {...rest}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {!allGood && (
          <Flex
            sx={{
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              color: "red",
              width: "100%",
              p: 2,
            }}
          >
            <Flex
              sx={{
                minHeight: "15px",
                minWidth: "15px",
                borderRadius: "50%",
                bg: "red",
                mr: 2,
              }}
            ></Flex>
            <Paragraph sx={{ color: "red", opacity: 1 }} variant="tiny">
              {statusErrors?.graph || statusErrors?.near}
            </Paragraph>
          </Flex>
        )}
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            pb: 3,
            pt: allGood ? 3 : 0,
            color: variant == "light" ? "white" : "primary",
          }}
          // variant="wide"
        >
          <Link href={"/"} passHref>
            <a>
              <Logo size={2} />
            </a>
          </Link>

          {/* laptop navigation */}
          <Flex
            as="nav"
            ml={[1, 1, 1, 4]}
            sx={{
              display: ["none", "none", "flex", "flex"],
            }}
          >
            <Link href="/stores" passHref>
              <NavLink mr={4} p={2}>
                Explore Stores
              </NavLink>
            </Link>
            <Link href="/disputes" passHref>
              <NavLink p={2}>Solve Disputes</NavLink>
            </Link>
          </Flex>

          <Flex
            as="nav"
            sx={{
              display: ["none", "none", "flex", "flex"],
              ml: "auto",
            }}
          >
            {account && Router.pathname != "/" && (
              <Link href="/dashboard/stores/create" passHref>
                <Button
                  as="a"
                  sx={{
                    my: "auto",
                    mr: 3,
                    display: ["none", "none", "none", "unset"],
                  }}
                  variant={"outline"}
                >
                  Create Store
                </Button>
              </Link>
            )}
            {account ? (
              <Link href="/dashboard" passHref>
                <NavLink title="dashboard">
                  <UserButton account={account} />
                </NavLink>
              </Link>
            ) : (
              <NavLink>
                <Button variant="connect" onClick={handleConnect}>
                  Connect Wallet
                </Button>
              </NavLink>
            )}
          </Flex>

          {/* mobile navigation */}
          <MobileNavButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isOpened={isMenuOpen}
          />
          {isMenuOpen && (
            <Flex
              sx={{
                display: ["flex", "flex", "none", "none"],
                position: "fixed",
                py: 2,
                top: 64,
                variant: "box.card",
                right: 0,
                maxWidth: "500px",
                width: "100%",
                flexDirection: "column",
                borderRadius: 0,
                gap: 2,
                textAlign: "center",
              }}
            >
              <Link href="/stores" passHref>
                <NavLink p={2}>Explore Stores</NavLink>
              </Link>
              <Link href="/disputes" passHref>
                <NavLink p={2}>Solve Disputes</NavLink>
              </Link>
              {account && Router.pathname != "/" && (
                <Link href="/dashboard/stores/create" passHref>
                  <NavLink p={2}>Create a Store</NavLink>
                </Link>
              )}

              <hr
                sx={{
                  opacity: 0.2,
                  mx: 3,
                }}
              />

              {account ? (
                <Link href="/dashboard" passHref>
                  <NavLink title="dashboard">
                    <UserButton account={account} />
                  </NavLink>
                </Link>
              ) : (
                <NavLink
                  sx={{
                    py: 3,
                  }}
                >
                  <Button variant="connect" onClick={handleConnect}>
                    Connect Wallet
                  </Button>
                </NavLink>
              )}
            </Flex>
          )}
        </Container>
      </Box>
    </>
  );
}

const MobileNavButton = ({
  onClick,
  isOpened,
}: {
  onClick: () => void;
  isOpened: boolean;
}) => {
  /**
   * credit: https://uiverse.io/Ali-Tahmazi99/unlucky-termite-68
   */
  return (
    <div
      sx={{
        ml: "auto",
        display: ["flex", "flex", "none", "none"],
      }}
    >
      <label
        htmlFor="navToggle"
        className="bar"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <input id="navToggle" type="checkbox" checked={isOpened} readOnly />

        <span
          sx={{
            bg: "primary",
          }}
          className="top"
        ></span>
        <span
          sx={{
            bg: "primary",
          }}
          className="middle"
        ></span>
        <span
          sx={{
            bg: "primary",
          }}
          className="bottom"
        ></span>
      </label>
      <style jsx>{`
        input[type="checkbox"] {
          -webkit-appearance: none;
          display: none;
          visibility: hidden;
        }

        .bar {
          position: relative;
          cursor: pointer;
          width: 30px;
          height: 25px;
        }

        .bar span {
          position: absolute;
          width: 100%;
          height: 4px;
          border-radius: 100px;
          display: inline-block;
          transition: 0.3s ease;
          left: 0;
        }

        .bar span.top {
          top: 0;
        }

        .bar span.middle {
          top: 50%;
          transform: translateY(-50%);
        }

        .bar span.bottom {
          bottom: 0;
        }

        input[type]:checked ~ span.top {
          transform: rotate(45deg);
          transform-origin: top left;
          width: 100%;
          left: 3px;
        }

        input[type]:checked ~ span.bottom {
          transform: rotate(-45deg);
          transform-origin: top left;
          width: 100%;
          bottom: 0;
          box-shadow: 0 0 10px #00000080;
        }

        input[type]:checked ~ span.middle {
          transform: translateX(-20px);
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
