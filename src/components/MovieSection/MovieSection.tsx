import Button from "@/elements/Button";
import MovieCard from "../MovieCard/MovieCard";
import { getNewRecommendationsFromAI } from "@/services/openai";
import { getTmdbIdsFromAIResults } from "@/services/tmdbSearch";
import { getTmdbData } from "@/services/tmdb";
import { MovieData } from "@/types";

type Props = {
  movies: MovieData[];
  inputValue: string;
  selectedType: "movie" | "tv";
  onUpdateMovies: (movies: MovieData[]) => void;
};

export default function MovieSection({
  movies,
  onUpdateMovies,
  inputValue,
  selectedType,
}: Props) {
  const handleNewRecommendations = async () => {
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
  };

  return (
    <>
      <section>
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
      <section className="moviecard-section">
        {movies.map((m) => (
          <MovieCard key={m.id} data={m} />
        ))}
      </section>
    </>
  );
}
