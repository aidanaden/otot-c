import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/server/db/client";
import {
  holidayRouter,
  countryCodeSchema,
} from "src/server/trpc/router/holiday";

const currentYearHolidays = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    method,
    query: { country },
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
        const currentYearHolidays = await caller.getCurrentYear({
          country: parsedCountryCode,
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

export default currentYearHolidays;
