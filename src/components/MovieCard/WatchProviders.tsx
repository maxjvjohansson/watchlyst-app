import Image from "@/elements/Image";

type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

type Props = {
  providers: Provider[];
};

export default function WatchProviders({ providers }: Props) {
  if (!providers || providers.length === 0) return null;

  return (
    <div className="watch-providers">
      {providers.map((provider) => (
        <Image
          key={provider.provider_id}
          src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
          alt={provider.provider_name}
        />
      ))}
    </div>
  );
}
