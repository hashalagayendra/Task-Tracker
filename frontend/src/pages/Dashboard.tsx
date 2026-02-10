import Sidebar from "../components/Sidebar";
import DashboardHeadder from "../components/DashboardHeadder";
import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div className="bg-(--bg-color) flex">
      <div className="w-72 h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className=" flex-1 px-10 py-8">
        <DashboardHeadder />
        <div className=" w-full grid grid-cols-4 justify-items-center gap-8">
          <StatCard />
          <StatCard />
          <StatCard />
          <StatCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
