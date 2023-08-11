import { env } from "@/env.mjs";
import type { Content, MediaType } from "@/types";

export const getTMDBData = async (type: MediaType) => {
  const [discoveryData, trendingData, topRatedData] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_networks=213`
    ),
    fetch(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
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
