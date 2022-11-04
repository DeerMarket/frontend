import Image from "next/image";
import { Flex, Radio, Text } from "theme-ui";

export default function OptionImage({
  title,
  image,
  imageSize,
  description,
  checked,
  onClick,
  comingSoon,
  ...rest
}: {
  title: string;
  image?: string;
  imageSize?: number;
  description?: string;
  checked?: boolean;
  onClick?: (e: any) => void;
  comingSoon?: boolean;
}) {
  return (
    <Flex
      sx={{
        border: "default",
        borderRadius: "20px",
        padding: "20px",
        width: "250px",
        minHeight: "250px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: comingSoon ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: comingSoon ? "" : "scale(1.05)",
          boxShadow: comingSoon ? "" : "0 0 40px 3px rgba(0, 0, 0, 0.2)",
        },
        fontSize: 3,
        fontWeight: "500",
        gap: 3,
        userSelect: "none",
        position: "relative",
        borderColor: checked ? "primary" : "default",
        backgroundColor: comingSoon ? "rgba(0, 0, 0, 0.1)" : "light",
        opacity: comingSoon && 0.6,
      }}
      onClick={comingSoon ? () => {} : onClick}
      {...rest}
    >
      {comingSoon && <Text>Coming Soon!</Text>}

      {image && (
        <Image
          src={image}
          alt={title}
          width={imageSize ? imageSize : 90}
          height={imageSize ? imageSize : 90}
        />
      )}
      {title && (
        <Text
          sx={{
            fontSize: description ? 2 : undefined,
            fontWeight: description ? "600" : undefined,
          }}
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          sx={{
            fontSize: 1,
            fontWeight: "400",
            color: "#000000ee",
          }}
        >
          {description}
        </Text>
      )}
      <Radio
        checked={checked}
        sx={{
          position: "absolute",
          top: "8px",
          right: "3px",
          cursor: "pointer",
          width: "30px",
          height: "30px",
          fill: checked ? "primary" : "#00000070",
        }}
        onChange={(e) => e.preventDefault()}
      />
    </Flex>
  );
}
