const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
type TmdbType = "movie" | "tv";

export async function getTmdbData(id: number, type: TmdbType) {
  const [infoRes, videosRes, providersRes] = await Promise.all([
    fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`),
  ]);

  const info = await infoRes.json();
  const videos = await videosRes.json();
  const providers = await providersRes.json();

  const trailer = videos.results.find(
    (v: { type: string; site: string }) =>
      v.type === "Trailer" && v.site === "YouTube"
  );

  return {
    id: info.id,
    title: type === "movie" ? info.title : info.name,
    posterUrl: `https://image.tmdb.org/t/p/w500${info.poster_path}`,
    rating: info.vote_average,
    overview: info.overview,
    genres: info.genres.slice(0, 2).map((g: { name: string }) => g.name),
    trailerUrl: trailer ? `https://youtube.com/watch?v=${trailer.key}` : null,
    imdbUrl: info.imdb_id ? `https://www.imdb.com/title/${info.imdb_id}` : null,
    tmdbUrl: `https://www.themoviedb.org/${type}/${id}`,
    watchProviders: providers.results?.SE?.flatrate ?? [],
  };
}
