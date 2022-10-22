import { ButtonHTMLAttributes } from "react";

import { SpinnerIcon } from "../icons";

export type BaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadColor: string;
  loadHoverColor: string;
};

export type Props = Omit<BaseProps, "loadColor" | "loadHoverColor">;

const BaseButton = ({
  className = "",
  children,
  isLoading,
  loadColor = "neutral-900",
  loadHoverColor = "neutral-50",
  ...other
}: BaseProps) => {
  return (
    <button
      className={`group flex items-center justify-center border-[1px] px-4 py-2 font-sans
      font-medium transition duration-300 ease-out rounded-xl ${className}`}
      {...other}
    >
      {isLoading ? (
        <SpinnerIcon
          className={`fill-${loadColor} group-hover:fill-${loadHoverColor}`}
        />
      ) : (
        children
      )}
    </button>
  );
};

export { BaseButton };
