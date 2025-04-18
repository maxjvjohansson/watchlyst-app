import { ChangeEvent, useState } from "react";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { searchTMDB } from "@/services/tmdbSearch";
import Dropdown from "./Dropdown";

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");

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

  return (
    <form>
      <div>
        <Button type="button" onClick={() => setSelectedType("movie")}>
          Movies
        </Button>
        <Button type="button" onClick={() => setSelectedType("tv")}>
          Series
        </Button>
      </div>
      <InputField
        id="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a movie or show you like..."
      />
      {suggestions.length > 0 && (
        <Dropdown
          suggestions={suggestions}
          onSelect={(item) => {
            setInputValue(item.title);
            setSuggestions([]);
          }}
        />
      )}
      <Button type="submit">Get Recommendations</Button>
    </form>
  );
}
