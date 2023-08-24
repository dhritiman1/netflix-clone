import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "./button";

import { GENRES } from "@/lib/genres";
import type { Content } from "@/types";

type Props = {
  content: Content[];
};

export const Hero = ({ content }: Props) => {
  const [randomShow, setRandomShow] = useState<Content | null>(null);
  useEffect(() => {
    const random = Math.floor(Math.random() * content.length);
    setRandomShow(content[random] ?? null);
  }, [content]);

  return (
    <section className="">
      <div className="absolute inset-0 -z-20 h-screen w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original/${randomShow?.backdrop_path}`}
          alt={randomShow?.title ?? randomShow?.name ?? "poster"}
          className="h-auto w-full object-cover"
          priority={true}
          fill
        />
      </div>
      <div className="absolute inset-0 -z-10 h-screen w-full bg-gradient-to-b from-[#00000070] to-[#181818]"></div>
      <section className="mt-24">
        <div className="flex h-96 max-w-screen-sm flex-col justify-end gap-[0.325rem]">
          <h1 className=" text-4xl font-semibold">
            {randomShow?.title ?? randomShow?.name}
          </h1>
          <div className="flex gap-2 text-sm font-light opacity-75">
            <span>{randomShow?.first_air_date?.split("-")[0] ?? ""}</span>
            {randomShow?.genre_ids?.map((id) => (
              <span key={id + "d"} className="flex gap-2">
                <span key={id + "s"}>|</span>
                <span key={id}>{GENRES[id]}</span>
              </span>
            ))}
          </div>
          <p className="text-md line-clamp-4 h-[96px] md:text-base">
            {randomShow?.overview}
          </p>
        </div>
        <div className="my-4 flex gap-x-4">
          <Button
            type="neutral"
            icon={"play"}
            text="Play"
            handleClick={() => console.log("play trailer")}
          />
          <Button
            type="ghost"
            icon="info"
            text="More Info"
            handleClick={() => console.log("show the movie page")}
          />
        </div>
      </section>
    </section>
  );
};
