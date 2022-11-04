import { Flex } from "theme-ui";
import OptionImage from "./OptionImage";

export default function ImageChoices({
  options,
  selected,
  setSelected,
  imageSize,
  ...rest
}: {
  options: {
    value: string;
    image: any;
    title: string;
    description: string;
    comingSoon?: boolean;
  }[];
  selected: string;
  setSelected: (value: string) => void;
  imageSize?: number;
  [key: string]: any;
}) {
  return (
    <Flex
      sx={{
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 4,
        rowGap: 4,
        maxWidth: "600px",
        my: 40,
        mx: "auto",
      }}
      {...rest}
    >
      {options?.map((option) => (
        <OptionImage
          key={option.value}
          title={option.title}
          description={option.description}
          image={option.image}
          onClick={() => setSelected(option.value)}
          checked={selected === option.value}
          comingSoon={option.comingSoon}
          imageSize={imageSize}
        />
      ))}
    </Flex>
  );
}
