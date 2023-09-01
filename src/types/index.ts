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
  action: Content[] | undefined;
  comedy: Content[] | undefined;
  horror: Content[] | undefined;
  romance: Content[] | undefined;
  documentary: Content[] | undefined;
};

export type DataByCategory = {
  category: string;
  data: Content[] | undefined;
  type: MediaType;
};

export type HomeContentCategories = {
  anime?: Content[] | undefined;
  comedy?: Content[] | undefined;
  kdrama?: Content[] | undefined;
  usShows?: Content[] | undefined;
  thriller?: Content[] | undefined;
  animation?: Content[] | undefined;
};

export type NewAndPopularCategories = {
  popularMovie: Content[] | undefined;
  popularTv: Content[] | undefined;
};

export type TitleData = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: (
    | {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
      }
    | {
        id: number;
        logo_path: null;
        name: string;
        origin_country: string;
      }
  )[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: { results: Video[] };
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: never[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
  };
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type Direction = "left" | "right";
