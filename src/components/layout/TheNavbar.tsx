import cx from "classnames";
import NextLink from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PrimaryButton } from "../button";
import { PrimaryDialog } from "../dialog";
import { trpc, AppRouterTypes } from "src/utils/trpc";
import { AddActivitySchema } from "src/server/trpc/router/activity/schema";
import { TextInput } from "../input";

type AddActivityInput = AppRouterTypes["activity"]["add"]["input"];

const CreateActivityForm = ({ onClose }: { onClose: () => void }) => {
  const ctx = trpc.useContext();
  const addActivity = trpc.activity.add.useMutation({
    onSuccess: () => {
      ctx.activity.invalidate();
      onClose();
    },
  });

  // form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddActivityInput>({
    resolver: zodResolver(AddActivitySchema),
  });

  // submit function
  const handleAddActivity = (activityInputs: AddActivityInput) => {
    addActivity.mutate(activityInputs);
  };
  const onSubmit = handleSubmit(handleAddActivity);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Name"
          type="text"
          placeholder="Name of activity"
          isError={!!errors.name?.message}
          error={errors.name?.message?.toString()}
          {...register("name", { required: true })}
        />
        <TextInput
          label="Location"
          type="text"
          placeholder="Location of activity"
          isError={!!errors.location?.message}
          error={errors.location?.message?.toString()}
          {...register("location", { required: true })}
        />
        <TextInput
          label="Category"
          type="text"
          placeholder="Category of activity"
          isError={!!errors.category?.name?.message}
          error={errors.category?.name?.message?.toString()}
          {...register("category.name", { required: true })}
        />
      </div>
      <PrimaryButton type="submit" isLoading={addActivity.isLoading}>
        Create activity
      </PrimaryButton>
    </form>
  );
};

const CreateActivityButton = () => {
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  return (
    <div>
      <PrimaryButton onClick={() => setActivityDialogOpen(true)}>
        New activity +
      </PrimaryButton>
      <PrimaryDialog
        title={"New activity"}
        description="Create a new activity"
        isOpen={activityDialogOpen}
        onClose={() => setActivityDialogOpen(false)}
        autoClose={true}
      >
        <CreateActivityForm onClose={() => setActivityDialogOpen(false)} />
      </PrimaryDialog>
    </div>
  );
};

const TheNavbar = () => {
  return (
    <nav
      className={cx(
        "fixed z-50 flex w-full flex-col px-4 font-display",
        "bg-neutral-100/[0.95] backdrop-blur-sm transition-all duration-300 ease-out"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-5xl flex-wrap items-center justify-between">
        <NextLink href="/">
          <a className="flex h-full items-center">
            <span className="self-center whitespace-nowrap font-display text-3xl font-black text-neutral-800">
              NextDate
            </span>
          </a>
        </NextLink>
        <CreateActivityButton />
      </div>
    </nav>
  );
};

export { TheNavbar };
