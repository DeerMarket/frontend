import { utils } from "near-api-js";
import { Box, Text } from "theme-ui";
import { Account } from "../../contexts/WalletSelector";
import Price from "../common/Price";

export default function UserButton({ account }: { account: Account }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        pl: 2,
        pr: 3,
        py: 2,
        bg: "muted",
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Text
        sx={{
          ml: "12px",
        }}
      >
        {account?.account_id}
      </Text>
      <Text
        sx={{
          bg: "white",
          color: "text",
          borderRadius: 13,
          px: 2,
          py: "2px",
        }}
      >
        <Price amount={utils.format.formatNearAmount(account?.amount, 2)} />
      </Text>
    </Box>
  );
}
