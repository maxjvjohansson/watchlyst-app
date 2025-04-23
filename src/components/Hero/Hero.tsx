import HeroHeader from "./HeroHeader";
import SearchPanel from "../SearchPanel/SearchPanel";

type Props = {
  onRecommend: (input: string, type: "movie" | "tv") => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedType: "movie" | "tv";
  setSelectedType: (type: "movie" | "tv") => void;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
};

export default function Hero({
  onRecommend,
  inputValue,
  setInputValue,
  selectedType,
  setSelectedType,
  errorMessage,
  setErrorMessage,
}: Props) {
  return (
    <section className="search-panel">
      <HeroHeader />
      <SearchPanel
        onRecommend={onRecommend}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </section>
  );
}
