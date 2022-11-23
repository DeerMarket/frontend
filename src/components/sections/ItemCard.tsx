import { utils } from "near-api-js";
import { AspectRatio, Box, Heading, Paragraph } from "theme-ui";
import Price from "../common/Price";

export default function ItemCard({
  item,
  horizontal,
  ratio,
  hover = true,
  ...rest
}: {
  item: {
    title?: string;
    images?: string;
    price?: string;
  };
  horizontal?: boolean;
  ratio?: number;
  hover?: boolean;
  [key: string]: any;
}) {
  let title =
    item?.title && item?.title?.length > 100
      ? item?.title?.slice(0, 100) + "..."
      : item?.title;
  return (
    <Box
      sx={{
        width: horizontal ? "100%" : ["100%", "100%", "45%", "30%", "22.5%"],
        // p: 3,
        display: "flex",
        flexDirection: horizontal ? ["column", "row","row"] : "column",
        alignItems: horizontal ? ["normal","center"] : "normal",
        textAlign: "left",
        justifyContent: "center",
        variant: "box.card",
        overflow: "hidden",
        
        cursor: hover && "pointer",
        ":hover": hover ? {
          variant: "box.cardHover",
        }: {},
      }}
      {...rest}
    >
      <Box
        sx={{
          width: horizontal ? ["100%", "160px"] : "100%",
        }}
        >
        <AspectRatio
          ratio={ratio? ratio :1.25}
          
          sx={{
            width: "100%",
            height: "100%",
            mb: 2,
            backgroundColor: "muted",
            backgroundImage: `url(${item?.images?.[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "inherit",
          }}
        />
      </Box>
      <Box
        px={3}
        py={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Heading
          as="h4"
          sx={{
            fontWeight: "normal",
            pb: 2,
            mb: "auto",
          }}
        >
          {title}
        </Heading>
        <Price amount={utils.format.formatNearAmount(item?.price || "0", 2)} />
      </Box>
    </Box>
  );
}
