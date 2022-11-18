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
  } else {
    return <Box>{status}</Box>;
  }
}
