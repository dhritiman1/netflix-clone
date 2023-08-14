import type { Content } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./button";

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
    <section className="container mx-12 w-full max-w-screen-2xl">
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
      <div className="mt-16">
        <section className="flex h-96 max-w-screen-sm flex-col justify-end">
          <h1 className="mb-2 text-4xl font-semibold">
            {randomShow?.title ?? randomShow?.name}
          </h1>
          <div>
            <p>{randomShow?.runtime}</p>
          </div>
          <p className="text-md line-clamp-4 h-[96px] md:text-base">
            {randomShow?.overview}
          </p>
        </section>
      </div>
      <div className="my-4">
        <Button
          type="neutral"
          icon={"▲"}
          text="Play"
          handleClick={() => console.log("play trailer")}
        />
      </div>
    </section>
  );
};
