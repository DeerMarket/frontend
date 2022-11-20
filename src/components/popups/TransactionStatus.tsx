import Lottie from "react-lottie-player";
import { Box, Button, Heading, Paragraph } from "theme-ui";
import Loading from "../common/Loading";

import ANIMATION_SUCCESS from "../../assets/animations/success.json";
import ANIMATION_FAIL from "../../assets/animations/failure.json";

export default function TransactionStatus({
  show,

  success = true,
  successTitle = "Transaction Successful",
  successMessage = "Your transaction was successful.",
  successConfirmText = "Confirm",
  onSuccessConfirm,

  failureTitle = "Transaction Failed",
  failureMessage = "Your transaction failed.",
  failureConfirmText = "Close",
  onFailConfirm,

  loading = false,
  onClose,
}: {
  show: boolean;

  success?: boolean;
  successTitle?: string;
  successMessage?: string;
  successConfirmText?: string;
  onSuccessConfirm?: () => void;

  failureTitle?: string;
  failureMessage?: string;
  failureConfirmText?: string;
  onFailConfirm?: () => void;

  loading?: boolean;
  onClose?: () => void;
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
        onClick={onClose}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 101,
          variant: "box.card",
          width: 450,
          height: 470,
          maxHeight: "90vh",
          maxWidth: "90%",
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
            <Lottie
              animationData={success ? ANIMATION_SUCCESS : ANIMATION_FAIL}
              play
              loop={false}
              style={{ width: success ? 200 : 150, height: 200 }}
            />
            <Heading
              as="h3"
              sx={{
                my: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {success ? successTitle : failureTitle}
            </Heading>
            <Paragraph
              sx={{
                mb: "auto",
                textAlign: "center",
              }}
            >
              {success ? successMessage : failureMessage}
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
                onClick={success ? onSuccessConfirm : onFailConfirm}
              >
                {success ? successConfirmText : failureConfirmText}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  ) : null;
}
