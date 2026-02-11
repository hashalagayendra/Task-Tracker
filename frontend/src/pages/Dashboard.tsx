import { useUser } from "../context/UserContext";
import Sidebar from "../components/Sidebar";
import DashboardHeadder from "../components/DashboardHeadder";
import StatCard from "../components/StatCard";
import DashboardCardContainer from "../components/DashboardCardContainer";
import { CheckCircle2, Clock, ListTodo, AlertTriangle } from "lucide-react";

function Dashboard() {
  const { tasks } = useUser();

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const runningTasks = tasks.filter((t) => t.status === "running").length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;

  return (
    <div className=" flex-1 px-10 py-8">
      <DashboardHeadder />
      <div className=" w-full grid grid-cols-4 justify-items-center gap-8">
        <StatCard
          label="Total Tasks"
          value={totalTasks}
          icon={<ListTodo className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          label="Completed"
          value={completedTasks}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          label="In Progress"
          value={runningTasks}
          icon={<Clock className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          label="High Priority"
          value={highPriorityTasks}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="purple"
        />
      </div>
      <DashboardCardContainer />
    </div>
  );
}

export default Dashboard;
