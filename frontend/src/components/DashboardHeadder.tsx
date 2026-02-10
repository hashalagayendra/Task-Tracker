import React from "react";
import SearchBox from "./SearchBox";
import UserIcon from "./UserIcon";

function DashboardHeadder({
  title = "Dash Board",
  subtitle = "Stay Organized, Complete Tasks, Achieve Goals",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start md:items-start gap-4 mb-8 w-full">
      {/* Left Side: Title & Subtitle */}
      <div className="flex items-center justify-between  w-full">
        <div className=" ">
          <h1 className="text-3xl font-bold text-white mb-1.5">{title}</h1>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>
        <div className="lg:hidden self-start">
          <UserIcon />
        </div>
      </div>

      {/* Right Side: Search & User Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
        {/* Search Box */}

        <SearchBox />
        {/* User Profile */}
        <div className="max-lg:hidden">
          {" "}
          <UserIcon />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeadder;
