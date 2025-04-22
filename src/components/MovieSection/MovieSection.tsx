import Button from "@/elements/Button";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieSection({ movies }: { movies: any[] }) {
  const handleNewRecommendations = () => {};
  return (
    <>
      <section>
        <div>
          <h2>Recommended for You</h2>
          <div>
            <p>Already watched every title?</p>
            <Button type="button" onClick={handleNewRecommendations}>
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
