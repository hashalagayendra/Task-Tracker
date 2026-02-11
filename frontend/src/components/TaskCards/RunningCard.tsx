import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pause, Trash2, Pencil } from "lucide-react";

function RunningCard({
  title,
  date,
  priority,
  timeEstimate,
  estimatedTimeSeconds,
  totalElapsedSeconds,
  activeTrackerStartTime,
  onDelete,
  onUpdate,
}: {
  title: string;
  date: string;
  priority: string;
  timeEstimate: string;
  estimatedTimeSeconds: number;
  totalElapsedSeconds: number;
  activeTrackerStartTime?: string;
  onDelete?: () => void;
  onUpdate?: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live countdown timer
  useEffect(() => {
    const calcRemaining = () => {
      const liveElapsed = activeTrackerStartTime
        ? Math.floor(
            (Date.now() - new Date(activeTrackerStartTime).getTime()) / 1000,
          )
        : 0;
      const remaining =
        estimatedTimeSeconds - totalElapsedSeconds - liveElapsed;
      setRemainingSeconds(Math.max(0, remaining));
    };

    calcRemaining();
    const interval = setInterval(calcRemaining, 1000);
    return () => clearInterval(interval);
  }, [estimatedTimeSeconds, totalElapsedSeconds, activeTrackerStartTime]);

  const displayMinutes = Math.floor(remainingSeconds / 60);
  const displaySeconds = remainingSeconds % 60;

  // Progress calculation
  const totalUsed = estimatedTimeSeconds - remainingSeconds;
  const progressPercent =
    estimatedTimeSeconds > 0
      ? Math.min(100, Math.round((totalUsed / estimatedTimeSeconds) * 100))
      : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-zinc-900 border border-lime-400/50 border-t-2 border-t-lime-400 rounded-xl group max-w-[350px]">
      {/* Status Header */}
      <div className="flex  gap-2 mb-4 justify-between items-start">
        <span className="text-sm font-bold text-lime-500">
          Task is Running ...
        </span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <MoreHorizontal size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 z-50 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 min-w-[160px]">
              <button
                onClick={() => {
                  onUpdate?.();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <Pencil size={14} />
                Update Task
              </button>
              <button
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 gap-2 ">
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-zinc-400 mb-6">
        Design the Home screen according to the client requirements in the
        brief. Carefully lay out the style, color and font.
      </p>

      {/* Middle Info Section */}
      <div className="flex items-start justify-between mb-6">
        {/* Left Side: Date & Priority */}
        <div className="flex flex-col gap-3">
          {/* Date Pill */}
          <span className="px-4 py-2 rounded-md bg-blue-900 text-white text-xs font-medium w-fit">
            {date}
          </span>

          {/* Priority Pill */}
          <span
            className={`px-4 py-2 rounded-md text-xs font-medium w-fit ${
              priority === "High Piority"
                ? "bg-red-900/50 text-red-400"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {priority}
          </span>
        </div>

        {/* Right Side: Time Remaining - LIVE */}
        <div className="text-right">
          <span className="text-xs text-zinc-400 tracking-wider">
            TIME REMAINING
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-white">
              {displayMinutes}
            </span>
            <span className="text-lg font-semibold text-zinc-400">m</span>
            <span className="text-5xl font-bold text-white">
              {String(displaySeconds).padStart(2, "0")}
            </span>
            <span className="text-lg font-semibold text-zinc-400">s</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
          <span>00:00</span>
          <span>{formatTime(estimatedTimeSeconds)}</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2">
          <div
            className="bg-lime-400 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="text-right text-sm font-bold text-white mt-1">
          {progressPercent}%
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-colors w-full">
          <Pause size={16} />
          Pause
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-green-800/50 hover:bg-green-700/50 border border-green-600 text-green-400 text-sm font-semibold transition-colors w-full">
          Mark as Done
        </button>
      </div>
    </div>
  );
}

export default RunningCard;
