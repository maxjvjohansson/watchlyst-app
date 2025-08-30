import Hero from "@/components/Hero/Hero";
import MovieSection from "@/components/MovieSection/MovieSection";
import { useSearch } from "@/context/SearchContext";

export default function HomePage() {
  const { movies, inputValue, isLoading, recommendationSectionRef, submitted, selectedType, setErrorMessage, onUpdateMovies, setLoading } = useSearch();

  return (
    <>
      <Hero />
      <MovieSection
        movies={movies}
        onUpdateMovies={onUpdateMovies}
        inputValue={inputValue}
        loading={isLoading}
        setLoading={setLoading}
        recommendationSectionRef={recommendationSectionRef}
        submitted={submitted}
        selectedType={selectedType}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}
