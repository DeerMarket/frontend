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
      variant="primary"
      sx={{
        variant: "gradient.primary",
        paddingLeft: children ? "1.2em" : 0,
        paddingRight: children ? "3.3em" : "2.8em",
        display: "flex",
        alignItems: "center",
        position: "relative",
        height: "2.8em",
        border: "none",

        ":hover": {},
        "&:hover .icon": {
          width: children ? "calc(100% - 0.6em)" : "2.2em",
          transform: children ? "" : "scale(1.1)",
        },
        "&:hover .icon svg": {
          transform: children ? "translateX(0.1em)" : "",
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
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "2.2em",
          width: "2.2em",
          borderRadius: "100px",
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
              color: "primary",
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
