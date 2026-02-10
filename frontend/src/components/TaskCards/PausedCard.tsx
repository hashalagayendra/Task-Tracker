import React from "react";
import { PlayIcon, MoreHorizontal } from "lucide-react";

function PausedCard({
  title,
  date,
  priority,
  timeEstimate,
}: {
  title: string;
  date: string;
  priority: string;
  timeEstimate: string;
}) {
  return (
    <div className="p-6 bg-zinc-900 border border-amber-400/50 border-t-2 border-t-amber-400 rounded-xl group max-w-[350px]">
      {/* Status Header */}
      <div className="flex items-center gap-2 mb-4 justify-between">
        <span className="text-sm font-bold text-amber-500">Task Paused</span>
        <div className="text-zinc-400 cursor-pointer">
          <MoreHorizontal size={20} />
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
          <span className="px-4 py-2 rounded-md bg-blue-600 text-white text-xs font-medium w-fit">
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

        {/* Right Side: Time Remaining */}
        <div className="text-right">
          <span className="text-xs text-zinc-400 tracking-wider">
            TIME REMAINING
          </span>
          <div className="flex items-baseline gap-1 text-amber-400">
            <span className="text-5xl font-bold">18</span>
            <span className="text-lg font-semibold text-zinc-400">m</span>
            <span className="text-5xl font-bold">30</span>
            <span className="text-lg font-semibold text-zinc-400">s</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
          <span>00:00</span>
          <span>00:20</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2">
          <div
            className="bg-amber-400 h-2 rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>
        <div className="text-right text-sm font-bold text-white mt-1">80%</div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-colors w-full">
          <PlayIcon size={16} />
          Resume
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-green-800/50 hover:bg-green-700/50 border border-green-600 text-green-400 text-sm font-semibold transition-colors w-full">
          Mark as Done
        </button>
      </div>
    </div>
  );
}

export default PausedCard;
