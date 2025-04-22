import { MovieData } from "@/types";
import Hero from "@/components/Hero/Hero";
import MovieSection from "@/components/MovieSection/MovieSection";
import { getRecommendationsFromAI } from "@/services/openai";
import { getTmdbData } from "@/services/tmdb";
import { getTmdbIdsFromAIResults } from "@/services/tmdbSearch";
import { useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");

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
      <Hero
        onRecommend={handleRecommendations}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <MovieSection
        movies={movies}
        onUpdateMovies={setMovies}
        inputValue={inputValue}
        selectedType={selectedType}
      />
    </>
  );
}
