import { utils } from "near-api-js";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Box, Flex, Heading } from "theme-ui";
import BigTotal from "../../components/dashboard/BigTotal";
import DashboardLayout from "../../components/layouts/Dashboard";
import { useData } from "../../hooks/useData";
import { useGraph } from "../../hooks/useGraph";

export default function Dashboard() {
  const { account } = useData();
  const { get_user_overview } = useGraph();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (account?.account_id) {
      get_user_overview(account?.account_id)
        .then((data) => {
          setStats(data?.data?.user);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [account]);

  const date = new Date();
  const hour = date.getHours();
  let message = "Good morning";
  if (hour > 12) {
    message = "Good afternoon";
  }
  if (hour > 17) {
    message = "Good evening";
  }
  if (hour > 20) {
    message = "Good night";
  }

  let balance = formatNumber(
    Number(utils.format.formatNearAmount(account?.amount || "0", 2))
  );
  let active_orders =
    stats?.total_active_sell_orders + stats?.total_active_buy_orders;
  let total_sales = formatNumber(
    Number(utils.format.formatNearAmount(stats?.total_sales || "0", 2))
  );

  
  return (
    <DashboardLayout tab="overview">
      <Heading as="h1" variant="pageHeading" mb={4}>
        {message + ", " + account?.account_id + (account?.account_id && "!")}
      </Heading>
      <Box>
        <Heading as="h2">Account Overview</Heading>
        <Flex
          sx={{
            gap: 4,
            mt: 4,
            flexWrap: "wrap-reverse",
          }}
        >
          <BigTotal
            title="Account Balance"
            total={balance.toString()}
            currency="near"
            icon={
              <Lottie
                loop={false}
                animationData={require("../../assets/animations/wallet.json")}
                play
                style={{
                  width: 120,
                  height: 120,
                  transform: "scale(1.5) translateY(-10px)",
                }}
              />
            }
          />
          <BigTotal
            title="Active Orders"
            total={
              stats
                ? isNaN(active_orders)
                  ? "0"
                  : active_orders.toString()
                : "..."
            }
            icon={
              <Lottie
                loop={false}
                animationData={require("../../assets/animations/orders.json")}
                play
                style={{
                  width: 120,
                  height: 120,
                  transform: "scale(1.6) translateY(5px)",
                }}
              />
            }
          />
          <BigTotal
            title="Total Sales"
            total={stats ? total_sales.toString() : "..."}
            currency={stats ? "near" : ""}
            icon={
              <Lottie
                loop={false}
                animationData={require("../../assets/animations/salesup.json")}
                play
                style={{
                  width: 120,
                  height: 120,
                  transform: "scale(1.5) translateY(5px)",
                }}
              />
            }
          />
        </Flex>
      </Box>
    </DashboardLayout>
  );
}

function formatNumber(value: number, decimal = 2) {
  if (value < 1) {
    return value;
  }

  const notations = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"],
    i = Math.floor(Math.log(value) / Math.log(1000));
  return `${parseFloat((value / Math.pow(1000, i)).toFixed(decimal))}${
    notations[i]
  }`;
}
