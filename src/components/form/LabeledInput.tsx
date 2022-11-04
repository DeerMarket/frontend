import React from "react";
import { Flex, Input } from "theme-ui";

export default function LabeledInput({
  label = "",
  value,
  placeholder = "",
  type = "number",
  width = "540px",
  icon,
  ...rest
}: {
  label?: string;
  value: string;
  placeholder?: string;
  type?: string;
  width?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Flex
      sx={{
        position: "relative",
        mx: "auto",
        mb: 4,
        maxWidth: width,
      }}
    >
      <label
        htmlFor={label}
        sx={{
          position: "absolute",
          right: "18px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "14px",
          color: "text",
          userSelect: "none",
          display: "flex",
          gap: "6px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
        {icon}
      </label>
      <Input
        type={type}
        variant="input.default"
        placeholder={placeholder}
        sx={{
          width: "100%",
          pr: label.length * 8 + 34 + (icon ? 16 : 0) + "px",
        }}
        value={value}
        id={label}
        {...rest}
      />
    </Flex>
  );
}
