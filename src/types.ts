export type MovieData = {
  id: number;
  title: string;
  year: string;
  posterUrl: string;
  rating: number;
  overview: string;
  genres: string[];
  trailerUrl: string | null;
  imdbUrl: string | null;
  tmdbUrl: string;
  watchProviders: {
    provider_id: number;
    provider_name: string;
    logo_path: string;
  }[];
};
