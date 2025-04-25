import Button from "@/elements/Button";
import MovieCard from "../MovieCard/MovieCard";
import { getNewRecommendationsFromAI } from "@/services/openai";
import { getTmdbIdsFromAIResults } from "@/services/tmdbSearch";
import { getTmdbData } from "@/services/tmdb";
import { MovieData } from "@/types";
import MovieCardSkeleton from "../MovieCard/MovieCardSkeleton";
import React from "react";

type Props = {
  movies: MovieData[];
  inputValue: string;
  selectedType: "movie" | "tv";
  onUpdateMovies: (movies: MovieData[]) => void;
  setErrorMessage: (msg: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  submitted: boolean;
  recommendationSectionRef: React.RefObject<HTMLElement | null>;
};

export default function MovieSection({
  movies,
  onUpdateMovies,
  inputValue,
  loading,
  setLoading,
  recommendationSectionRef,
  submitted,
  selectedType,
  setErrorMessage,
}: Props) {
  const handleNewRecommendations = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const exclude = movies.map((m) => `"${m.title} (${m.year})"`);

      const aiResults = await getNewRecommendationsFromAI(
        inputValue,
        selectedType,
        exclude
      );

      const ids = await getTmdbIdsFromAIResults(aiResults, selectedType);
      const fullData: MovieData[] = await Promise.all(
        ids.map(({ id, type }) => getTmdbData(id, type))
      );

      onUpdateMovies(fullData);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to fetch new recommendations. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {submitted && (
        <section ref={recommendationSectionRef}>
          <div className="recommendation-title-container">
            <h2>Recommended for You</h2>
            <div className="already-watched">
              <p>Already watched every title?</p>
              <Button
                type="button"
                onClick={handleNewRecommendations}
                className="new-recommendation-button"
              >
                Get New Recommendations
              </Button>
            </div>
          </div>
        </section>
      )}
      <section className="moviecard-section">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : movies.map((m) => <MovieCard key={m.id} data={m} />)}
      </section>
    </>
  );
}
