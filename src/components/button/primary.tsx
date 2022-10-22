import { BaseButton, Props } from "./base";

const PrimaryButton = ({ className = "", children, ...other }: Props) => {
  return (
    <BaseButton
      loadColor="neutral-900"
      loadHoverColor="neutral-50"
      className={`bg-neutral-300 text-neutral-900 font-bold
      hover:bg-neutral-900 hover:text-neutral-50 ${className}`}
      {...other}
    >
      {children}
    </BaseButton>
  );
};

export { PrimaryButton };
