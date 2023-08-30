import Link from "next/link";
import { ScrollButton } from "./scrollButton";
import type { Direction, Video } from "@/types";
import { useRef } from "react";
import Image from "next/image";

type VideoItemProps = {
  id: string;
  name: string;
};

const VideoItem = ({ id, name }: VideoItemProps) => {
  return (
    <div className="flex w-[310px] flex-col gap-2">
      <div className="flex h-[175px] w-[310px] cursor-pointer items-center overflow-hidden">
        <Image
          src={`http://img.youtube.com/vi/${id}/hqdefault.jpg`}
          width={620 / 2}
          height={350 / 2}
          alt={name}
          loading="lazy"
          className="object-cover"
        />
      </div>

      <h3 className="h-auto w-[310] whitespace-break-spaces">{name}</h3>
    </div>
  );
};

type Props = {
  videos: Video;
};

export const VideoCarousel = ({ videos }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: Direction) => {
    if (!carouselRef.current) return;

    const { scrollLeft, clientWidth } = carouselRef.current;
    const offset =
      dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

    carouselRef.current.scrollTo({ left: offset, behavior: "smooth" });
  };

  const youtubeVideos = videos.results
    .filter((video) => video.site.toLowerCase() === "youtube")
    .reverse();

  return (
    <div className="mb-5">
      <div className="relative">
        {videos.results.length >= 5 && (
          <>
            <ScrollButton
              className="left-0 top-0 z-10 h-[175px] bg-gradient-to-r from-[#181818] to-[#18181875] hover:from-[#181818] hover:to-[#18181890]"
              dir="left"
              handleScroll={() => scroll("left")}
            />

            <ScrollButton
              className="right-0 top-0 z-10 h-[175px] bg-gradient-to-l from-[#181818] to-[#18181875] hover:from-[#181818] hover:to-[#18181890]"
              dir="right"
              handleScroll={() => scroll("right")}
            />
          </>
        )}

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-y-hidden scrollbar-none"
        >
          {youtubeVideos.slice(0, 10).map((video) => (
            <VideoItem key={video.id} id={video.key} name={video.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
