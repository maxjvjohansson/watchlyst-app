import { ChangeEvent, useState } from "react";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState("");
  const [isToggled, setIsToggled] = useState("left");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form>
      <div className="toggle">
        <Button
          type="button"
          onClick={() => setIsToggled("left")}
          className={isToggled === "left" ? "active" : ""}
        >
          Movies
        </Button>
        <Button
          type="button"
          onClick={() => setIsToggled("right")}
          className={isToggled === "right" ? "active" : ""}
        >
          Series
        </Button>
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
