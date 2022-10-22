import { trpc } from "src/utils/trpc";
import { ActivityButton } from "./ActivityButton";
import { EditFormDialogButton } from "./EditFormDialogButton";
import { FullActivity } from "./types";

type ActivityCardProps = {
  activity: FullActivity;
};

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const ctx = trpc.useContext();
  const deleteActivity = trpc.activity.delete.useMutation({
    onSuccess: () => {
      ctx.activity.invalidate();
    },
  });
  return (
    <div className="rounded-xl bg-neutral-200 pl-5 pr-4 py-4 h-min">
      <div className="flex flex-row gap-3 justify-between mb-3">
        <h3 className="font-display text-2xl font-extrabold capitalize place-self-end">
          {activity.name}
        </h3>
        <div className="flex flex-row gap-1">
          <EditFormDialogButton activity={activity} />
          <ActivityButton
            onClick={() => deleteActivity.mutate(activity.id)}
            isLoading={deleteActivity.isLoading}
          >
            Delete
          </ActivityButton>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div
          className="rounded-md w-min text-xs capitalize font-semibold py-1 px-2
          border-[1px] border-neutral-600 text-neutral-800"
        >
          {activity.category.name}
        </div>
        <div
          className="rounded-md w-min text-xs capitalize font-semibold py-1 px-2
          border-[1px] border-neutral-600 text-neutral-800"
        >
          {activity.location}
        </div>
      </div>
    </div>
  );
};

export { ActivityCard };
