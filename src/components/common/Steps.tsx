import React from "react";

export default function Steps({
  steps,
}: {
  steps: {
    title?: string;
    description?: string;
    icon?: string | React.ReactNode;
    active?: boolean;
    color?: string;
  }[];
}) {
  const styles: any = {
    ol: {
      listStyle: "none",
      padding: "0",
      mb: 4,
      display: "flex",
      width: "auto",
      justifyContent: "center",
    },
    li: {
      display: "inline-block",
      width: "18%",
      textAlign: "center",
      float: "none",
      color: "green",
      position: "relative",

      ":first-of-type::after": {
        width: 0,
      },
      ":hover .desc": {
        display: "block",
      },
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80px",
      width: "80px",
      textAlign: "center",
      margin: "0 auto",
      background: "#f5f6f7",
      border: "4px solid #ccc",
      lineHeight: "65px",
      fontSize: "30px",
      borderRadius: "50%",
      userSelect: "none",
    },
    p: {
      fontSize: [1, 2, 2],
      fontWeight: 600,
      fontFamily: "inherit",
      mt: 2,
    },
    description: {
      display: "none",
      position: "absolute",
      top: "105%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
      background: "black",
      color: "white",
      padding: 3,
      borderRadius: 6,
    },
  };

  return (
    <ol sx={styles.ol}>
      {steps.map((step, index) => (
        <li
          key={index}
          sx={{
            ...styles.li,
            color: step.active ? step?.color || "green" : "text",
            "::after": {
              background: "#ccc none repeat scroll 0 0",
              backgroundColor: step.active ? step?.color || "green" : "#ccc",
              bottom: 0,
              content: '""',
              display: "block",
              height: "4px",
              margin: "0 auto",
              position: "absolute",
              top: "33px",
              width: "100%",
              zIndex: -1,
              right: "50%",
            },
          }}
        >
          <p className="desc" sx={styles.description}>
            {step?.description}
          </p>
          <span
            sx={{
              ...styles.icon,
              borderColor: step.active ? step?.color || "green" : "#ccc",
            }}
          >
            {step?.icon || index + 1}
          </span>
          <p sx={styles.p}>{step?.title}</p>
        </li>
      ))}
    </ol>
  );
}
