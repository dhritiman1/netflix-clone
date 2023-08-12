import { api } from "@/utils/api";
import { getTMDBData } from "@/lib/fetcher";
import { MainLayout } from "@/component/mainLayout";
import { useEffect, useState } from "react";
import { Carousel } from "@/component/carousel";
import type { DataByCategory, MovieData } from "@/types";
import { Hero } from "@/component/hero";

type Props = {
  contents: DataByCategory[];
};

const Carousels = ({ contents }: Props) => {
  return (
    <div className="flex flex-col gap-3">
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

  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    const getMovieData = (async () => {
      const data = await getTMDBData("movie");
      setMovieData(data);
    })();
  }, []);

  const dataByCategory = [
    { category: "Trending", data: movieData?.trending },
    { category: "Top Rated", data: movieData?.topRated },
  ];

  return (
    <MainLayout title="home">
      <section className="container max-w-screen-2xl">
        <Hero content={movieData?.discover ?? []} />
        <Carousels contents={dataByCategory} />
      </section>
    </MainLayout>
  );
}
