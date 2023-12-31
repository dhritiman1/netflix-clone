import Image from "next/image";
import { useRef, useState } from "react";
import type { Content, Direction, MediaType } from "@/types";
import Link from "next/link";
import { ScrollButton } from "./scrollButton";

type ItemProps = {
  title: string;
  path: string;
};

const Item = ({ title, path }: ItemProps) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500/${path}`}
      alt={title}
      height={168}
      width={299}
      priority
      className="aspect-video h-auto w-auto cursor-pointer object-cover transition-all duration-100 hover:scale-110"
    />
  );
};

type Props = {
  title: string;
  content: Content[];
  type: MediaType;
};

export const Carousel = ({ title, content, type }: Props) => {
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
            className="flex h-[140.5px] gap-1 overflow-y-hidden scrollbar-none sm:h-[168px]"
          >
            {content.map(
              (item) =>
                (item.backdrop_path ?? item.poster_path) && (
                  <Link
                    key={item.id + 1}
                    href={`/title/${type}-${item.id}`}
                    className="aspect-video h-[140.5px] w-[250px] sm:h-auto sm:w-auto"
                  >
                    <Item
                      key={item.id}
                      title={item.title ?? item.name ?? ""}
                      path={item.backdrop_path ?? item.poster_path ?? ""}
                    />
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
