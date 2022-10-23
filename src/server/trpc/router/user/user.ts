import { TRPCError } from "@trpc/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

import { router, publicProcedure } from "../../trpc";
import { env } from "src/env/server.mjs";

export const userRouter = router({
  // create user with name + email + password
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: "USER",
        },
        select: {
          id: true,
          email: true,
        },
      });
      const token = jwt.sign(
        { sub: user.id, email: user.email },
        env.NEXTAUTH_SECRET
      );
      const hash = await argon2.hash(input.password);
      const account = await ctx.prisma.account.create({
        data: {
          userId: user.id,
          provider: "custom",
          providerAccountId: user.id,
          type: "custom",
          access_token: token,
          hash,
        },
      });
      return { user, account };
    }),
  addAdmin: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: "ADMIN",
        },
        select: {
          id: true,
          email: true,
        },
      });
      const token = jwt.sign(
        { sub: user.id, email: user.email },
        env.NEXTAUTH_SECRET
      );
      const hash = await argon2.hash(input.password);
      const account = await ctx.prisma.account.create({
        data: {
          userId: user.id,
          provider: "custom",
          providerAccountId: user.id,
          type: "custom",
          access_token: token,
          hash,
        },
        select: {
          id: true,
          provider: true,
          access_token: true,
        },
      });
      return { user, account };
    }),
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        accounts: {
          select: {
            id: true,
            access_token: true,
            hash: true,
          },
        },
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `User with id ${input} not found`,
      });
    }
    const account = user.accounts[0];
    if (!account) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Account with id ${input} not found`,
      });
    }
    const { accounts, ...userDetails } = user;
    return { user: userDetails, account };
  }),
  // get user by email + password
  getByCredentials: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
        select: {
          role: true,
          id: true,
          email: true,
          accounts: {
            select: {
              id: true,
              access_token: true,
              hash: true,
            },
          },
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with email ${input.email} not found`,
        });
      }
      const account = user.accounts[0];
      if (!account || !account.hash) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Account with email ${input.email} not found`,
        });
      }
      const validPassword = await argon2.verify(account.hash, input.password);
      if (!validPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `Invalid password`,
        });
      }
      const { accounts, ...userDetails } = user;
      return { user: userDetails, account };
    }),
});
