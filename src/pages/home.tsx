import { Carousels } from "@/component/carouselList";
import { MainLayout } from "@/component/mainLayout";
import { getDataByGenre } from "@/lib/fetcher";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const getData = (async () => {
      const data = await getDataByGenre("tv", 16);
      console.log(data);
    })();
  }, []);

  return (
    <MainLayout title="home">{/* <Carousels contents={} /> */}</MainLayout>
  );
};

export default Home;
