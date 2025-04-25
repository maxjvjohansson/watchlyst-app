import { MovieData } from "@/types";
import Hero from "@/components/Hero/Hero";
import MovieSection from "@/components/MovieSection/MovieSection";
import { getRecommendationsFromAI } from "@/services/openai";
import { getTmdbData } from "@/services/tmdb";
import { getTmdbIdsFromAIResults } from "@/services/tmdbSearch";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recommendationSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isSubmitted && recommendationSectionRef.current) {
      recommendationSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isSubmitted]);

  const handleRecommendations = async (input: string, type: "movie" | "tv") => {
    setErrorMessage("");

    if (!input.trim()) {
      setErrorMessage("You must provide a title.");
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true);

    try {
      const aiResults = await getRecommendationsFromAI(input, type);
      const ids = await getTmdbIdsFromAIResults(aiResults, type);

      const fullData = await Promise.all(
        ids.map(({ id, type }) => getTmdbData(id, type))
      );

      setMovies(fullData);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Something went wrong while fetching recommendations. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero
        onRecommend={handleRecommendations}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        onUpdateMovies={setMovies}
      />
      <MovieSection
        movies={movies}
        onUpdateMovies={setMovies}
        inputValue={inputValue}
        loading={isLoading}
        recommendationSectionRef={recommendationSectionRef}
        submitted={isSubmitted}
        selectedType={selectedType}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}
