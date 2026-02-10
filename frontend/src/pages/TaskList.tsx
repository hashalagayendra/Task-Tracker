import React from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DashboardHeadder from "../components/DashboardHeadder";
import DashboardCardContainer from "../components/DashboardCardContainer";

function TaskList() {
  return (
    <div className=" flex-1 px-10 py-8">
      <DashboardHeadder />
      <div className=" w-full grid grid-cols-4 justify-items-center gap-8">
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </div>
      <DashboardCardContainer />
    </div>
  );
}

export default TaskList;
