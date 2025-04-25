import Image from "@/elements/Image";

type Suggestion = {
  id: number;
  title: string;
  year: string;
  posterUrl: string;
  type: "movie" | "tv";
};

type Props = {
  suggestions: Suggestion[];
  onSelect: (item: Suggestion) => void;
};

export default function Dropdown({ suggestions, onSelect }: Props) {
  return (
    <ul className="dropdown">
      {suggestions.map((item) => (
        <li
          key={item.id}
          className="dropdown-item"
          onClick={() => onSelect(item)}
        >
          <Image
            src={item.posterUrl}
            alt={item.title}
            className="dropdown-poster"
          />
          <span>
            {item.title} ({item.year})
          </span>
        </li>
      ))}
    </ul>
  );
}
