const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
type TmdbType = "movie" | "tv";

export async function getTmdbData(id: number, type: TmdbType) {
  const [infoRes, videosRes, providersRes, externalIdsRes] = await Promise.all([
    fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`),
    type === "tv"
      ? fetch(`${BASE_URL}/tv/${id}/external_ids?api_key=${API_KEY}`)
      : Promise.resolve(null),
  ]);

  const info = await infoRes.json();
  const videos = await videosRes.json();
  const providers = await providersRes.json();
  const externalIds = externalIdsRes ? await externalIdsRes.json() : null;

  const trailer = videos.results.find(
    (v: { type: string; site: string }) =>
      v.type === "Trailer" && v.site === "YouTube"
  );

  const year =
    type === "movie"
      ? info.release_date?.slice(0, 4)
      : info.first_air_date?.slice(0, 4);

  const imdbId = type === "movie" ? info.imdb_id : externalIds?.imdb_id ?? null;

  return {
    id: info.id,
    title: type === "movie" ? info.title : info.name,
    year,
    posterUrl: `https://image.tmdb.org/t/p/w342${info.poster_path}`,
    rating: parseFloat(info.vote_average.toFixed(1)),
    overview: info.overview,
    genres: info.genres.slice(0, 3).map((g: { name: string }) => g.name),
    trailerUrl: trailer ? `https://youtube.com/watch?v=${trailer.key}` : null,
    imdbUrl: imdbId ? `https://www.imdb.com/title/${imdbId}` : null,
    tmdbUrl: `https://www.themoviedb.org/${type}/${id}`,
    watchProviders: providers.results?.SE?.flatrate ?? [],
  };
}
