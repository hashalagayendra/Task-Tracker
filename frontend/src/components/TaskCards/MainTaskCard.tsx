import NotStartedCard from "./NotStartedCard";
import PausedCard from "./PausedCard";
import RunningCard from "./RunningCard";
import DoneCard from "./DoneCard";
import type { Task } from "../../context/UserContext";

interface MainTaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
  onStart?: (id: string) => void;
  onPause?: (id: string) => void;
  onComplete?: (id: string, timeToSpend: number) => void;
}

function MainTaskCard({
  task,
  onDelete,
  onUpdate,
  onStart,
  onPause,
  onComplete,
}: MainTaskCardProps) {
  const priorityLabel =
    task.priority === "high"
      ? "High Piority"
      : task.priority === "medium"
        ? "Medium Priority"
        : "Low Priority";

  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timeEstimate = `${Math.floor(task.estimatedTime / 60)} Min`;

  switch (task.status) {
    case "running":
      return (
        <RunningCard
          title={task.title || "Untitled Task"}
          date={date}
          priority={priorityLabel}
          timeEstimate={timeEstimate}
          estimatedTimeSeconds={task.estimatedTime}
          totalElapsedSeconds={task.totalElapsedSeconds || 0}
          activeTrackerStartTime={task.activeTrackerStartTime}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
          onPause={() => onPause?.(task.id)}
          onComplete={(timeToSpend) => onComplete?.(task.id, timeToSpend)}
        />
      );
    case "pause":
      return (
        <PausedCard
          title={task.title || "Untitled Task"}
          date={date}
          priority={priorityLabel}
          timeEstimate={timeEstimate}
          estimatedTimeSeconds={task.estimatedTime}
          totalElapsedSeconds={task.totalElapsedSeconds || 0}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
          onResume={() => onStart?.(task.id)}
          onComplete={(timeToSpend) => onComplete?.(task.id, timeToSpend)}
        />
      );
    case "done":
      return (
        <DoneCard
          title={task.title || "Untitled Task"}
          description={task.description}
          date={date}
          priority={priorityLabel}
          timeToSpend={task.timeToSpend || 0}
          estimatedTimeSeconds={task.estimatedTime}
          totalUsedSeconds={task.totalElapsedSeconds || 0}
          onDelete={() => onDelete?.(task.id)}
        />
      );
    case "notStarted":
    default:
      return (
        <NotStartedCard
          title={task.title || "Untitled Task"}
          date={date}
          priority={priorityLabel}
          timeEstimate={timeEstimate}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
          onStart={() => onStart?.(task.id)}
        />
      );
  }
}

export default MainTaskCard;
