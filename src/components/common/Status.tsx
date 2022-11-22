import { Box } from "theme-ui";

export default function Status({ status }: { status: string }) {
  status = status ? status.toLowerCase() : "";
  if (status === "pending") {
    return <Box sx={{ color: "primary" }}>Pending</Box>;
  } else if (status === "shipped") {
    return <Box sx={{ color: "primary" }}>Shipped</Box>;
  } else if (status === "completed") {
    return <Box sx={{ color: "green" }}>Completed</Box>;
  } else if (status === "cancelled") {
    return <Box sx={{ color: "red" }}>Cancelled</Box>;
  } else if (status === "disputed") {
    return <Box sx={{ color: "orange" }}>Disputed</Box>;
  } else if (status === "resolved") {
    return <Box sx={{ color: "green" }}>Resolved</Box>;
  } else if (status === "sellerwon") {
    return <Box sx={{ color: "red" }}>Seller Won</Box>;
  } else if (status === "buyerwon") {
    return <Box sx={{ color: "green" }}>Buyer Won</Box>;
  } else if (status === "draw") {
    return <Box sx={{ color: "orange" }}>Draw</Box>;
  } else if (status === "voting") {
    return <Box sx={{ color: "primary" }}>Voting</Box>;
  } else {
    return <Box>{status}</Box>;
  }
}
