import { ChangeEvent, useState } from "react";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { searchTMDB } from "@/services/tmdbSearch";
import Dropdown from "./Dropdown";
import Filmstrip from "@/assets/icons/filmstrip.svg";
import TvScreen from "@/assets/icons/tv_screen.svg";
import Image from "@/elements/Image";

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedType: "movie" | "tv";
  setSelectedType: (type: "movie" | "tv") => void;
  onRecommend: (input: string, type: "movie" | "tv") => void;
};

export default function SearchPanel({
  onRecommend,
  inputValue,
  setInputValue,
  selectedType,
  setSelectedType,
}: Props) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim().length >= 2) {
      const results = await searchTMDB(value, selectedType);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const getPlaceholder = () => {
    return `Enter a ${
      selectedType === "movie" ? "movie" : "series"
    } title you like...`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);
    onRecommend(inputValue, selectedType);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="toggle">
        <Button
          type="button"
          onClick={() => setSelectedType("movie")}
          className={selectedType === "movie" ? "active" : ""}
        >
          <Image src={Filmstrip} height="20" width="20"></Image>
          Movies
        </Button>
        <Button
          type="button"
          onClick={() => setSelectedType("tv")}
          className={selectedType === "tv" ? "active" : ""}
        >
          <Image src={TvScreen} height="20" width="20"></Image>
          TV-show
        </Button>
      </div>
      <InputField
        id="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={getPlaceholder()}
      />
      {suggestions.length > 0 && (
        <Dropdown
          suggestions={suggestions}
          onSelect={(item) => {
            setInputValue(`${item.title} (${item.year})`);
            setSuggestions([]);
          }}
        />
      )}
      <Button type="submit">Get Recommendations</Button>
    </form>
  );
}
