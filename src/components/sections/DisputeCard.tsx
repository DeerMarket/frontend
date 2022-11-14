import { Box, Heading, Paragraph } from "theme-ui";
import Price from "../common/Price";
import A from "next/link";

export default function DisputeCard({
  dispute,
  ...rest
}: {
  dispute: {
    id?: string;
    title?: string;
    description?: string;
    disputer?: string;
    item?: string;
    store?: string;
    endsAt?: string;
    prize?: string | number;
  };
  [key: string]: any;
}) {
  let description =
    dispute?.description && dispute?.description?.length > 1000
      ? dispute?.description?.slice(0, 1000) + "..."
      : dispute?.description;

  let title =
    dispute?.title && dispute?.title?.length > 40
      ? dispute?.title?.slice(0, 40) + "..."
      : dispute?.title;

  let time = {
    title: "",
    value: "",
    color: "",
  };
  if (dispute?.endsAt) {
    const date = new Date(dispute?.endsAt);
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    // if already ended
    if (diff < 0) {
      time = {
        title: "ended at",
        value: date.toLocaleString(),
        color: "red",
      };
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      time = {
        title: "time left",
        value: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        color: "primary",
      };
    }
  }
  return (
    <A href={`/disputes/${dispute?.id}`}>
      <Box
        sx={{
          width: "100%",
          p: 4,
        }}
        {...rest}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: ["column", "column", "row"],
          }}
        >
          <Box>
            <Heading as="h4" variant="tiny">
              title
            </Heading>
            <Heading as="h3" variant="cardHeading" mb={4}>
              {title}
            </Heading>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: ["flex-start", "flex-start", "flex-end"],
            }}
          >
            <Heading as="h4" variant="tiny">
              {time.title}
            </Heading>
            <Heading
              as="h3"
              mb={4}
              sx={{
                color: time.color,
              }}
            >
              {time.value}
            </Heading>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            gap: 4,
          }}
        >
          <Box>
            <Heading as="h4" variant="tiny">
              store
            </Heading>
            <Heading as="h3" variant="account" mt={2} mb={4}>
              {dispute?.store}
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" variant="tiny">
              disputer
            </Heading>
            <Heading as="h3" variant="account" mt={2} mb={4}>
              {dispute?.disputer}
            </Heading>
          </Box>
        </Box>
        <Heading as="h4" variant="tiny">
          description
        </Heading>
        <Paragraph mt={1} mb={4}>
          {description ? description : "No description provided"}
        </Paragraph>
        <Heading as="h4" variant="tiny">
          shared prize pool
        </Heading>
        <Price amount={dispute?.prize} />
      </Box>
    </A>
  );
}
