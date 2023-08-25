import { env } from "@/env.mjs";
import type { Content, MediaType } from "@/types";

export const getTMDBData = async (type: MediaType) => {
  const [discoveryData, trendingData, topRatedData] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_networks=213`
    ),
    fetch(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&with_networks=213&region=US`
    ),
    fetch(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&with_networks=213&region=US`
    ),
  ]);

  if (!discoveryData.ok || !trendingData.ok || !topRatedData.ok) {
    throw new Error("Failed to fetch content.");
  }

  const [discover, trending, topRated] = (await Promise.all([
    discoveryData.json(),
    trendingData.json(),
    topRatedData.json(),
  ])) as { results: Content[] }[];

  return {
    discover: discover?.results,
    trending: trending?.results,
    topRated: topRated?.results,
  };
};

export const getDataByGenre = async (
  type: MediaType,
  genreId: number,
  origin?: string,
  netflix?: boolean
) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/${type}/top_rated?api_key=${
      env.NEXT_PUBLIC_TMDB_API_KEY
    }&language=en-US&with_genres=${genreId}${
      origin ? `&with_origin_country=${origin}` : ""
    }${netflix ? `&with_networks=213` : ""}`
  );

  if (!data.ok) throw new Error(`Failed to fetch data for genreId ${genreId}`);
  const jsonData = (await data.json()) as { results: Content[] };
  return jsonData.results;
};

export const getTVShowData = async () => {
  const animeData = await getDataByGenre("tv", 16, "JP", true);
  const kdramaData = await getDataByGenre("tv", 18, "KR");
  const usShowsData = await getDataByGenre("tv", 18, "US", true);
  const animationData = await getDataByGenre("tv", 16, "US", true);
  const thrillerData = await getDataByGenre("tv", 80, "US");
  const comedyData = await getDataByGenre("tv", 35, "US");

  return {
    thriller: thrillerData,
    comedy: comedyData,
    anime: animeData,
    kdrama: kdramaData,
    usShows: usShowsData,
    animation: animationData,
  };
};
