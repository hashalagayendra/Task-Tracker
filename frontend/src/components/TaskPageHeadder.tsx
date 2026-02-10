import React from "react";
import UserIcon from "./UserIcon";

function TaskPageHeadder({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="flex justify-between items-start md:items-start gap-4 mb-8 w-full">
      {/* Left Side: Title & Subtitle */}
      <div className="flex items-center justify-between  w-full">
        <div className=" ">
          <h1 className="text-3xl font-bold text-white mb-1.5">{title}</h1>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>

      {/* Right Side: Search & User Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
        <UserIcon />
      </div>
    </header>
  );
}

export default TaskPageHeadder;
