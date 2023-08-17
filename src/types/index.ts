export type MediaType = "movie" | "tv";

export type Content = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[] | null;
  id: number;
  original_language: string;
  original_title: string | null;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string | null;
  video: boolean;
  media_type: MediaType;
  budget: number | null;
  homepage: string | null;
  showId: string;
  imdb_id: string | null;
  number_of_seasons: number | null;
  number_of_episodes: number | null;
  first_air_date: string | null;
  last_air_date: string | null;
  revenue: number | null;
  runtime: number | null;
  status: string | null;
  tagline: string | null;
  name: string | null;
  vote_average: number;
  vote_count: number;
};

export type ContentCategories = {
  discover: Content[] | undefined;
  trending: Content[] | undefined;
  topRated: Content[] | undefined;
};

export type DataByCategory = {
  category: string;
  data: Content[] | undefined;
};
