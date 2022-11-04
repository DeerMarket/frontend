export default function FormButton({ children, variant, ...rest }: any) {
  let variantStyle: any = {
    background: "primary",
    color: "#fff",
    border: "none",
    ":hover": {
      background: "primaryHover",
    },
  };

  if (variant === "back") {
    variantStyle = {
      background: "none",
      color: "black",
      border: "none",
      px: 2,
      fontWeight: 500,
      ":hover": {
        background: "none",
        opacity: 0.8,
      },
    };
  }

  if (variant === "skip") {
    variantStyle = {
      background: "none",
      color: "black",
      border: "none",
      fontWeight: 500,
      opacity: 0.7,
      ":hover": {
        background: "none",
      },
    };
  }

  return (
    <button
      sx={{
        borderRadius: "200px",
        cursor: "pointer",
        transition: "all 0.1s ease-in-out",
        userSelect: "none",
        py: 10,
        px: 26,
        display: "flex",
        ...variantStyle,
      }}
      {...rest}
    >
      {variant == "back" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
            sx={{ fill: "black" }}
          />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
}
