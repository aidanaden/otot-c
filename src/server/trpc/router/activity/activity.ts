import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../../trpc";
import { AddActivitySchema, EditActivitySchema } from "./schema";

export const activityRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  // get all activities
  getAll: publicProcedure.query(async ({ ctx }) => {
    const activities = await ctx.prisma.activity.findMany({
      include: {
        category: true,
      },
    });
    return activities;
  }),
  // get activity by id
  get: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const activity = await ctx.prisma.activity.findUnique({
      where: { id: input },
      include: {
        category: true,
      },
    });
    if (!activity) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Activity with id ${input} not found`,
      });
    }
    return activity;
  }),
  add: publicProcedure
    .input(AddActivitySchema)
    .mutation(async ({ input, ctx }) => {
      const { name, location, category } = input;
      const activity = await ctx.prisma.activity.create({
        data: {
          name,
          location,
          category: {
            create: {
              name: category.name,
            },
          },
        },
        include: {
          category: true,
        },
      });
      return activity;
    }),
  // update activity by id
  update: publicProcedure
    .meta({ method: "PUT" })
    .input(EditActivitySchema)
    .mutation(async ({ input, ctx }) => {
      const { id, name, location, category } = input;
      const activity = await ctx.prisma.activity.update({
        where: { id },
        data: {
          name,
          location,
          category: {
            update: {
              name: category?.name,
            },
          },
        },
        select: {
          id: true,
          name: true,
          location: true,
          category: true,
        },
      });
      return activity;
    }),
  // delete activity by id
  delete: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const activity = await ctx.prisma.activity.delete({
      where: { id: input },
    });
    const activities = await ctx.prisma.activity.findMany({
      include: {
        category: true,
      },
    });
    if (!activity) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Activity with id ${input} not found`,
      });
    }
    return activities;
  }),
});
