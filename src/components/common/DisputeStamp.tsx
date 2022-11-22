import { Box } from "theme-ui";
import Status from "./Status";

export default function DisputeStamp({
  status,
  ...rest
}: {
  status: "SellerWon" | "BuyerWon" | "Draw" | "Voting" | string;
  [key: string]: any;
}) {
  return (
    <Box
      sx={{
        fontSize: 3,
        fontWeight: 800,
        borderRadius: "50%",
        height: "4.4em",
        width: "4.4em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        lineHeight: "1.2em",
        border: "2px dashed",
        borderColor:
          status === "SellerWon"
            ? "red"
            : status === "BuyerWon"
            ? "green"
            : status === "Draw"
            ? "orange"
            : "primary",
      }}
      {...rest}
    >
      <Status status={status} />
    </Box>
  );
}
