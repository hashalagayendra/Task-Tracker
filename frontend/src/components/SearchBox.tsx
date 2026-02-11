import { useUser } from "../context/UserContext";

function SearchBox() {
  const { searchQuery, setSearchQuery } = useUser();

  return (
    <div className="flex items-center bg-[#18181b] border border-zinc-700 rounded-lg px-3 py-2 w-full sm:w-[300px] hover:border-zinc-600 transition-colors group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-zinc-500 group-focus-within:text-zinc-300 transition-colors"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        type="text"
        placeholder="Search Tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent border-none outline-none text-zinc-200 text-sm ml-2 flex-grow placeholder-zinc-600"
      />

      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBox;
