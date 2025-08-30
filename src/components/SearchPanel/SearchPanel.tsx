import { ChangeEvent, useState, useRef, useEffect } from "react";
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { searchTMDB } from "@/services/tmdbSearch";
import Dropdown from "../Dropdown/Dropdown";
import Filmstrip from "@/assets/icons/filmstrip.svg";
import TvScreen from "@/assets/icons/tv_screen.svg";
import ErrorCross from "@/assets/icons/error_cross.svg";
import Image from "@/elements/Image";
import { useSearch } from "@/context/SearchContext";

export default function SearchPanel() {
  const {
    onRecommend,
    inputValue,
    setInputValue,
    setSubmitted,
    selectedType,
    setSelectedType,
    errorMessage,
    setErrorMessage,
    onUpdateMovies,
  } = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setErrorMessage("");
    setSubmitted(false);

    if (value.trim() === "") {
      onUpdateMovies([]);
    }

    if (value.includes("(") && value.includes(")")) {
      setSuggestions([]);
      setErrorMessage("");
      return;
    }

    if (value.trim().length >= 2) {
      try {
        const results = await searchTMDB(value, selectedType);
        if (results.length === 0) {
          setErrorMessage("No suggestions found. Try a different title.");
        } else {
          setSuggestions(results);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to fetch suggestions. Please try again.");
      }
    } else {
      setSuggestions([]);
    }
  };

  const getPlaceholder = () => {
    return `Enter a ${selectedType === "movie" ? "movie" : "series"
      } title you like...`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);
    setErrorMessage("");
    onRecommend(inputValue, selectedType);

    if (!inputValue.trim()) {
      setErrorMessage("Please enter a title before getting recommendations.");
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="toggle">
          <Button
            type="button"
            onClick={() => {
              setSelectedType("movie");
              setInputValue("");
              setSuggestions([]);
              setErrorMessage("");
              onUpdateMovies([]);
              setSubmitted(false);
            }}
            className={selectedType === "movie" ? "active" : ""}
          >
            <Image src={Filmstrip} height="20" width="20"></Image>
            Movies
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSelectedType("tv");
              setInputValue("");
              setSuggestions([]);
              setErrorMessage("");
              onUpdateMovies([]);
              setSubmitted(false);
            }}
            className={selectedType === "tv" ? "active" : ""}
          >
            <Image src={TvScreen} height="20" width="20"></Image>
            TV-show
          </Button>
        </div>
        <div ref={wrapperRef} className="dropdown-wrapper">
          <InputField
            id="search"
            value={inputValue}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            required
          />
          {suggestions.length > 0 && (
            <Dropdown
              suggestions={suggestions}
              onSelect={(item) => {
                setInputValue(`${item.title} (${item.year})`);
                setSuggestions([]);
                setErrorMessage("");
              }}
            />
          )}
        </div>
        <Button type="submit">Get Recommendations</Button>
      </form>
      {errorMessage && (
        <p className="error-message">
          <Image
            src={ErrorCross}
            width={20}
            height={20}
            alt="Cross symbol"
          ></Image>
          {errorMessage}
        </p>
      )}
    </>
  );
}
