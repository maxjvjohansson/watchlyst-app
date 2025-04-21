import HeroHeader from "./HeroHeader";
import SearchPanel from "../SearchPanel/SearchPanel";

type Props = {
  onRecommend: (input: string, type: "movie" | "tv") => void;
};

export default function Hero({ onRecommend }: Props) {
  return (
    <section>
      <HeroHeader />
      <SearchPanel onRecommend={onRecommend} />
    </section>
  );
}
