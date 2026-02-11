import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import DashboardHeadder from "../components/DashboardHeadder";
import StatCard from "../components/StatCard";
import {
  CheckCircle2,
  Clock,
  Calendar,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

function ProductivityAnalytics() {
  const { analyticsData, fetchAnalytics } = useUser();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  const formatMinutesFromSeconds = (seconds: number) => {
    return Math.round(seconds / 60);
  };

  if (!analyticsData) {
    return (
      <div className="flex-1 px-10 py-8">
        <DashboardHeadder
          title="Productivity Analysis"
          subtitle="Loading your performance metrics..."
        />
        <div className="mt-10 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Pre-process data for charts
  const chartData = analyticsData.dailyHistory.map((day) => ({
    name: day.dayName,
    tasks: day.completedCount,
    minutes: formatMinutesFromSeconds(day.secondsTracked),
  }));

  return (
    <div className="flex-1 px-10 py-8">
      <DashboardHeadder
        title="Productivity Analysis"
        subtitle="Detailed insights into your task completion and time tracking"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <StatCard
          label="Completed Today"
          value={analyticsData.completedToday}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          trend="Keep it up!"
        />
        <StatCard
          label="Tracked Today"
          value={formatHours(analyticsData.secondsToday)}
          icon={<Clock className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          label="Completed This Week"
          value={analyticsData.completedThisWeek}
          icon={<Calendar className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          label="Tracked This Week"
          value={formatHours(analyticsData.secondsThisWeek)}
          icon={<BarChart3 className="w-6 h-6" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Task Completion Trend */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white">
                Daily Tasks Completed
              </h2>
              <p className="text-sm text-zinc-500">Last 7 days trend</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  itemStyle={{ color: "#22c55e" }}
                />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTasks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Tracking Trend */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white">Minutes Tracked</h2>
              <p className="text-sm text-zinc-500">
                Distribution over the week
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                  cursor={{ fill: "#27272a", opacity: 0.4 }}
                  itemStyle={{ color: "#3b82f6" }}
                  formatter={(value) => [`${value}m`, "Tracked"]}
                />
                <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.minutes > 60 ? "#3b82f6" : "#60a5fa"}
                      opacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Summary Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Daily Insight</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-zinc-400">
                  Daily Completion Goal
                </span>
                <span className="text-sm font-bold text-white">
                  {analyticsData.completedToday} / 5
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${Math.min((analyticsData.completedToday / 5) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <p className="text-zinc-400 text-sm italic">
              "Productivity is never an accident. It is always the result of a
              commitment to excellence, intelligent planning, and focused
              effort." — Paul J. Meyer
            </p>
          </div>
        </div>

        {/* Tip Card */}
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Pro Tip</h2>
          <p className="text-zinc-300 leading-relaxed">
            Concentrate all your thoughts upon the work at hand. The sun's rays
            do not burn until brought to a focus. Try using the "Running" state
            for your primary task to keep your total tracked hours accurate!
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-blue-300 font-medium font-semibold uppercase tracking-wide">
              Optimization Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductivityAnalytics;
