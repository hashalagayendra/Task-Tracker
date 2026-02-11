import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "notStarted" | "running" | "pause" | "done";
  priority: "high" | "medium" | "low";
  estimatedTime: number;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  totalElapsedSeconds?: number;
  activeTrackerStartTime?: string;
}

// Define the specific allowed values for currentSection
export type SectionType = "DashBoard" | "Tasks" | "Analyzing";

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  tasks: Task[];
  tasksLoading: boolean;
  fetchTasks: () => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addTask: (task: Task) => void;
  startTask: (id: string) => Promise<void>;
  pauseTask: (id: string) => Promise<void>;
  completeTask: (id: string, timeToSpend: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  // Default to "DashBoard" as requested
  const [currentSection, setCurrentSection] =
    useState<SectionType>("DashBoard");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
  };

  const fetchTasks = async () => {
    setTasksLoading(true);
    try {
      const res = await axios.get("/task");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setTasksLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/task/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const startTask = async (id: string) => {
    try {
      const res = await axios.post(`/task/${id}/start`);
      const { task, totalElapsedSeconds, activeTracker } = res.data;
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...task,
                totalElapsedSeconds,
                activeTrackerStartTime: activeTracker.startTime,
              }
            : t,
        ),
      );
      toast.success("Task started!");
    } catch (error) {
      console.error("Error starting task:", error);
      toast.error("Failed to start task");
    }
  };

  const pauseTask = async (id: string) => {
    try {
      const res = await axios.post(`/task/${id}/pause`);
      const { task, totalElapsedSeconds } = res.data;
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...task,
                totalElapsedSeconds,
                activeTrackerStartTime: undefined,
              }
            : t,
        ),
      );
      toast.success("Task paused!");
    } catch (error) {
      console.error("Error pausing task:", error);
      toast.error("Failed to pause task");
    }
  };

  const completeTask = async (id: string, timeToSpend: number) => {
    try {
      const res = await axios.post(`/task/${id}/done`, { timeToSpend });
      const { task } = res.data;
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...task,
                activeTrackerStartTime: undefined,
              }
            : t,
        ),
      );
      toast.success("Task completed!");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        clearUser,
        currentSection,
        setCurrentSection,
        tasks,
        tasksLoading,
        fetchTasks,
        deleteTask,
        addTask,
        startTask,
        pauseTask,
        completeTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
