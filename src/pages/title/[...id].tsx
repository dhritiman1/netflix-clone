import { MainLayout } from "@/component/mainLayout";
import { getDataById } from "@/lib/fetcher";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { MediaType, TitleData } from "@/types";
import { Button } from "@/component/button";

type HeroProps = {
  data: TitleData | null;
};

const Hero = ({ data }: HeroProps) => {
  return (
    <section className="w-full">
      <div className="absolute inset-0 -z-20 h-[355px] w-screen sm:h-auto">
        <Image
          src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
          alt={data?.title ?? data?.original_title ?? "backdrop"}
          className="h-[unset] w-full object-cover"
          priority={true}
          layout="fill"
        />
      </div>
      <div className="absolute inset-0 -z-10 h-[355px] w-full bg-gradient-to-b from-[#00000000] to-[#181818] sm:h-screen"></div>
      <div className="absolute inset-0 -z-10 hidden h-screen w-full bg-gradient-to-r from-[#181818] from-0% to-[#00000000] to-70% sm:block"></div>
      <section className="mb-20 sm:mt-44">
        <div className="flex h-96 max-w-screen-sm flex-col justify-end gap-2">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {data?.title ?? data?.original_title}
          </h1>
          <div className="flex h-5 gap-2 text-xs font-light opacity-75 sm:text-sm">
            <span>{data?.release_date.split("-")[0] ?? ""}</span>
            {data?.adult !== undefined && (
              <>
                <span>|</span>
                <span className="flex items-center justify-center border px-1 text-[0.69rem]">
                  {data.adult ? "A" : "U/A"}
                </span>
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
    const getData = (async () => {
      const data = await getDataById(
        id?.[0]?.split("-")[0] as MediaType,
        id?.[0]?.split("-")[1]
      );

      setData(data);
    })();
  }, [id]);

  return (
    <MainLayout title={data?.title}>
      <section className="container mx-8 mt-4 max-w-screen-2xl sm:mx-12">
        {data && <Hero data={data} />}
        <div className="flex items-center gap-3 rounded-sm bg-gradient-to-r from-[#242424] to-[#101010] px-8 py-2 shadow-lg sm:my-8 sm:mt-44 sm:h-[60px]">
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
      </section>
    </MainLayout>
  );
};

export default Title;
