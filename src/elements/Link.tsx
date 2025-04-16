type Props = {
  href: string;
  text?: string;
  className: string;
};

export default function Link({ href, text, className }: Props) {
  return (
    <a href={href} className={className}>
      {text && <span>{text}</span>}
    </a>
  );
}
