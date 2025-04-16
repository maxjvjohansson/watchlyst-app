import { MouseEvent, ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function Button({
  type = "button",
  children,
  className,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
}
