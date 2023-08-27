import { MainLayout } from "@/component/mainLayout";
import { getNewAndPopularData } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import type { DataByCategory, NewAndPopularCategories } from "@/types";
import { Carousels } from "@/component/carouselList";

const NewAndPopular = () => {
  const [data, setData] = useState<null | NewAndPopularCategories>(null);

  useEffect(() => {
    const getData = (async () => {
      const data = await getNewAndPopularData();
      setData(data);
    })();
  }, []);

  const dataByCategory: DataByCategory[] = [
    { category: "Popular Movies", data: data?.popularMovie, type: "movie" },
    { category: "Popular TV Shows", data: data?.popularTv, type: "tv" },
  ];

  return (
    <MainLayout title="New & Popular">
      <section className="container mx-8 max-w-screen-2xl sm:mx-12">
        {<Carousels contents={dataByCategory} />}
      </section>
    </MainLayout>
  );
};

export default NewAndPopular;
