type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number | string;
  height?: number | string;
};

export default function Image({
  src,
  alt = "",
  className,
  loading = "lazy",
  width,
  height,
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  );
}
