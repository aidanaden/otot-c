import { PrimaryButton } from "src/components";
import type { Props as BaseButtonProps } from "src/components/button/base";

const ActivityButton = ({ children, className, ...other }: BaseButtonProps) => {
  return (
    <PrimaryButton
      className={`rounded-lg text-sm px-[10px] py-[6px] ${className}`}
      {...other}
    >
      {children}
    </PrimaryButton>
  );
};

export { ActivityButton };
