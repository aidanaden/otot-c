import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/server/db/client";
import {
  holidayRouter,
  countryCodeSchema,
} from "src/server/trpc/router/holiday";

const holidays = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { country, year },
  } = req;
  const caller = holidayRouter.createCaller({
    prisma,
    session: null,
  });

  switch (method) {
    case "GET":
      try {
        const parsedCountryCode = countryCodeSchema.parse(
          (country as string).toUpperCase()
        );
        const currentYearHolidays = await caller.get({
          country: parsedCountryCode,
          year: year as string,
        });
        return res.status(200).json(currentYearHolidays);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
};

export default holidays;
