import React from "react";
import { Box } from "theme-ui";

export default function StoreAvatar({
  image,
  size = 144,
}: {
  image?: string;
  size?: number | number[];
}) {
  return (
    <Box
      sx={{
        backgroundColor: image ? "transparent" : "muted",
        height: size,
        width: size,
        borderRadius: "33%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minWidth: size,
      }}
    />
  );
}
