import { z } from "zod";

export const countryCodeSchema = z.enum([
  "US",
  "UK",
  "SG",
  "MY",
  "HK",
  "JP",
  "AU",
]);

export const getHolidaySchema = z.object({
  country: countryCodeSchema,
  year: z
    .string()
    .refine((value) => new Date(value).getFullYear().toString() === value),
});

export const getCurrentYearHolidaySchema = getHolidaySchema.pick({
  country: true,
});
