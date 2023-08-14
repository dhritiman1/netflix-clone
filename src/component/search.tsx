import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export const SearchBar = () => {
  const [searchVisibile, setSearchVisibile] = useState(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!event.target?.toString().includes("HTMLInputElement")) {
        setSearchVisibile(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [searchVisibile]);

  return (
    <>
      <input
        type="text"
        className={`transition-width border-b bg-transparent px-2 py-1 duration-150 ease-in ${
          searchVisibile ? "w-56" : "hidden w-0"
        } outline-none`}
        placeholder="Search..."
        autoFocus
      />

      <div
        className={`cursor-pointer ${searchVisibile ? "hidden" : ""}`}
        onClick={() => setSearchVisibile(true)}
      >
        ▲{/* <Search size={20} /> */}
      </div>
    </>
  );
};
