import MovieCard from "./MovieCard";

export default function MovieSection() {
  return (
    <>
      <section>
        <div>
          <h2>Recommended for You</h2>
        </div>
      </section>
      <section>
        <MovieCard />
      </section>
    </>
  );
}
