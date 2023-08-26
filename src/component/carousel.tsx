import Image from "next/image";
import { useRef, useState } from "react";
import { Left, Right } from "./icons";
import type { Content } from "@/types";

type Direction = "left" | "right";

type ItemProps = {
  title: string;
  path: string;
};

const Item = ({ title, path }: ItemProps) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500/${path}`}
      alt={title}
      height={168 * (16 / 9)}
      width={299}
      loading="lazy"
      className="aspect-video cursor-pointer object-cover transition-all duration-100 hover:scale-110"
    />
  );
};

type ScrollButtonProps = {
  dir: Direction;
  className: string;
  handleScroll: () => void;
};

const ScrollButton = ({ dir, className, handleScroll }: ScrollButtonProps) => {
  return (
    <button
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

type Props = {
  title: string;
  content: Content[];
};

export const Carousel = ({ title, content }: Props) => {
  const [isLeftScrollable, setIsLeftScrollable] = useState(false);
  const [isRightScrollable, setIsRightScrollable] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: Direction) => {
    if (!carouselRef.current) return;

    setIsLeftScrollable(true);

    const { scrollLeft, clientWidth } = carouselRef.current;
    const offset =
      dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

    carouselRef.current.scrollTo({ left: offset, behavior: "smooth" });

    if (offset <= 0) {
      setIsLeftScrollable(false);
    }

    const width =
      clientWidth <= 420 ? 299 * 20 : clientWidth <= 910 ? 5500 : 4500;

    if (offset >= width) {
      setIsRightScrollable(false);
    } else {
      setIsRightScrollable(true);
    }
  };

  return (
    <div className="mb-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">{title}</h2>
        <div className="relative">
          {isLeftScrollable && (
            <ScrollButton
              className="left-0 top-0 z-10 bg-gradient-to-r from-[#181818] to-[#18181875] hover:from-[#181818] hover:to-[#18181890]"
              dir="left"
              handleScroll={() => scroll("left")}
            />
          )}
          {isRightScrollable && (
            <ScrollButton
              className="right-0 top-0 z-10 bg-gradient-to-l from-[#181818] to-[#18181875] hover:from-[#181818] hover:to-[#18181890]"
              dir="right"
              handleScroll={() => scroll("right")}
            />
          )}

          <div
            ref={carouselRef}
            className="flex h-[168px] gap-1 overflow-y-hidden scrollbar-none"
          >
            {content.map((item) => (
              <Item
                key={item.id}
                title={item.title ?? item.name ?? ""}
                path={item.backdrop_path ?? ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
