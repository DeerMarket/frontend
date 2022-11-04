import React from "react";
import { Button, Flex, IconButton, Input } from "theme-ui";

export default function ArrayCreator({
  value,
  onChange,
  placeholder,
  max,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  max?: number;
}) {
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    if (inputValue === "") return;
    if (max && value.length >= max) return;
    onChange([...value, inputValue]);
    setInputValue("");
  };

  return (
    <Flex
      sx={{
        flexDirection: "column",
        maxWidth: "540px",
        mx: "auto",
        gap: 3,
        mb: 4,
      }}
    >
      <Flex
        mb={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Input
          type="text"
          variant="input.default"
          placeholder={placeholder}
          sx={{
            mr: 2,
            flex: 1,
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          autoFocus={true}
        />
        <Button
          onClick={handleAdd}
          sx={{
            height: "100%",
          }}
        >
          ADD +
        </Button>
      </Flex>
      {value.map((deliverable, index) => (
        <Flex key={index}>
          <Button
            sx={{
              flex: 1,
              mr: 2,
              pointerEvents: "none",
            }}
            variant="light"
            tabIndex={-1}
          >
            {deliverable}
          </Button>
          <IconButton
            onClick={() => {
              onChange(value.filter((_, i) => i !== index));
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                stroke: "danger",
              }}
            >
              <path
                d="M18 6L6 18"
                stroke="inherit"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6 6L18 18"
                stroke="inherit"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </IconButton>
        </Flex>
      ))}
    </Flex>
  );
}
