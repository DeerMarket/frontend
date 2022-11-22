import { Box, Heading, Paragraph } from "theme-ui";
import StoreAvatar from "../common/StoreAvatar";

export default function StoreCard({
  store,
  showExtra = true,
  ...rest
}: {
  store: {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    rating?: number;
    reviews?: number;
    items?: number;
    sales?: number;
  };
  showExtra?: boolean;
  [key: string]: any;
}) {
  
  let description =
    store?.description && store?.description?.length > 130
      ? store?.description?.slice(0, 130) + "..."
      : store?.description;

  let name =
    store?.name && store?.name?.length > 40
      ? store?.name?.slice(0, 40) + "..."
      : store?.name;
  return (
    <Box
      sx={{
        display: "flex",
        p: 3,

        gap: 3,
        flexDirection: ["column", "column", "row", "row"],
      }}
      {...rest}
    >
      <StoreAvatar image={store?.image} size={70} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Heading as="h4" variant="account" mr={"auto"} mt={0} mb={1}>
          {store.id}
        </Heading>
        <Heading as="h3" variant="cardHeading" mb={0}>
          {name}
        </Heading>
        {showExtra && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {store.rating && store.reviews && (
                <Paragraph
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                  variant="text.tiny"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 11.5L5.5 13.5L6.5 10.5L4 8.5L7 8L8 5L9 8L12 8.5L9.5 10.5L10.5 13.5L8 11.5Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M8 11.5L5.5 13.5L6.5 10.5L4 8.5L7 8L8 5L9 8L12 8.5L9.5 10.5L10.5 13.5L8 11.5Z"
                      stroke="#FFC107"
                    />
                  </svg>
                  <span>{store.rating || "0"}</span>
                  <span> ({store.reviews || "0"})</span>
                </Paragraph>
              )}
              {store.items && (
                <Paragraph variant="text.tiny">
                  {store.items || "0"} Items
                </Paragraph>
              )}
              {store.sales && (
                <Paragraph variant="text.tiny">
                  {store.sales || "0"} Sales
                </Paragraph>
              )}
            </Box>
          </Box>
        )}
        {description && (
          <Paragraph mb={"auto"} mt={3}>
            {description}
          </Paragraph>
        )}
      </Box>
    </Box>
  );
}
