import type { Activity, Category } from "src/../node_modules/.prisma/client";

export type FullActivity = Activity & {
  category: Category;
};
