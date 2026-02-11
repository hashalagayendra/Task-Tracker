import React, { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: "blue" | "green" | "orange" | "purple";
  trend?: string;
}

function StatCard({ label, value, icon, color, trend }: StatCardProps) {
  const colorMap = {
    blue: "border-white bg-blue-500 text-blue-400",
    green: "border-white bg-green-500 text-green-400",
    orange: "border-white bg-orange-500 text-orange-400",
    purple: "border-white bg-purple-500 text-purple-400",
  };

  const iconBgMap = {
    blue: "bg-white",
    green: "bg-white",
    orange: "bg-white",
    purple: "bg-white",
  };

  return (
    <div
      className={`w-full p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${colorMap[color]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${iconBgMap[color]}`}>{icon}</div>
        {trend && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white border border-white/10 text-white">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-white mb-1">{label}</p>
        <h3 className="text-3xl font-bold tracking-tight text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default StatCard;
