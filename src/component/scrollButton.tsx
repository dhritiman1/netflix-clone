import type { Direction } from "@/types";
import { Left, Right } from "./icons";

type ScrollButtonProps = {
  dir: Direction;
  className: string;
  handleScroll: () => void;
};

export const ScrollButton = ({
  dir,
  className,
  handleScroll,
}: ScrollButtonProps) => {
  return (
    <button
      aria-label={dir + "button"}
      className={
        "absolute flex h-[168px] w-[3.125rem] items-center justify-center  opacity-100 transition-all duration-100 " +
        className
      }
      onClick={handleScroll}
    >
      <div className="text-2xl font-bold">
        {dir === "left" ? <Left /> : <Right />}
      </div>
    </button>
  );
};
