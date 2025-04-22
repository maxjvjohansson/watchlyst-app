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

export async function getTmdbIdsFromAIResults(
  aiResults: { title: string; year: string }[],
  type: "movie" | "tv"
): Promise<{ id: number; type: "movie" | "tv" }[]> {
  const ids: { id: number; type: "movie" | "tv" }[] = [];

  for (const item of aiResults) {
    const matches = await searchTMDB(item.title, type);

    const match = matches.find(
      (m: {
        id: number;
        title: string;
        year: string;
        posterUrl: string;
        type: "movie" | "tv";
      }) => m.year === item.year
    );

    if (match) {
      ids.push({ id: match.id, type });
    } else {
      console.warn("No TMDB match found for:", item);
    }
  }

  return ids;
}
