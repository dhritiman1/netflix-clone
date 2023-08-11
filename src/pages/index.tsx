import { api } from "@/utils/api";
import { getTMDBData } from "@/lib/fetcher";
import { MainLayout } from "@/component/mainLayout";
import { useEffect, useState } from "react";
import type { DataByCategory, MovieData } from "@/types";
import { Carousel } from "@/component/carousel";

type Props = {
  contents: DataByCategory[];
};

const Carousels = ({ contents }: Props) => {
  return (
    <div className="w-full px-[9.5rem]">
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
      <Carousels contents={dataByCategory} />
    </MainLayout>
  );
}
