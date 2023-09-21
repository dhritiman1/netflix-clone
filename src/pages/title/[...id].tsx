import Link from "next/link";
import Image from "next/image";
import { Season } from "@/types";
import { useRouter } from "next/router";
import { Button } from "@/component/button";
import { getDataById } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { MainLayout } from "@/component/mainLayout";
import { VideoCarousel } from "@/component/videoGrid";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { MediaType, TitleData } from "@/types";

type HeroProps = {
  data: TitleData | null;
};

const Hero = ({ data }: HeroProps) => {
  return (
    <section className="w-full">
      <div className="absolute inset-0 -z-20 h-[355px] w-screen sm:h-auto">
        {data && (
          <Image
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt={data?.title ?? data?.original_title ?? "backdrop"}
            className="h-[unset] w-full object-cover"
            priority={true}
            fill
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 h-[355px] w-full bg-gradient-to-b from-[#00000000] to-[#181818] sm:h-screen"></div>
      <div className="absolute inset-0 -z-10 hidden h-screen w-full bg-gradient-to-r from-[#181818] from-0% to-transparent to-70% sm:block"></div>
      <section className="mb-20 mt-36 sm:mt-44">
        <div className="flex h-96 max-w-screen-sm flex-col justify-end gap-2">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {data?.title ?? data?.name ?? data?.original_title}
          </h1>
          <div className="flex h-5 gap-2 text-xs font-light opacity-75 sm:text-sm">
            <span>
              {data?.release_date
                ? data?.release_date.split("-")[0]
                : data?.first_air_date.split("-")[0]}
            </span>
            {data?.adult !== undefined && (
              <>
                <span>|</span>
                <span className="flex items-center justify-center border px-1 text-[0.69rem]">
                  {data.adult ? "A" : "U/A"}
                </span>
              </>
            )}
            {data?.number_of_seasons && (
              <>
                <span>|</span>
                <span>{data.number_of_seasons} seasons</span>
              </>
            )}

            {data?.runtime && (
              <>
                <span>|</span>
                <span>
                  {`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}
                </span>
              </>
            )}
          </div>
          <p className="h-auto text-sm sm:text-base">{data?.overview}</p>
          {data?.credits.cast && (
            <p className="text-sm sm:text-base">
              <span className="opacity-70">Starring:</span>{" "}
              {data.credits.cast.slice(0, 4).map((cast) => (
                <span key={cast.id}>
                  {cast.name}
                  {data.credits.cast?.[3]?.id !== cast.id ? "," : ""}{" "}
                </span>
              ))}
            </p>
          )}
          <SignedIn>
            <div className="my-4">
              <Button text="Add to List" type="ghost" icon={"add"} />
            </div>
          </SignedIn>
        </div>
      </section>
    </section>
  );
};

type SeasonProps = {
  season: Season;
  i: number;
};

const Season = ({ season, i }: SeasonProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Season {i}</p>
      <div className="flex flex-col flex-wrap">
        <p className="font-medium">
          Release year: {season.air_date.split("-")[0]}
        </p>
        <p className="hidden text-sm opacity-80 sm:text-base md:block">
          {season.overview}
        </p>
        <p className="text-sm opacity-70 sm:text-base">
          Episodes: {season.episode_count}
        </p>
      </div>
    </div>
  );
};

const Title = () => {
  const [data, setData] = useState<null | TitleData>(null);
  const router = useRouter();
  const slug = router.query.id;
  const mediaType = slug?.[0]?.split("-")[0] as MediaType;
  const id = slug?.[0]?.split("-")[1];

  const youtubeVideos = data?.videos.results
    .filter((video) => video.site.toLowerCase() === "youtube")
    .reverse();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getData = (async () => {
      const data = await getDataById(mediaType, id);

      setData(data);
    })();
  }, [id, mediaType]);

  return (
    <MainLayout title={data?.title ?? data?.name}>
      <section className="container mt-4 max-w-screen-2xl">
        <Hero data={data} />
        <SignedOut>
          <div className="mb-8 flex items-center gap-3 rounded-sm bg-gradient-to-r from-[#242424] to-[#151515] px-8 py-2 shadow-lg sm:my-8 sm:mt-44 sm:h-[60px]">
            <Image
              src={"/minimal_logo.png"}
              alt="logo"
              width={21}
              height={38}
              loading="lazy"
              className="h-[60px] w-[32px] sm:h-[38px] sm:w-[21px]"
            />
            <div className="flex flex-col items-center gap-1 sm:w-full sm:flex-row sm:justify-between sm:gap-3">
              <p className="text-sm font-light sm:text-base">
                Watch all you want
              </p>
              <Link href="/sign-up" className="h-[32px]">
                <Button type="netflix" text="Join Now" />
              </Link>
            </div>
          </div>
        </SignedOut>

        {youtubeVideos && youtubeVideos.length > 0 && (
          <section className="w-full max-w-screen-2xl">
            <div className="mb-2 flex items-end gap-3">
              <h2 className="pr-2 text-3xl font-light sm:border-r">Videos</h2>
              <h3 className="hidden text-[1.25rem] font-light opacity-70 sm:block">
                {data?.title ?? data?.original_title ?? data?.name}
              </h3>
            </div>
            <VideoCarousel videos={youtubeVideos} />
          </section>
        )}

        {data?.seasons && (
          <section>
            <div className="mb-2 flex items-end gap-3">
              <h2 className="pr-2 text-3xl font-light sm:border-r">Seasons</h2>
              <h3 className="hidden text-[1.25rem] font-light opacity-70 sm:block">
                {data?.title ?? data?.original_title ?? data?.name}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {data.seasons.map((season, index) => (
                <Season key={index} i={index + 1} season={season} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-5">
          <h2 className="mb-2 pr-2 text-3xl font-light">More Details</h2>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="">
                <p className="opacity-70">Watch offline</p>
                <p className=" text-sm sm:text-base">Available to download</p>
              </div>
              <div className="">
                <p className="opacity-70">Genres</p>
                <p className=" text-sm sm:text-base">
                  {data?.genres.map((genre) => (
                    <span key={genre.id}>
                      {genre.name}
                      {data.genres?.[data.genres.length - 1]?.id !== genre.id
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            {data?.credits.cast && (
              <div>
                <p className="opacity-70">Cast</p>
                <div className="grid grid-cols-2 gap-x-3 text-sm sm:grid-cols-4 sm:text-base">
                  {data?.credits.cast
                    .filter(
                      (c) => c.known_for_department.toLowerCase() === "acting"
                    )
                    .slice(0, 10)
                    .map((cast) => (
                      <p key={cast.id}>{cast.name}</p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export default Title;
