import React from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DashboardHeadder from "../components/DashboardHeadder";
import DashboardCardContainer from "../components/DashboardCardContainer";
import TaskPageHeadder from "../components/TaskPageHeadder";
import { Search } from "lucide-react";
import SearchBox from "../components/SearchBox";

function TaskList() {
  return (
    <div className=" flex-1 px-10 py-8">
      <TaskPageHeadder
        title="My Task"
        subtitle="Stay Organized, Complete Tasks, Achieve Goals "
      />
      <div className="flex justify-between mt-10">
        <SearchBox />
        <div>
          <div className="px-10 py-2 bg-zinc-500/10 rounded-md text-white">
            Filter
          </div>
        </div>
        <button className="px-10 py-2 text-white font-semibold bg-blue-600 rounded-md">
          {" Add Task "}
        </button>
      </div>

      <DashboardCardContainer />
    </div>
  );
}

export default TaskList;
