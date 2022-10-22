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
      {/* <AuthShowcase /> */}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

//   const { data: sessionData } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p className="text-2xl text-blue-500">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && (
//         <p className="text-2xl text-blue-500">{secretMessage}</p>
//       )}
//       <button
//         className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
