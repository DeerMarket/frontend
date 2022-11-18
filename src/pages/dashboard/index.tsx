import { useEffect, useState } from "react";
import { Heading } from "theme-ui";
import DashboardLayout from "../../components/layouts/Dashboard";
import { useData } from "../../hooks/useData";

export default function Dashboard() {
  const { account } = useData();

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

  return (
    <DashboardLayout tab="overview">
      <Heading as="h2" variant="pageHeading">
        {message + ", " + account?.account_id + (account?.account_id && "!")}
      </Heading>
      <Heading mt={2} as="p" variant="pageSubHeading">
        This is your dashboard where you can manage your orders, stores, and
        more.
      </Heading>
    </DashboardLayout>
  );
}
