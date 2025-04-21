import MovieCard from "../MovieCard/MovieCard";

export default function MovieSection({ movies }: { movies: any[] }) {
  return (
    <>
      <section>
        <div>
          <h2>Recommended for You</h2>
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
