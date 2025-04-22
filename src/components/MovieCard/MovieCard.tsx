import Link from "@/elements/Link";
import Image from "@/elements/Image";
import WatchProviders from "./WatchProviders";
import RatingBadge from "./RatingBadge";
import "./MovieCard.css";
import { MovieData } from "@/types";

type Props = {
  data: MovieData;
};

export default function MovieCard({ data }: Props) {
  const {
    title,
    year,
    rating,
    posterUrl,
    genres,
    overview,
    watchProviders,
    imdbUrl,
    tmdbUrl,
    trailerUrl,
  } = data;

  const linkToShow = imdbUrl || tmdbUrl;
  const linkLabel = imdbUrl ? "IMDb" : "TMDB";

  return (
    <article className="movie-card">
      <RatingBadge rating={rating} />
      <Image className="movie-poster" src={posterUrl} alt={title} />
      <div className="movie-heading">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-year">{year}</p>
      </div>
      <div className="genre-tags">
        {genres.map((g) => (
          <span key={g} className="genre-tag">
            {g}
          </span>
        ))}
      </div>
      <p className="movie-overview">{overview}</p>
      <WatchProviders providers={watchProviders} tmdbUrl={tmdbUrl} />
      <div className="movie-links">
        <Link
          className="tmdb-link"
          href={linkToShow}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </Link>
        {trailerUrl && (
          <Link
            className="link trailer"
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Trailer
          </Link>
        )}
      </div>
    </article>
  );
}
