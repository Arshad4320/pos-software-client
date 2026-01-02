import DashboardLayout from "./dashboard/layout";
import DashboardHome from "./dashboard/page";

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  );
}
