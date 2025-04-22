import { ChangeEvent, useState } from "react";
import Filmstrip from "@/assets/icons/filmstrip.svg";
import TvScreen from "@/assets/icons/tv_screen.svg";
import Image from "@/elements/Image";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState("");
  const [isToggled, setIsToggled] = useState("movies");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form>
      <div className="toggle">
        <Button
          type="button"
          onClick={() => setIsToggled("movies")}
          className={isToggled === "movies" ? "active" : ""}
        >
          <Image src={Filmstrip} height="20" width="20"></Image>
          Movies
        </Button>
        <Button
          type="button"
          onClick={() => setIsToggled("series")}
          className={isToggled === "series" ? "active" : ""}
        >
          <Image src={TvScreen} height="20" width="20"></Image>
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
