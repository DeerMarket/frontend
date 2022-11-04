import { useState } from "react";
import { Box, Button, Flex, Text } from "theme-ui";

export default function TextChoices({
  options,
  onChange,
  value = [],
  max = 1,
}: {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string[]) => void;
  value: string[] | any;
  max?: number;
}) {
  const handleSelect = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v: any) => v !== option));
    } else if (value.length < max) {
      onChange([...value, option]);
    } else {
      onChange([option]);
    }
  };

  if (typeof value === "number") {
    onChange([options[value].value]);
  }

  return (
    <Flex
      sx={{
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {options.map((option, i) => (
        <Button
          key={i}
          variant="light"
          sx={{
            width: 200,
            height: 70,
            transitionDuration: "0.05s",
          }}
          onClick={() => handleSelect(option.value)}
          className={
            typeof value === "object" && value?.includes(option.value)
              ? "active"
              : ""
          }
          autoFocus={i === 0}
        >
          {option.label}
        </Button>
      ))}
    </Flex>
  );
}
