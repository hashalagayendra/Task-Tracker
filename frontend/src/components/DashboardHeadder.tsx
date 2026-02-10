import React from "react";
import SearchBox from "./SearchBox";
import UserIcon from "./UserIcon";

function DashboardHeadder({
  title = "Dash Board",
  subtitle = "Stay Organized, Complete Tasks, Achieve Goals",
  user = {
    name: "Hsala gayendra",
    handle: "@hslagayendra9987",
    initial: "H",
  },
}: {
  title?: string;
  subtitle?: string;
  user?: { name: string; handle: string; initial: string };
}) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 mb-8 w-full">
      {/* Left Side: Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1.5">{title}</h1>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>

      {/* Right Side: Search & User Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
        {/* Search Box */}

        <SearchBox />
        {/* User Profile */}
        <UserIcon />
      </div>
    </header>
  );
}

export default DashboardHeadder;
