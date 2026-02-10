import React from "react";
import PausedCard from "./TaskCards/PausedCard";
import RunningCard from "./TaskCards/RunningCard";
import NotStartedCard from "./TaskCards/NotStartedCard";

function TaskPageCardContainer() {
  return (
    <div className="mt-10">
      <h1 className="text-2xl text-white font-bold mb-5">All Tasks</h1>
      <div className="bg-gradient-to-r from-green-400/5 to-(--bg-color) px-7 pt-5 pb-10 rounded-xl border border-green-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
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
    </div>
  );
}

export default TaskPageCardContainer;
