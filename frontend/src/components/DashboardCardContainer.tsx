import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import MainTaskCard from "./TaskCards/MainTaskCard";

function DashboardCardContainer() {
  const {
    tasks,
    tasksLoading,
    fetchTasks,
    deleteTask,
    startTask,
    pauseTask,
    completeTask,
  } = useUser();

  useEffect(() => {
    fetchTasks();
  }, []);

  // Sort tasks by updatedAt in descending order to get the most recent ones
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 3);

  if (tasksLoading) {
    return (
      <div className="mt-10">
        <h1 className="text-2xl text-white font-semibold">Recent Tasks</h1>
        <div className="mt-10 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl text-white font-semibold">Recent Tasks</h1>

      {recentTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recentTasks.map((task) => (
            <MainTaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onStart={startTask}
              onPause={pauseTask}
              onComplete={completeTask}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 p-10 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center text-zinc-500">
          <p className="text-lg">No tasks found</p>
          <p className="text-sm">Create your first task to see it here!</p>
        </div>
      )}
    </div>
  );
}

export default DashboardCardContainer;
