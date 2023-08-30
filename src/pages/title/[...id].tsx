import { MainLayout } from "@/component/mainLayout";
import { getDataById } from "@/lib/fetcher";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { MediaType, TitleData } from "@/types";
import { Button } from "@/component/button";
import { VideoCarousel } from "@/component/videoGrid";

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
            layout="fill"
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 h-[355px] w-full bg-gradient-to-b from-[#00000000] to-[#181818] sm:h-screen"></div>
      <div className="absolute inset-0 -z-10 hidden h-screen w-full bg-gradient-to-r from-[#181818] from-0% to-transparent to-70% sm:block"></div>
      <section className="mb-20 sm:mt-44">
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
          <p className="line-clamp-[10] h-auto text-sm sm:text-base">
            {data?.overview}
          </p>
          {data?.credits && (
            <p>
              <span className="opacity-70">Starring:</span>{" "}
              {data.credits.cast.slice(0, 4).map((cast) => (
                <span key={cast.id}>
                  {cast.name}
                  {data.credits.cast?.[3]?.id !== cast.id ? "," : ""}{" "}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>
    </section>
  );
};

const Title = () => {
  const [data, setData] = useState<null | TitleData>(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getData = (async () => {
      const data = await getDataById(
        id?.[0]?.split("-")[0] as MediaType,
        id?.[0]?.split("-")[1]
      );

      setData(data);
    })();
  }, [id]);

  return (
    <MainLayout title={data?.title ?? data?.name}>
      <section className="container mx-8 mt-4 max-w-screen-2xl sm:mx-12">
        <Hero data={data} />
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
            <div className="h-[32px]">
              <Button
                type="netflix"
                text="Join Now"
                handleClick={() => {
                  console.log("sign-up");
                }}
              />
            </div>
          </div>
        </div>
        <section className="w-full max-w-screen-2xl">
          <div className="mb-5 flex items-end gap-3">
            <h2 className="border-r pr-2 text-3xl font-light">Videos</h2>
            <h3 className="text-[1.25rem] font-light opacity-70">
              {data?.title ?? data?.original_title ?? data?.name}
            </h3>
          </div>
          {data?.videos && <VideoCarousel videos={data.videos} />}
        </section>
        <section>
          <h2 className="mb-2 pr-2 text-3xl font-light">More Details</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap">
              <div className="w-[390px]">
                <p className="opacity-70">Watch offline</p>
                <p>Available to download</p>
              </div>
              <div className="w-[390px]">
                <p className="opacity-70">Genres</p>
                <p>
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
            <div>
              <p className="opacity-70">Cast</p>
              <div className="flex flex-wrap">
                {data?.credits.cast
                  .filter(
                    (c) => c.known_for_department.toLowerCase() === "acting"
                  )
                  .slice(0, 10)
                  .map((cast) => (
                    <p key={cast.id} className="w-[390px]">
                      {cast.name}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export default Title;
