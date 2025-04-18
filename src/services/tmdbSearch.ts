const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchTMDB(query: string, type: "movie" | "tv") {
  const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results) return [];

  return data.results.map((item: any) => ({
    id: item.id,
    title: type === "movie" ? item.title : item.name,
    year: (item.release_date || item.first_air_date || "").slice(0, 4),
    posterUrl: item.poster_path
      ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
      : "",
    type,
  }));
}
