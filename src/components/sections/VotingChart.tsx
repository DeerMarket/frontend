import { Box, Heading, Text } from "theme-ui";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";

export default function VotingChart({ buyer, seller, split }: any) {
  const total = buyer + seller + split;
  const buyerPercent = (buyer / total) * 100;
  const sellerPercent = (seller / total) * 100;
  const splitPercent = (split / total) * 100;

  const data = [];
  if (buyerPercent > 0) {
    data.push({ title: "Buyer", value: buyerPercent, color: "#2fd5a9" });
  }
  if (sellerPercent > 0) {
    data.push({ title: "Seller", value: sellerPercent, color: "#f97979" });
  }
  if (splitPercent > 0) {
    data.push({ title: "Split", value: splitPercent, color: "#cf8d04" });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row"],
        mx: ["auto", "auto", 0],
        my: 2,
        alignContent: "center",
        maxWidth: "100%",
        width: "300px",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: ["row", "row", "column"],
          justifyContent: "space-between",
          minWidth: "60px",
          py: [0, 0, 3],
        }}
      >
        <Box color="#2fd5a9">
          <Heading
            as="h4"
            variant="tiny"
            sx={{
              fontWeight: 700,
            }}
          >
            Buyer
          </Heading>
          <Heading as="h3" mb={2}>
            {buyer}
          </Heading>
        </Box>
        <Box color="#f97979">
          <Heading
            as="h4"
            variant="tiny"
            sx={{
              fontWeight: 700,
            }}
          >
            Seller
          </Heading>
          <Heading as="h3" mb={2}>
            {seller}
          </Heading>
        </Box>
        <Box color="#cf8d04">
          <Heading
            as="h4"
            variant="tiny"
            sx={{
              fontWeight: 700,
            }}
          >
            Split
          </Heading>
          <Heading as="h3" mb={2}>
            {split}
          </Heading>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PieChart
          data={data}
          label={({ dataEntry }) => dataEntry.value + "%"}
          radius={pieChartDefaultProps.radius - 6}
          paddingAngle={5}
          lineWidth={60}
          labelPosition={100 - 60 / 2}
          labelStyle={{
            fontSize: 7,
            fontFamily: "inherit",
            fontWeight: 600,
            fill: "#000",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </Box>
    </Box>
  );
}
