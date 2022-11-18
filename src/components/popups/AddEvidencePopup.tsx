import { useState } from "react";
import { Box, Button, Heading, Input, Paragraph, Textarea } from "theme-ui";
import ButtonWithIcon from "../common/ButtonWithIcon";

export default function AddEvidencePopup({
  show,
  title = "Adding Evidence",
  confirmButtonText = "Confirm",
  onConfirm,
  onCancel,
}: {
  show: boolean;
  title?: string;
  confirmButtonText?: string;
  onConfirm?: (description: string, link: string) => void;
  onCancel?: () => void;
}) {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleConfirm = () => {
    if (description == "" && link == "") {
      alert("Please fill in all fields");
      return;
    }
    if (onConfirm) {
      onConfirm(description, link);
    }
  };

  return show ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        onClick={onCancel}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 101,
          variant: "box.card",
          minHeight: 220,
          minWidth: 220 * 1.618,
          maxWidth: 600,
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Heading
          as="h3"
          sx={{
            mb: 3,
          }}
        >
          {title}
        </Heading>
        <Paragraph
          sx={{
            mb: 1,
          }}
        >
          Describe the evidence you want to add.
        </Paragraph>
        <Textarea
          variant="input.default"
          placeholder="Type here..."
          sx={{
            p: 2,
          }}
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <Paragraph
          sx={{
            mb: 1,
          }}
        >
          Add a link to the evidence (image, video, etc.)
        </Paragraph>
        <Input
          variant="input.default"
          placeholder="Type here..."
          value={link || ""}
          onChange={(e) => setLink(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: 4,
            gap: 3,
          }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <ButtonWithIcon
            sx={{
              fontSize: 1,
            }}
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </ButtonWithIcon>
        </Box>
      </Box>
    </Box>
  ) : null;
}
