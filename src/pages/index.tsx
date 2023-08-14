import { api } from "@/utils/api";
import { getTMDBData } from "@/lib/fetcher";
import { MainLayout } from "@/component/mainLayout";
import { useEffect, useState } from "react";
import { Carousel } from "@/component/carousel";
import type { DataByCategory, ContentCategories } from "@/types";
import { Hero } from "@/component/hero";

type Props = {
  contents: DataByCategory[];
};

const Carousels = ({ contents }: Props) => {
  return (
    <div className="mx-12 mt-12 flex h-[140px] flex-col gap-3">
      {contents.map((item) => (
        <Carousel
          key={item.category}
          title={item.category}
          content={item.data ?? []}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [movieData, setMovieData] = useState<ContentCategories | null>(null);
  const [tvData, setTvData] = useState<ContentCategories | null>(null);

  useEffect(() => {
    const getMovieData = (async () => {
      const movieData = await getTMDBData("movie");
      setMovieData(movieData);
      const tvData = await getTMDBData("tv");
      setTvData(tvData);
    })();
  }, []);

  const dataByCategory = [
    { category: "Trending", data: movieData?.trending },
    { category: "Top Rated", data: movieData?.topRated },
  ];

  return (
    <MainLayout title="home">
      <section className="container mx-8 max-w-screen-2xl">
        <Hero content={tvData?.discover ?? []} />
        <Carousels contents={dataByCategory} />
      </section>
    </MainLayout>
  );
}
