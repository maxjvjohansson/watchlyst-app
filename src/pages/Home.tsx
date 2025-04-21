import Hero from "@/components/Hero/Hero";
import MovieSection from "@/components/MovieSection/MovieSection";
import { getRecommendationsFromAI } from "@/services/openai";
import { getTmdbData } from "@/services/tmdb";
import { getTmdbIdsFromAIResults } from "@/services/tmdbSearch";
import { useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>([]);

  const handleRecommendations = async (input: string, type: "movie" | "tv") => {
    const aiResults = await getRecommendationsFromAI(input, type);
    const ids = await getTmdbIdsFromAIResults(aiResults, type);

    const fullData = await Promise.all(
      ids.map(({ id, type }) => getTmdbData(id, type))
    );

    setMovies(fullData);
  };

  return (
    <>
      <Hero onRecommend={handleRecommendations} />
      <MovieSection movies={movies} />
    </>
  );
}
