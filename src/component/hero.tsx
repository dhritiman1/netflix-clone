import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "./button";

import { GENRES } from "@/lib/genres";
import type { Content } from "@/types";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { Add } from "./icons";

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
          className="object-cover object-center"
          priority={true}
          fill
        />
      </div>
      <div className="absolute inset-0 -z-10 h-screen w-full bg-gradient-to-b from-[#00000070] to-[#181818]"></div>
      <section className="mt-16 sm:mt-40">
        <div className="flex h-96 max-w-screen-sm flex-col justify-end gap-[0.325rem]">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {randomShow?.title ?? randomShow?.name}
          </h1>

          <div className="flex gap-2 text-xs font-light opacity-75 sm:text-sm">
            <span>{randomShow?.first_air_date?.split("-")[0] ?? ""}</span>
            {randomShow?.genre_ids?.slice(0, 2).map((id) => (
              <span key={id + "d"} className="flex gap-2">
                <span key={id + "s"}>|</span>
                <span key={id} className="overflow-hidden">
                  {GENRES[id]}
                </span>
              </span>
            ))}
          </div>
          <p className="line-clamp-4 text-sm sm:text-base">
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
          <Link
            href={`/title/${
              randomShow?.first_air_date === undefined ||
              randomShow?.first_air_date === null
                ? "movie"
                : "tv"
            }-${randomShow?.id}`}
          >
            <Button type="ghost" icon="info" text="More Info" />
          </Link>
          <SignedIn>
            <div className="cursor-pointer active:opacity-70">
              <Add size={34} stroke={1} />
            </div>
          </SignedIn>
        </div>
      </section>
    </section>
  );
};
