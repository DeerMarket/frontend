import { Box, Button, Heading, Paragraph } from "theme-ui";
import ButtonWithIcon from "../common/ButtonWithIcon";
import Loading from "../common/Loading";

export default function ConfirmBox({
  show,
  title = "Confirm Action",
  message = <>Are you sure you want to perform this action?</>,
  confirmButtonText = "Confirm",
  loading = false,
  onConfirm,
  onCancel,
}: {
  show: boolean;
  title?: string;
  message?: any;
  confirmButtonText?: string;
  loading?: boolean;
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
          minHeight: 300,
          minWidth: 300,
          width: 360,
          maxWidth: "90%",
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <Heading
              as="h3"
              sx={{
                mb: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {title}
            </Heading>
            <Paragraph
              sx={{
                mb: "auto",
                textAlign: "center",
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
              <Button
                sx={{
                  flex: 1,
                }}
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Button
                sx={{
                  flex: 1,
                }}
                onClick={onConfirm}
              >
                {confirmButtonText}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  ) : null;
}
