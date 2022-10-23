import { DefaultSession } from "next-auth";

import { User } from "src/../node_modules/.prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"] & {
        role: User["role"];
      };
  }
}
