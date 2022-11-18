import React from "react";
import { Box } from "theme-ui";

export default function StoreAvatar({
  image,
  size = 144,
}: {
  image?: string;
  size?: number;
}) {
  return (
    <Box
      sx={{
        backgroundColor: "muted",
        height: [size],
        width: [size],
        borderRadius: size < 100 ? 20 : 27,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
