import Link from "@/elements/Link";
import Image from "@/elements/Image";
import WatchProviders from "./WatchProviders";
import RatingBadge from "./RatingBadge";
import PlayIcon from "../../assets/icons/play_icon.svg";
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

  const getTrimmedOverview = (text: string, limit: number) => {
    const words = text.split(" ");
    const isTrimmed = words.length > limit;

    return {
      preview: isTrimmed ? words.slice(0, limit).join(" ") + "..." : text,
      isTrimmed,
    };
  };

  const { preview, isTrimmed } = getTrimmedOverview(overview, 16);

  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <RatingBadge rating={rating} />
        <Image className="movie-poster" src={posterUrl} alt={title} />
      </div>
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
      <p className="movie-overview">
        {preview}
        {isTrimmed && (
          <>
            {" "}
            <Link href={linkToShow} target="_blank" rel="noopener noreferrer">
              Read More on {linkLabel}
            </Link>
          </>
        )}
      </p>
      <WatchProviders providers={watchProviders} tmdbUrl={tmdbUrl} />
      <div className="movie-links">
        <Link
          className="link tmdb-link"
          href={linkToShow}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </Link>
        {trailerUrl && (
          <Link
            className="link trailer-link"
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={PlayIcon}></Image>
            Trailer
          </Link>
        )}
      </div>
    </article>
  );
}
