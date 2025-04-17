import Link from "@/elements/Link";
import Image from "@/elements/Image";
import WatchProviders from "./WatchProviders";
import RatingBadge from "./RatingBadge";

type Props = {
  data: {
    id: number;
    title: string;
    year: number;
    posterUrl: string;
    rating: number;
    overview: string;
    genres: string[];
    trailerUrl: string;
    imdbUrl: string | null;
    tmdbUrl: string;
    watchProviders: {
      provider_id: number;
      provider_name: string;
      logo_path: string;
    }[];
  };
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

  const linkToShow = imdbUrl?.includes("imdb.com") ? imdbUrl : tmdbUrl;

  return (
    <article>
      <RatingBadge rating={rating} />
      <Image src={posterUrl} alt={title} />
      <h2>{title}</h2>
      <p>{year}</p>
      <WatchProviders providers={watchProviders} />
      <p>{genres.join(" ")}</p>
      <p>{overview}</p>
      <Link className="tmdb-link" href={linkToShow}>
        {imdbUrl ? "IMDb" : "TMDB"}
      </Link>
      <Link className="trailer-link" href={trailerUrl}>
        Trailer
      </Link>
    </article>
  );
}
