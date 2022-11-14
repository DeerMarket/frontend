import { Box, Heading } from "theme-ui";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";

export default function VotingChart({ voting }: any) {
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
          <Heading as="h4" variant="tiny">
            yes
          </Heading>
          <Heading as="h3" mb={2}>
            {voting?.results?.yes}%
          </Heading>
        </Box>
        <Box color="#f97979">
          <Heading as="h4" variant="tiny">
            no
          </Heading>
          <Heading as="h3" mb={2}>
            {voting?.results?.no}%
          </Heading>
        </Box>
        <Box color="#cf8d04">
          <Heading as="h4" variant="tiny">
            split
          </Heading>
          <Heading as="h3" mb={2}>
            {voting?.results?.split}%
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
          data={[
            {
              title: "Yes",
              value: voting?.results?.yes,
              color: "#58F7CD",
            },
            {
              title: "No",
              value: voting?.results?.no,
              color: "#f97979",
            },
            {
              title: "Split",
              value: voting?.results?.split,
              color: "#F7C358",
            },
          ]}
          label={({ dataEntry }) => dataEntry.value + "%"}
          radius={pieChartDefaultProps.radius - 6}
          paddingAngle={3}
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
