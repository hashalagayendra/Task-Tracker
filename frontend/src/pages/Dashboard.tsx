import Sidebar from "../components/Sidebar";
import DashboardHeadder from "../components/DashboardHeadder";

function Dashboard() {
  return (
    <div className="bg-(--bg-color) flex">
      <div className="w-72 h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className=" flex-1 px-10 py-8">
        <DashboardHeadder />
      </div>
    </div>
  );
}

export default Dashboard;
