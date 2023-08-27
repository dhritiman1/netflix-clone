import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Search } from "./icons";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleQuery: (input: string) => Promise<void>;
};

export const SearchBar = ({ query, setQuery, handleQuery }: Props) => {
  const [searchVisibile, setSearchVisibile] = useState(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        !event.target?.toString().includes("HTMLInputElement") &&
        query === ""
      ) {
        setSearchVisibile(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [searchVisibile, query]);

  return (
    <>
      <input
        type="text"
        className={`transition-width border-b bg-transparent px-2 py-1 duration-150 ease-in ${
          searchVisibile ? "w-56" : "hidden w-0"
        } outline-none`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={() => void handleQuery(query)}
        placeholder="Search..."
        autoFocus
      />

      <div
        className={`cursor-pointer ${searchVisibile ? "hidden" : ""}`}
        onClick={() => setSearchVisibile(true)}
      >
        <Search />
      </div>
    </>
  );
};
