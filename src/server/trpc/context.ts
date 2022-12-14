// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { Session } from "next-auth";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import { env } from "src/env/server.mjs";
import { getServerAuthSession } from "../common/get-server-auth-session";
import { prisma } from "../db/client";
import { getCustomAuthSession } from "../common/get-custom-auth-session";

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });
  const customSession = await getCustomAuthSession({ req, res });

  return await createContextInner({
    session: session ?? customSession,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
