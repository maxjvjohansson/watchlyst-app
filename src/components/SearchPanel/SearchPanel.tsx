import { ChangeEvent, useState, useEffect } from "react";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { searchTMDB } from "@/services/tmdbSearch";

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
        <Button type="button">Movies</Button>
        <Button type="button">Series</Button>
      </div>
      <InputField
        id="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a movie or show you like..."
      />
      <Button type="submit">Get Recommendations</Button>
    </form>
  );
}
