import React from "react";
import { Box, Button, Flex, Input } from "theme-ui";

export default function MultiImageUpload({
  value,
  onChange,
  placeholder = "Add a direct link to your image",
  max,
  setError,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  max?: number;
  setError?: (error: string) => void;
}) {
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    if (inputValue === "") return;
    if (max && value.length >= max) {
      setError && setError(`You can only add up to ${max} images`);
      return;
    }
    // check if the image url is valid
    if (inputValue.length > 1000) {
      setError && setError("Image URL is too long. Max 1000 characters.");
      return;
    } else {
      setError && setError("");
    }
    const img = new Image();
    img.src = inputValue;
    img.onload = () => {
      onChange([...value, inputValue]);
      setInputValue("");
      setError && setError("");
    };
    img.onerror = () => {
      setError && setError("Invalid image URL");
    };
  };

  return (
    <Flex
      sx={{
        flexDirection: "column",
        mx: "auto",
        gap: 3,
        width: 540,
        maxWidth: "100%",
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
        }}
      >
        <Input
          type="text"
          variant="input.default"
          placeholder={placeholder}
          sx={{
            mr: 0,
            flex: 1,
          }}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
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
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            ml: 0,
          }}
        >
          ADD +
        </Button>
      </Flex>
      <Flex
        sx={{
          gap: 3,
          width: "100%",
          height: 170,
          overflowX: "auto",
          justifyContent: value.length < 3 ? "center" : "flex-start",
          alignItems: "center",
        }}
      >
        {value.map((deliverable, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "muted",
              height: [144],
              width: [144],
              minWidth: [144],
              borderRadius: 20,
              backgroundImage: `url(${deliverable})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Button
              onClick={() => {
                onChange(value.filter((_, i) => i !== index));
              }}
              sx={{
                background: "red",
                borderColor: "red",
                ":hover": {
                  background: "red",
                  borderColor: "red",
                  opacity: 0.8,
                },
                p: 1,
                m: 2,
                float: "right",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                sx={{
                  stroke: "white",
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
            </Button>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
