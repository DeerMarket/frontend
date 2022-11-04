import { Button, Flex } from "theme-ui";

export default function Tabs({ tabs, ...rest }: any) {
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
            onClick={tab.onClick}
            sx={{
              padding: "8px 20px !important",
              borderRadius: "17px",
              minWidth: "auto",
              backgroundColor: tab.active ? "primary" : "transparent",
              color: tab.active ? "secondary" : "text",
              transition: "all 0.3s ease",
              fontWeight: 600,

              "&:hover": {
                backgroundColor: !tab.active && "secondary",
                color: !tab.active ? "text" : "secondary",
              },
            }}
          >
            {tab.name}
          </Button>
        );
      })}
    </Flex>
  );
}
