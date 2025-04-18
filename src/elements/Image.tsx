type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number | string;
  height?: number | string;
  title?: string;
};

export default function Image({
  src,
  alt = "",
  className,
  loading = "lazy",
  width,
  height,
  title,
}: Props) {
  const fallbackImage = "/fallback_image.svg";
  return (
    <img
      src={src || fallbackImage}
      onError={(e) => (e.currentTarget.src = fallbackImage)}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      title={title}
    />
  );
}
