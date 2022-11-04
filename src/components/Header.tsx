/** @jsxImportSource theme-ui */

import Link from "next/link";
import { useState } from "react";
import { Box, Button, Container, Flex, NavLink } from "theme-ui";
import { useNear } from "../contexts/Near";
import { useAction } from "../hooks/useAction";
import Logo from "./svg/logo";

export default function Header({ variant = "default", ...rest }) {
  const { login } = useAction();
  const { wallet } = useNear();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConnect = async (e: any) => {
    e.preventDefault();
    await login();
  };

  return (
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
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          py: 3,
          color: variant == "light" ? "white" : "primary",
        }}
        // variant="wide"
      >
        <Link href={"/"} passHref>
          <a>
            <Logo
              variant={variant == "light" ? "full-white" : "default"}
              size={2}
            />
          </a>
        </Link>

        {/* laptop navigation */}
        <Flex
          as="nav"
          mr={"auto"}
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
          }}
        >
          {wallet?.isSignedIn() ? (
            <Link href="/dashboard" passHref>
              <NavLink p={2}>Dashboard</NavLink>
            </Link>
          ) : (
            <NavLink>
              <Button
                variant="smallCTA"
                bg="black"
                color="white"
                onClick={handleConnect}
              >
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
              maxWidth: "360px",
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

            <hr
              sx={{
                opacity: 0.2,
                mx: 3,
              }}
            />

            {wallet?.isSignedIn() ? (
              <Link href="/dashboard" passHref>
                <NavLink p={2}>Dashboard</NavLink>
              </Link>
            ) : (
              <NavLink
                sx={{
                  py: 3,
                }}
              >
                <Button
                  variant="smallCTA"
                  bg="black"
                  color="white"
                  onClick={handleConnect}
                >
                  Connect Wallet
                </Button>
              </NavLink>
            )}
          </Flex>
        )}
      </Container>
    </Box>
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
