import React from "react";
import NotStartedCard from "./TaskCards/NotStartedCard";
import RunningCard from "./TaskCards/RunningCard";
import PausedCard from "./TaskCards/PausedCard";
function DashboardCardContainer() {
  return (
    <div className="mt-10">
      <h1 className="text-2xl text-white font-semibold">Resent Task</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <NotStartedCard
          title="Create Home screen ERP Website"
          date="September 28, 2093"
          priority="High Piority"
          timeEstimate="30 Min"
        ></NotStartedCard>
        <RunningCard
          title="Create Home screen ERP Website"
          date="September 28, 2093"
          priority="High Piority"
          timeEstimate="30 Min"
        ></RunningCard>

        <PausedCard
          title="Create Home screen ERP Website"
          date="September 28, 2093"
          priority="High Piority"
          timeEstimate="30 Min"
        ></PausedCard>
      </div>
    </div>
  );
}

export default DashboardCardContainer;
