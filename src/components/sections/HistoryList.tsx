import { Box, Heading, Paragraph, Text } from "theme-ui";

export default function HistoryList({
  items,
}: {
  items: {
    subject?: string | any;
    verb?: string | any;
    object?: string | any;
    objectSx?: string | any;
    time?: string | any;
  }[];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 3,
        maxHeight: 360,
        height: "100%",
        overflowY: "scroll",
        pb: 3,
      }}
    >
      {items?.map((item: any, index: any) => (
        <Paragraph
          key={index}
          sx={{
            borderLeft: "2px solid",
            borderColor: "primary",
            backgroundColor: "#F6F6F6",
            py: 2,
            my: 2,
            px: 3,
          }}
        >
          <Text>{item?.subject}</Text> <Text>{item?.verb}</Text>{" "}
          <Text sx={item?.objectSx}>{item?.object}</Text>{" "}
          <Text sx={{ opacity: 0.6, ml: 2 }} variant="tiny">
            {item?.time}
          </Text>{" "}
        </Paragraph>
      ))}
    </Box>
  );
}
