import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { getTMDBData } from "@/lib/fetcher";
import type { ContentCategories } from "@/types";

import { Hero } from "@/component/hero";
import { MainLayout } from "@/component/mainLayout";
import { Carousels } from "@/component/carouselList";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [movieData, setMovieData] = useState<ContentCategories | null>(null);
  const [tvData, setTvData] = useState<ContentCategories | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = (async () => {
      const movieData = await getTMDBData("movie");
      setMovieData(movieData);
      const tvData = await getTMDBData("tv");
      setTvData(tvData);
      setIsLoading(false);
    })();
  }, []);

  const dataByCategory = [
    { category: "Trending", data: movieData?.trending },
    { category: "Top Rated", data: movieData?.topRated },
    { category: "Action Thrillers", data: movieData?.action },
    { category: "Comedies", data: movieData?.comedy },
    { category: "Horror Movies", data: movieData?.horror },
    { category: "Romance Movies", data: movieData?.romance },
  ];
  // { category: "Documentaries", data: movieData?.documentary },

  return (
    !isLoading && (
      <MainLayout title="home">
        <section className="container mx-8 mt-12 max-w-screen-2xl sm:mx-12">
          <Hero content={tvData?.discover ?? []} />
          <Carousels contents={dataByCategory} />
        </section>
      </MainLayout>
    )
  );
}
