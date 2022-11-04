import Image from "next/image";
import IdeaImage from "../../assets/svg/idea.svg";
import { Message, Paragraph } from "theme-ui";

export default function MessageBox({ children, ...rest }: any) {
  return (
    <Message
      sx={{
        display: "flex",
        gap: "12px",
        pl: "14px",
        alignItems: "center",
      }}
      variant="notice"
      {...rest}
    >
      <Image src={IdeaImage} width={40} height={40} />
      <Paragraph>{children}</Paragraph>
    </Message>
  );
}
