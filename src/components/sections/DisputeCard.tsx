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
    seller_id?: string;
    buyer_id?: string;
    required_votes?: number;
  };
  [key: string]: any;
}) {
  let description =
    dispute?.description && dispute?.description?.length > 1000
      ? dispute?.description?.slice(0, 1000) + "..."
      : dispute?.description;

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
        {dispute?.title && (
          <Heading as="h3" mt={2} mb={4}>
            {dispute?.title}
          </Heading>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            gap: [3, 3, 3, 4],
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Heading as="h4" variant="tiny">
              store
            </Heading>
            <Heading as="h3" variant="account" mt={2}>
              {dispute?.store}
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" variant="tiny">
              disputer
            </Heading>
            <Heading as="h3" variant="account" mt={2}>
              {dispute?.disputer}
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" variant="tiny">
              seller
            </Heading>
            <Heading as="h3" variant="account" mt={2}>
              {dispute?.seller_id}
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" variant="tiny">
              buyer
            </Heading>
            <Heading as="h3" variant="account" mt={2}>
              {dispute?.buyer_id}
            </Heading>
          </Box>
        </Box>
        <Heading as="h4" variant="tiny">
          description
        </Heading>
        <Paragraph mt={1} mb={4}>
          {description ? description : "No description provided"}
        </Paragraph>
        <Box
          sx={{
            display: "flex",
            gap: [3, 3, 4, 5],
          }}
        >
          <Box>
            <Heading as="h4" variant="tiny">
              shared prize pool
            </Heading>
            <Price amount={dispute?.prize} />
          </Box>
          <Box>
            <Heading as="h4" variant="tiny">
              one share
            </Heading>
            <Price
              amount={(
                Number(dispute?.prize || 0) /
                Number(dispute?.required_votes || 0)
              ).toFixed(2)}
            />
          </Box>
        </Box>
      </Box>
    </A>
  );
}
