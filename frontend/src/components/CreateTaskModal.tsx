import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

interface CreateTaskModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

// Enums matching backend
const TaskStatus = {
  notStarted: "notStarted",
  running: "running",
  pause: "pause",
  done: "done",
} as const;

type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

const TaskPriority = {
  high: "high",
  medium: "medium",
  low: "low",
} as const;

type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.low);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status] = useState<TaskStatus>(TaskStatus.notStarted);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        title,
        description,
        priority,
        status,
        estimatedTime: Number(estimatedTime),
        userId: user?.id || "temp-user-id",
      };

      await axios.post("/task", payload);
      toast.success("Task created successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#18181B] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-white/5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create new Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Task Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className="w-full bg-[#27272A] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-500 border border-transparent focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="w-full bg-[#27272A] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-500 border border-transparent focus:border-blue-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">
              Estimated Time (mins)
            </label>
            <input
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g. 60"
              className="w-full bg-[#27272A] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-500 border border-transparent focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Set Priority
            </label>
            <div className="flex bg-[#27272A] p-1 rounded-lg w-fit">
              {[
                { label: "Low", value: TaskPriority.low },
                { label: "Medium", value: TaskPriority.medium },
                { label: "High", value: TaskPriority.high },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    priority === option.value
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create New Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
