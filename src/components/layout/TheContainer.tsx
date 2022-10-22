import { HtmlHTMLAttributes } from "react";
import cx from "classnames";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  hasTopPadding?: boolean;
  centered?: boolean;
};

const TheContainer = ({
  children,
  className = "",
  hasTopPadding = false,
  centered = true,
  ...other
}: Props) => {
  return (
    <div
      className={cx(
        "flex max-w-4xl w-full px-4 pb-4",
        `mx-auto min-h-screen ${className}`,
        {
          "pt-0": !hasTopPadding,
          "pt-[76px] md:pt-16": hasTopPadding,
          "items-center justify-center": centered,
        }
      )}
      {...other}
    >
      {children}
    </div>
  );
};

export { TheContainer };
