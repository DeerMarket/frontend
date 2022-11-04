import { Heading } from "theme-ui";
import DashboardLayout from "../../components/layouts/Dashboard";

export default function Dashboard() {
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
    <DashboardLayout
      sx={{
        variant: "backgrounds.1",
      }}
      tab="overview"
    >
      <Heading as="h2" variant="pageHeading">
        {message}, achraf.near!
      </Heading>
      <Heading mt={2} as="p" variant="pageSubHeading">
        This is your dashboard where you can manage your orders, stores, and
        more.
      </Heading>
    </DashboardLayout>
  );
}
