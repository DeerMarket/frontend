import { Box, Heading, Paragraph, Text } from "theme-ui";

const toAgo = (timestamp: number) => {
  const d = new Date(timestamp / 1000000);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffHours = Math.floor(diff / (1000 * 3600));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  if (diffDays > 0) return diffDays + " days ago";
  if (diffHours > 0) return diffHours + " hours ago";
  if (diffMinutes > 0) return diffMinutes + " minutes ago";
  if (diffSeconds > 0) return diffSeconds + " seconds ago";
  return "just now";
};

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
          <Text
            sx={{
              fontWeight: 600,
            }}
          >
            {item?.subject}
          </Text>{" "}
          <Text>{item?.verb}</Text>{" "}
          <Text sx={{ ...item?.objectSx }}>{item?.object}</Text>{" "}
          <Text sx={{ opacity: 0.6, ml: 1 }} variant="tiny">
            {toAgo(Number(item?.time))}
          </Text>{" "}
        </Paragraph>
      ))}
    </Box>
  );
}
