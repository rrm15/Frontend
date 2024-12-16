import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { TransactionChart } from "@/components/dashboard/TransactionChart";
import { GovernmentSchemes } from "@/components/dashboard/GovernmentSchemes";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { NotificationsCenter } from "@/components/dashboard/NotificationsCenter";
import { ProfileStatus } from "@/components/dashboard/ProfileStatus";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <OverviewStats />
      </div>
      <div className="grid gap-6 lg:grid-cols-7 mt-6">
        <TransactionChart />
        <GovernmentSchemes />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <QuickActions />
        <NotificationsCenter />
        <ProfileStatus />
      </div>
    </div>
  );
}