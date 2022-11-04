import { Box, Button, Heading, Paragraph } from "theme-ui";
import ButtonWithIcon from "../common/ButtonWithIcon";

export default function ConfirmDeletePopup({
  show,
  title = "Confirm Delete",
  message = (
    <>
      Are you sure you want to delete this?
      <br /> This action cannot be undone.
    </>
  ),
  confirmButtonText = "Delete",
  onConfirm,
  onCancel,
}: {
  show: boolean;
  title?: string;
  message?: any;
  confirmButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
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
            mb: 2,
          }}
        >
          {title}
        </Heading>
        <Paragraph
          sx={{
            mb: "auto",
          }}
        >
          {message}
        </Paragraph>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: 5,
            gap: 3,
          }}
        >
          <Button onClick={onCancel}>Cancel</Button>

          <ButtonWithIcon
            icon={
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                sx={{
                  fill: "red",
                }}
              >
                <path d="M13 18H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2zm3-15a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1z" />
              </svg>
            }
            sx={{
              fontSize: 1,
              backgroundColor: "red",
              ":hover": {
                backgroundColor: "red",
              },
            }}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </ButtonWithIcon>
        </Box>
      </Box>
    </Box>
  ) : null;
}
