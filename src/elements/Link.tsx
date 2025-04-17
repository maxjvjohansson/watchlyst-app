import { ReactNode } from "react";

type Props = {
  href: string;
  className: string;
  children?: ReactNode;
};

export default function Link({ href, className, children }: Props) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
