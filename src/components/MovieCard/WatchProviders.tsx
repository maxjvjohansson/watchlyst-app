import Image from "@/elements/Image";
import Link from "@/elements/Link";

type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

type Props = {
  providers: Provider[];
  tmdbUrl: string;
};

export default function WatchProviders({ providers, tmdbUrl }: Props) {
  if (!providers || providers.length === 0) return null;

  return (
    <div className="watch-providers">
      {providers.map((provider) => (
        <Link
          key={provider.provider_id}
          href={tmdbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
            alt={provider.provider_name}
            title={provider.provider_name}
          />
        </Link>
      ))}
    </div>
  );
}
