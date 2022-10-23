import type { NextPage } from "next";

// import { signIn, signOut, useSession } from "next-auth/react";

import { ActivityCard } from "src/features/home";
import { SpinnerIcon } from "src/components";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const activities = trpc.activity.getAll.useQuery();
  return (
    <>
      {activities.isLoading ? (
        <div className="h-[calc(100vh - 72px)] w-3xl w-full flex items-center justify-center">
          <SpinnerIcon className="h-6 w-6 self-center" />
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 w-full mt-[144px] overflow-y-auto h-fit">
          {activities.data?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
