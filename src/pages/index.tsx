import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { getTMDBData } from "@/lib/fetcher";
import type { ContentCategories, DataByCategory } from "@/types";

import { Hero } from "@/component/hero";
import { MainLayout } from "@/component/mainLayout";
import { Carousels } from "@/component/carouselList";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [movieData, setMovieData] = useState<ContentCategories | null>(null);
  const [tvData, setTvData] = useState<ContentCategories | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const getData = (async () => {
      const movieData = await getTMDBData("movie");
      setMovieData(movieData);
      const tvData = await getTMDBData("tv");
      setTvData(tvData);
      setIsLoading(false);
    })();
  }, []);

  const dataByCategory: DataByCategory[] = [
    { category: "Trending", data: movieData?.trending, type: "movie" },
    { category: "Top Rated", data: movieData?.topRated, type: "movie" },
    { category: "Action Thrillers", data: movieData?.action, type: "movie" },
    { category: "Comedies", data: movieData?.comedy, type: "movie" },
    { category: "Horror Movies", data: movieData?.horror, type: "movie" },
    { category: "Romance Movies", data: movieData?.romance, type: "movie" },
    { category: "Documentaries", data: movieData?.documentary, type: "movie" },
  ];
  // ,

  console.log(user?.id);

  return (
    !isLoading && (
      <MainLayout title="Netflix Home">
        <section className="container mx-8 mt-12 max-w-screen-2xl sm:mx-12">
          <Hero content={tvData?.discover ?? []} />
          <Carousels contents={dataByCategory} />
        </section>
      </MainLayout>
    )
  );
}
