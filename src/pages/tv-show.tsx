import { Carousels } from "@/component/carouselList";
import { MainLayout } from "@/component/mainLayout";
import { getTVShowData } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import type { DataByCategory, HomeContentCategories } from "@/types";

const TVShows = () => {
  const [data, setData] = useState<HomeContentCategories | null>(null);
  useEffect(() => {
    const getData = (async () => {
      const data = await getTVShowData();
      setData(data);
    })();
  });

  const dataByCategory: DataByCategory[] = [
    {
      category: "Suspenseful TV Shows",
      data: data?.thriller,
    },
    {
      category: "TV Comedies",
      data: data?.comedy,
    },
    {
      category: "Anime",
      data: data?.anime,
    },
    {
      category: "K-Dramas",
      data: data?.kdrama,
    },
    {
      category: "US TV Shows",
      data: data?.usShows,
    },
    {
      category: "Animation",
      data: data?.animation,
    },
  ];

  return (
    <MainLayout title="TV Shows">
      <section className="container mx-8 max-w-screen-2xl sm:mx-12">
        <div className="mt-12 flex flex-col gap-2">
          <h1 className="text-[3.5rem] font-medium">TV Shows</h1>
          <p className="w-[35rem] text-base md:text-[1.125rem]">
            These days, the small screen has some very big things to offer. From
            sitcoms to dramas to travel and talk shows, these are all the best
            shows on TV.
          </p>
        </div>
        {<Carousels contents={dataByCategory} />}
      </section>
    </MainLayout>
  );
};

export default TVShows;
