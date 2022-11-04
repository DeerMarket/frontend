import { Box, Button } from "theme-ui";

export default function ButtonWithIcon({
  children,
  icon,
  ...rest
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Button
      variant="default"
      sx={{
        background: "primary",
        color: "white",
        fontFamily: "inherit",
        padding: "0.35em",
        paddingLeft: "1.2em",
        fontSize: "17px",
        fontWeight: "500",
        borderRadius: "0.9em",
        border: "none",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        boxShadow: "inset 0 0 1.6em -0.6em #714da6",
        overflow: "hidden",
        position: "relative",
        height: "2.8em",
        paddingRight: "3.3em",

        "&:hover .icon": {
          width: "calc(100% - 0.6em)",
        },
        "&:hover .icon svg": {
          transform: "translateX(0.1em)",
        },
        "&:active .icon": {
          transform: "scale(0.95)",
        },
      }}
      {...rest}
    >
      {children}
      <Box
        className="icon"
        sx={{
          background: "white",
          marginLeft: "1em",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "2.2em",
          width: "2.2em",
          borderRadius: "0.7em",
          boxShadow: "0.1em 0.1em 0.6em 0.2em #00000029",
          right: "0.3em",
          transition: "all 0.3s",
        }}
      >
        {icon ? (
          icon
        ) : (
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            sx={{
              width: "1.1em",
              transition: "transform 0.3s",
              color: "#7b52b9",
            }}
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        )}
      </Box>
    </Button>
  );
}
