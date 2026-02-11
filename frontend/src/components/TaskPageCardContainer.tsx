import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import MainTaskCard from "./TaskCards/MainTaskCard";

function TaskPageCardContainer() {
  const {
    tasks,
    tasksLoading,
    fetchTasks,
    deleteTask,
    startTask,
    pauseTask,
    completeTask,
    searchQuery,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
  } = useUser();

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    // Search match
    const query = searchQuery.toLowerCase();
    const searchMatch =
      task.title?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query);

    // Status filter match
    const statusMatch = filterStatus === "all" || task.status === filterStatus;

    // Priority filter match
    const priorityMatch =
      filterPriority === "all" || task.priority === filterPriority;

    return searchMatch && statusMatch && priorityMatch;
  });

  const handleUpdate = (id: string) => {
    // TODO: Open update modal
    console.log("Update task:", id);
  };

  const statusFilters = [
    { label: "All", value: "all" },
    { label: "Not Started", value: "notStarted" },
    { label: "Running", value: "running" },
    { label: "Paused", value: "pause" },
    { label: "Done", value: "done" },
  ];

  const priorityFilters = [
    { label: "All", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl text-white font-bold">All Tasks</h1>

        <div className="flex flex-wrap items-center gap-6">
          {/* Status Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Status:
            </span>
            <div className="flex p-1 bg-zinc-900/80 rounded-lg border border-zinc-800">
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilterStatus(f.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    filterStatus === f.value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Priority:
            </span>
            <div className="flex p-1 bg-zinc-900/80 rounded-lg border border-zinc-800">
              {priorityFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilterPriority(f.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    filterPriority === f.value
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-400/5 to-(--bg-color) px-7 pt-5 pb-10 rounded-xl border border-blue-500/20">
        {tasksLoading ? (
          <p className="text-zinc-400 text-center py-10">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-zinc-400 text-center py-10">
            {searchQuery || filterStatus !== "all" || filterPriority !== "all"
              ? "No tasks match your current search and filters."
              : "No tasks yet. Create one to get started!"}
          </p>
        ) : (
          <div className="flex flex-wrap gap-6 mt-6">
            {filteredTasks.map((task) => (
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
        )}
      </div>
    </div>
  );
}

export default TaskPageCardContainer;
