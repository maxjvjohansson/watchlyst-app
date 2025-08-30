import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { MovieData } from "@/types";
import { getRecommendationsFromAI } from "@/services/openai";
import { getTmdbData } from "@/services/tmdb";
import { getTmdbIdsFromAIResults } from "@/services/tmdbSearch";

type SearchType = "movie" | "tv";

type SearchContextType = {
    inputValue: string;
    setInputValue: (value: string) => void;
    selectedType: SearchType;
    setSelectedType: (type: SearchType) => void;
    submitted: boolean;
    setSubmitted: (value: boolean) => void;
    errorMessage: string;
    setErrorMessage: (msg: string) => void;
    movies: MovieData[];
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    recommendationSectionRef: React.RefObject<HTMLElement | null>;
    onRecommend: (input: string, type: SearchType) => void;
    onUpdateMovies: (movies: MovieData[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [inputValue, setInputValue] = useState("");
    const [selectedType, setSelectedType] = useState<SearchType>("movie");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const recommendationSectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (submitted && recommendationSectionRef.current) {
            recommendationSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [submitted]);

    const onRecommend = async (input: string, type: SearchType) => {
        setErrorMessage("");

        if (!input.trim()) {
            setErrorMessage("You must provide a title.");
            return;
        }

        setIsLoading(true);
        setSubmitted(true);

        try {
            const aiResults = await getRecommendationsFromAI(input, type);
            const ids = await getTmdbIdsFromAIResults(aiResults, type);

            const fullData = await Promise.all(
                ids.map(({ id, type }) => getTmdbData(id, type))
            );

            setMovies(fullData);
        } catch (err) {
            console.error(err);
            setErrorMessage(
                "Something went wrong while fetching recommendations. Please try again"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateMovies = (newMovies: MovieData[]) => {
        setMovies(newMovies);
    };

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    return (
        <SearchContext.Provider
            value={{
                inputValue,
                setInputValue,
                selectedType,
                setSelectedType,
                submitted,
                setSubmitted,
                errorMessage,
                setErrorMessage,
                movies,
                isLoading,
                setLoading,
                recommendationSectionRef,
                onRecommend,
                onUpdateMovies,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
    return ctx;
}
