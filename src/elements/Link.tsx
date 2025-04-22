import { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
};

export default function Link({
  href,
  className,
  children,
  target,
  rel,
}: Props) {
  return (
    <a href={href} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}
