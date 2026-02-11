import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import type { Task } from "../context/UserContext";
import MainTaskCard from "./TaskCards/MainTaskCard";
import UpdateTaskModal from "./UpdateTaskModal";

function DashboardCardContainer() {
  const {
    tasks,
    tasksLoading,
    fetchTasks,
    deleteTask,
    updateTask,
    startTask,
    pauseTask,
    completeTask,
    searchQuery,
    filterStatus,
    filterPriority,
  } = useUser();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on searchQuery, status, and priority
  // Sort tasks by updatedAt in descending order to get the most recent ones
  const recentTasks = tasks
    .filter((task) => {
      // Search match
      const query = searchQuery.toLowerCase();
      const searchMatch =
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query);

      // Status filter match
      const statusMatch =
        filterStatus === "all" || task.status === filterStatus;

      // Priority filter match
      const priorityMatch =
        filterPriority === "all" || task.priority === filterPriority;

      return searchMatch && statusMatch && priorityMatch;
    })
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 3);

  const handleUpdate = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) setEditingTask(task);
  };

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
        <div className="flex flex-wrap gap-6 mt-6">
          {recentTasks.map((task) => (
            <MainTaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={handleUpdate}
              onStart={startTask}
              onPause={pauseTask}
              onComplete={completeTask}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 p-10 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center text-zinc-500">
          <p className="text-lg">
            {searchQuery || filterStatus !== "all" || filterPriority !== "all"
              ? "No tasks match your filters"
              : "No tasks found"}
          </p>
          <p className="text-sm">
            {searchQuery || filterStatus !== "all" || filterPriority !== "all"
              ? "Adjust your filters to see more tasks"
              : "Create your first task to see it here!"}
          </p>
        </div>
      )}

      {/* Update Task Modal */}
      {editingTask && (
        <UpdateTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={(updatedTask) => {
            updateTask(updatedTask);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default DashboardCardContainer;
