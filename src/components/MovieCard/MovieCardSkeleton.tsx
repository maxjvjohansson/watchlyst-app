export default function MovieCardSkeleton() {
  return (
    <article className="movie-card skeleton">
      <div className="poster-wrapper">
        <div className="skeleton-box skeleton-poster"></div>
        <div className="skeleton-badge"></div>
      </div>
      <div className="movie-heading">
        <div className="skeleton-box skeleton-title"></div>
        <div className="skeleton-box skeleton-year"></div>
      </div>
      <div className="genre-tags">
        <div className="skeleton-box skeleton-genre-tag"></div>
        <div className="skeleton-box skeleton-genre-tag"></div>
        <div className="skeleton-box skeleton-genre-tag"></div>
      </div>
      <div className="skeleton-overview">
        <div className="skeleton-box skeleton-line"></div>
        <div className="skeleton-box skeleton-line short"></div>
        <div className="skeleton-box skeleton-line medium"></div>
      </div>
      <div className="skeleton-box skeleton-provider-logo"></div>
      <div className="movie-links">
        <div className="skeleton-box skeleton-link"></div>
        <div className="skeleton-box skeleton-link"></div>
      </div>
    </article>
  );
}
