import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import DashboardHeadder from "../components/DashboardHeadder";
import StatCard from "../components/StatCard";
import { CheckCircle2, Clock, Pause, ListTodo, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function ProductivityAnalytics() {
  const { tasks, fetchTasks } = useUser();

  useEffect(() => {
    fetchTasks();
  }, []);

  // Compute status counts
  const statusCounts = {
    notStarted: tasks.filter((t) => t.status === "notStarted").length,
    running: tasks.filter((t) => t.status === "running").length,
    paused: tasks.filter((t) => t.status === "pause").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  // Compute priority counts
  const priorityCounts = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  // Pie chart data
  const pieData = [
    { name: "Not Started", value: statusCounts.notStarted, color: "#71717a" },
    { name: "Running", value: statusCounts.running, color: "#3b82f6" },
    { name: "Paused", value: statusCounts.paused, color: "#f59e0b" },
    { name: "Done", value: statusCounts.done, color: "#22c55e" },
  ].filter((d) => d.value > 0);

  // Bar chart data — priority breakdown
  const priorityBarData = [
    { name: "High", count: priorityCounts.high, color: "#ef4444" },
    { name: "Medium", count: priorityCounts.medium, color: "#f59e0b" },
    { name: "Low", count: priorityCounts.low, color: "#22c55e" },
  ];

  // Time stats
  const totalEstimatedMinutes = Math.round(
    tasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0) / 60,
  );
  const totalTrackedMinutes = Math.round(
    tasks.reduce((sum, t) => sum + (t.totalElapsedSeconds || 0), 0) / 60,
  );

  // Completion rate
  const completionRate =
    tasks.length > 0 ? Math.round((statusCounts.done / tasks.length) * 100) : 0;

  // Custom label for pie chart
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
    name?: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const ir = innerRadius ?? 0;
    const or = outerRadius ?? 0;
    const ma = midAngle ?? 0;
    const cxVal = cx ?? 0;
    const cyVal = cy ?? 0;
    const radius = ir + (or - ir) * 1.6;
    const x = cxVal + radius * Math.cos(-ma * RADIAN);
    const y = cyVal + radius * Math.sin(-ma * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#a1a1aa"
        textAnchor={x > cxVal ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex-1 px-10 py-8">
      <DashboardHeadder
        title="Productivity Analysis"
        subtitle="Detailed insights into your task completion and time tracking"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <StatCard
          label="Total Tasks"
          value={tasks.length}
          icon={<ListTodo className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          label="Completed"
          value={statusCounts.done}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          trend={`${completionRate}% completion rate`}
        />
        <StatCard
          label="In Progress"
          value={statusCounts.running}
          icon={<Clock className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          label="Paused"
          value={statusCounts.paused}
          icon={<Pause className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart — Task Status */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Task Status Distribution
              </h2>
              <p className="text-sm text-zinc-500">
                Overview of all {tasks.length} tasks
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div className="h-72 w-full">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                    label={renderCustomLabel}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#a1a1aa" }}
                    formatter={(value: number | undefined) => [
                      `${value ?? 0} task${(value ?? 0) !== 1 ? "s" : ""}`,
                      "Count",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500">
                No tasks to display
              </div>
            )}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-5 mt-4">
            {[
              { label: "Not Started", color: "bg-zinc-500" },
              { label: "Running", color: "bg-blue-500" },
              { label: "Paused", color: "bg-amber-500" },
              { label: "Done", color: "bg-green-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs text-zinc-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart — Priority Breakdown */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Tasks by Priority
              </h2>
              <p className="text-sm text-zinc-500">
                Distribution across priority levels
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityBarData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#a1a1aa" }}
                  cursor={{ fill: "#27272a", opacity: 0.4 }}
                  formatter={(value: number | undefined) => [
                    `${value ?? 0} task${(value ?? 0) !== 1 ? "s" : ""}`,
                    "Count",
                  ]}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {priorityBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row — Time Summary + Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time Summary */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Time Overview</h2>
          <div className="space-y-6">
            {/* Estimated Time */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-zinc-400">
                  Total Estimated Time
                </span>
                <span className="text-sm font-bold text-white">
                  {totalEstimatedMinutes >= 60
                    ? `${Math.floor(totalEstimatedMinutes / 60)}h ${totalEstimatedMinutes % 60}m`
                    : `${totalEstimatedMinutes}m`}
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            {/* Tracked Time */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-zinc-400">
                  Total Tracked Time
                </span>
                <span className="text-sm font-bold text-white">
                  {totalTrackedMinutes >= 60
                    ? `${Math.floor(totalTrackedMinutes / 60)}h ${totalTrackedMinutes % 60}m`
                    : `${totalTrackedMinutes}m`}
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalEstimatedMinutes > 0 ? Math.min((totalTrackedMinutes / totalEstimatedMinutes) * 100, 100) : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Efficiency */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Time Efficiency</span>
                <span
                  className={`text-lg font-bold ${
                    totalTrackedMinutes <= totalEstimatedMinutes
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >
                  {totalEstimatedMinutes > 0
                    ? `${Math.round((totalTrackedMinutes / totalEstimatedMinutes) * 100)}%`
                    : "N/A"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {totalTrackedMinutes <= totalEstimatedMinutes
                  ? "You're ahead of schedule! Great work."
                  : "You've exceeded the estimated time. Consider adjusting estimates."}
              </p>
            </div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Completion Summary
          </h2>
          <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
            {/* Circular progress */}
            <div className="relative w-44 h-44 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#27272a"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#22c55e"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionRate / 100)}`}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {completionRate}%
                </span>
                <span className="text-xs text-zinc-500">Complete</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-zinc-400">
                  Done:{" "}
                  <span className="text-white font-semibold">
                    {statusCounts.done}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span className="text-zinc-400">
                  Running:{" "}
                  <span className="text-white font-semibold">
                    {statusCounts.running}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span className="text-zinc-400">
                  Paused:{" "}
                  <span className="text-white font-semibold">
                    {statusCounts.paused}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-500"></div>
                <span className="text-zinc-400">
                  Pending:{" "}
                  <span className="text-white font-semibold">
                    {statusCounts.notStarted}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductivityAnalytics;
