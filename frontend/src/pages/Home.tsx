import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-(--bg-color) flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <h1 className="text-6xl font-bold tracking-tight text-blue-600">
          Task Master
        </h1>
        <p className="text-xl text-zinc-400 max-w-md mx-auto">
          Streamline your workflow, track your productivity, and achieve your
          goals with elegance.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Link to="/login">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-8 py-3 bg-transparent border-2 border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-lg font-semibold transition-all duration-200 hover:bg-white/5 active:scale-95 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-zinc-600 text-sm">
        © {new Date().getFullYear()} Task Master. All rights reserved.
      </div>
    </div>
  );
}

export default Home;
