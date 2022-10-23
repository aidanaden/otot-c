import type { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import { env } from "src/env/server.mjs";
import { prisma } from "../db/client";

export const getCustomAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const cookie = getCookie("access_token", { req: ctx.req, res: ctx.res });
  if (!cookie) {
    return null;
  }
  const accessToken = cookie?.toString();
  const { sub } = jwt.verify(accessToken, env.NEXTAUTH_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      id: sub as string,
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  });
  if (!user) {
    return null;
  }
  const customSession: Session = {
    user,
    expires: "never",
  };
  return customSession;
};
