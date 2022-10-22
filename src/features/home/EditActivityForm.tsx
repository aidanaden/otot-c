import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { FullActivity } from "./types";
import { AppRouterTypes, trpc } from "src/utils/trpc";
import { EditActivitySchema } from "src/server/trpc/router/activity/schema";
import { PrimaryButton, TextInput } from "src/components";

type EditActivityInput = Omit<
  AppRouterTypes["activity"]["update"]["input"],
  "id"
>;

const EditActivityForm = ({
  activity,
  onClose,
}: {
  activity: FullActivity;
  onClose: () => void;
}) => {
  const ctx = trpc.useContext();
  const updateActivity = trpc.activity.update.useMutation({
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
  } = useForm<EditActivityInput>({
    resolver: zodResolver(EditActivitySchema.omit({ id: true })),
    defaultValues: {
      name: activity.name,
      location: activity.name,
      category: activity.category,
    },
  });

  // submit function
  const handleAddActivity = (activityInputs: EditActivityInput) => {
    if (
      activityInputs.name === activity.name &&
      activityInputs.location === activity.location &&
      activityInputs.category.name === activity.category.name
    ) {
      onClose();
      return;
    }
    updateActivity.mutate({ id: activity.id, ...activityInputs });
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
          {...register("name", { required: false })}
        />
        <TextInput
          label="Location"
          type="text"
          placeholder="Location of activity"
          isError={!!errors.location?.message}
          error={errors.location?.message?.toString()}
          {...register("location", { required: false })}
        />
        <TextInput
          label="Category"
          type="text"
          placeholder="Category of activity"
          isError={!!errors.category?.name?.message}
          error={errors.category?.name?.message?.toString()}
          {...register("category.name", { required: false })}
        />
      </div>
      <PrimaryButton type="submit" isLoading={updateActivity.isLoading}>
        Update activity
      </PrimaryButton>
    </form>
  );
};

export { EditActivityForm };
