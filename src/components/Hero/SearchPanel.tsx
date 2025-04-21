import { ChangeEvent, useState } from "react";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form>
      <div className="toggle">
        <Button type="button" className="active">
          Movies
        </Button>
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
