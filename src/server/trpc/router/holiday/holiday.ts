/* eslint-disable @typescript-eslint/naming-convention */
import { TRPCError } from "@trpc/server";
import fetch from "cross-fetch";

import { router, publicProcedure } from "../../trpc";
import { env } from "src/env/server.mjs";
import { getHolidaySchema, getCurrentYearHolidaySchema } from "./schema";
import { CalendarificHolidayResponse } from "./types";

const CALENDARIFIC_API_URL = "https://calendarific.com/api/v2/holidays";

export const holidayRouter = router({
  // get holidays by country code and year
  get: publicProcedure.input(getHolidaySchema).query(async ({ input }) => {
    const { country, year } = input;
    const calendarApiKey = env.CALENDARIFIC_API_KEY;

    try {
      const data: CalendarificHolidayResponse = await fetch(
        `${CALENDARIFIC_API_URL}?api_key=${calendarApiKey}&country=${country}&year=${year}`
      ).then((res) => res.json());

      if (data.meta.error_detail || !data.response.holidays) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: data.meta.error_detail,
        });
      }

      return data.response.holidays;
    } catch (err: any) {
      throw new TRPCError({
        code: err.code,
        message: err.message,
      });
    }
  }),
  // get holidays for current year by country code
  getCurrentYear: publicProcedure
    .input(getCurrentYearHolidaySchema)
    .query(async ({ input }) => {
      const { country } = input;
      const calendarApiKey = env.CALENDARIFIC_API_KEY;
      const currentYear = new Date().getFullYear();

      try {
        const data: CalendarificHolidayResponse = await fetch(
          `${CALENDARIFIC_API_URL}?api_key=${calendarApiKey}&country=${country}&year=${currentYear}`
        ).then((res) => res.json());

        if (data.meta.error_detail || !data.response.holidays) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: data.meta.error_detail,
          });
        }

        return data.response.holidays;
      } catch (err: any) {
        throw new TRPCError({
          code: err.code,
          message: err.message,
        });
      }
    }),
});
