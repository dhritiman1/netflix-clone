import { ScrollButton } from "./scrollButton";
import type { Direction, Video } from "@/types";
import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Modal } from "./videoModal";

type VideoItemProps = {
  id: string;
  name: string;
  setYoutubeId: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const VideoItem = ({
  id,
  name,
  setYoutubeId,
  setTitle,
  setShowModal,
}: VideoItemProps) => {
  const toggleModal = () => {
    setYoutubeId(id);
    setTitle(name);
    setShowModal(true);
  };
  return (
    <div className="flex w-[240px] flex-col gap-2 sm:w-[310px]">
      <div
        className="flex aspect-video w-[240px] cursor-pointer items-center overflow-hidden sm:w-[310px]"
        onClick={() => toggleModal()}
      >
        <Image
          src={`http://img.youtube.com/vi/${id}/hqdefault.jpg`}
          width={620 / 2}
          height={350 / 2}
          alt={name}
          loading="lazy"
          className="aspect-video h-auto w-auto object-cover transition-all duration-150 hover:scale-105"
        />
      </div>

      <h3
        className="h-auto whitespace-break-spaces text-sm opacity-80"
        onClick={() => toggleModal()}
      >
        {name}
      </h3>
    </div>
  );
};

type Props = {
  videos: Video[];
};

export const VideoCarousel = ({ videos }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [youtubeId, setYoutubeId] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const scroll = (dir: Direction) => {
    if (!carouselRef.current) return;

    const { scrollLeft, clientWidth } = carouselRef.current;
    const offset =
      dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

    carouselRef.current.scrollTo({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="mb-5">
      <Modal
        id={youtubeId}
        title={title}
        show={showModal}
        setShowModal={setShowModal}
        setYoutubeId={setYoutubeId}
      />
      <div className="relative">
        {videos.length >= 5 && (
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
          className="flex gap-1 overflow-y-hidden scrollbar-none"
        >
          {videos.slice(0, 10).map((video) => (
            <VideoItem
              key={video.id}
              id={video.key}
              name={video.name}
              setYoutubeId={setYoutubeId}
              setTitle={setTitle}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
