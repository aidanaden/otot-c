import { z } from "zod";

export const AddActivitySchema = z.object({
  name: z.string().min(1, {
    message: "Name must contain at least 1 character",
  }),
  location: z.string().min(1, {
    message: "Location must contain at least 1 character",
  }),
  category: z.object({
    name: z.string().min(1, {
      message: "Category name must contain at least 1 character",
    }),
  }),
});

export const EditActivitySchema = AddActivitySchema.extend({
  id: z.string(),
});
