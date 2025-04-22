type Props = {
  rating: number;
};

const getBadgeClass = (rating: number) => {
  if (rating >= 8.5) return "badge badge-excellent"; // Darker green
  if (rating >= 7) return "badge badge-good"; // Lighter green
  if (rating >= 5.5) return "badge badge-okay"; // Yellow/greenish
  if (rating >= 4) return "badge badge-bad"; // Darker Yellow/Orange
  return "badge badge-terrible"; // RED
};

export default function RatingBadge({ rating }: Props) {
  const badgeClass = getBadgeClass(rating);
  return (
    <span className={badgeClass}>
      <span className="badge-text">{rating}</span>
    </span>
  );
}
