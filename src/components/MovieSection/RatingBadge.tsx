type Props = {
  rating: number;
};

export default function RatingBadge({ rating }: Props) {
  return (
    <span className="rating-badge">
      <span>{rating}</span>
    </span>
  );
}
