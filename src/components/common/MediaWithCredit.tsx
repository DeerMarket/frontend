import Image from "next/image";
import Lottie from "react-lottie-player";
import { Box, Link } from "theme-ui";

export default function MediaWithCredit({
  credit,
  creditLink,
  image,
  lottie,
  ...rest
}: {
  credit?: string;
  creditLink?: string;
  image?: any;
  lottie?: any;
  [key: string]: any;
}) {
    
  return (
    <Box>
      {image && <Image src={image} {...rest} />}
      {lottie && <Lottie animationData={lottie} {...rest} />}
      <Box
        sx={{
          fontSize: "12px",
          textAlign: "center",
          opacity: 0.8,
        }}
      >
        {lottie ? "Animation" : "Illustration"} by{" "}
        <Link href={creditLink} target={"_blank"} rel={"noreferrer"}>
          {credit}
        </Link>
      </Box>
    </Box>
  );
}
