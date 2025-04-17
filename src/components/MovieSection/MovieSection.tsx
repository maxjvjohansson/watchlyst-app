import { useState, useEffect } from "react";
import { getTmdbData } from "@/services/tmdb";
import MovieCard from "../MovieCard/MovieCard";

type MovieData = any;

export default function MovieSection() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  // Hardcoded movies/series
  useEffect(() => {
    Promise.all([
      getTmdbData(950387, "movie"),
      getTmdbData(1399, "tv"),
      getTmdbData(238, "movie"),
    ]).then(setMovies);
  }, []);

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
