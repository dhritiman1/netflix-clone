import { api } from "@/utils/api";
import { getTMDBData } from "@/lib/fetcher";
import { MainLayout } from "@/component/mainLayout";
import { useEffect, useState } from "react";
import { Carousel } from "@/component/carousel";
import { Hero } from "@/component/hero";
import type { DataByCategory, ContentCategories } from "@/types";

type Props = {
  contents: DataByCategory[];
};

const Carousels = ({ contents }: Props) => {
  return (
    <section className="mt-12">
      {contents.map((item) => (
        <Carousel
          key={item.category}
          title={item.category}
          content={item.data ?? []}
        />
      ))}
    </section>
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
      <section className="container mx-12 mt-12 max-w-screen-2xl">
        <Hero content={tvData?.discover ?? []} />
        <Carousels contents={dataByCategory} />
      </section>
    </MainLayout>
  );
}
