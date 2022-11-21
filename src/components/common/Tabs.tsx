import { Button, Flex } from "theme-ui";

export default function Tabs({
  tabs,
  ...rest
}: {
  tabs: {
    id: string | number;
    name: string;
    onClick?: (id: string | number) => void;
    active?: boolean;
    color?: string;
    note?: string | number;
  }[];
  [key: string]: any;
}) {
  return (
    <Flex
      py={1}
      px={1}
      sx={{
        variant: "box.card",
        gap: 2,
      }}
      {...rest}
    >
      {tabs.map((tab: any) => {
        return (
          <Button
            key={tab.name}
            variant="text"
            onClick={() => tab.onClick && tab.onClick(tab.id)}
            sx={{
              padding: "8px 20px !important",
              borderRadius: "17px",
              minWidth: "auto",
              backgroundColor: tab.active
                ? tab?.color
                  ? tab.color
                  : "primary"
                : "transparent",
              color: tab.active ? "white" : "text",
              transition: "all 0.3s ease",
              fontWeight: 600,
              position: "relative",

              "&:hover": {
                backgroundColor:
                  !tab.active && (tab?.color ? tab.color : "primary"),
                color: "white",
              },
            }}
          >
            {tab.name}
            {tab.note != undefined && (
              <Flex
                sx={{
                  position: "absolute",
                  borderRadius: "50%",
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignItems: "center",
                  top: "-5px",
                  right: "-5px",
                  background: "black",
                  color: "#fff",
                  fontSize: 1,
                  fontWeight: 600,
                }}
              >
                {tab.note}
              </Flex>
            )}
          </Button>
        );
      })}
    </Flex>
  );
}
