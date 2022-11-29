import React from "react";
import { Box } from "theme-ui";

export default function StoreCover({
  image,
  height = 144,
}: {
  image?: string;
  height?: number | number[];
}) {
  return (
    <Box
      sx={{
        backgroundColor: "muted",
        height: height,
        width: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    />
  );
}
