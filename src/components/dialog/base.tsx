import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { TheContainer } from "../layout";

export type BaseProps = {
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  children: JSX.Element;
};

export function BaseDialog({
  isOpen,
  onClose,
  autoClose,
  children,
}: BaseProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={autoClose ? onClose : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900 bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <TheContainer className="max-w-md">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
          </TheContainer>
        </div>
      </Dialog>
    </Transition>
  );
}
