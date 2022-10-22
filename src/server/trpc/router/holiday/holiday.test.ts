import { inferProcedureInput } from "@trpc/server";

import { createContextInner } from "../../context";
import { AppRouter, appRouter } from "../_app";

const input: inferProcedureInput<AppRouter["holiday"]["get"]> = {
  country: "SG",
  year: "2022",
};

const holidayNames2022 = [
  "New Year's Day",
  "Thaipusam",
  "Lunar New Year's Day",
  "Second Day of Lunar New Year",
  "Valentine's Day",
  "Total Defense Day",
  "International Women's Day",
  "March Equinox",
  "April Fool's Day",
  "Good Friday",
  "Easter Saturday",
  "Easter Sunday",
  "Labour Day",
  "Day off for Labour Day",
  "Hari Raya Puasa",
  "Mother's Day",
  "Vesak Day",
  "Day off for Vesak Day",
  "International Museum Day",
  "Father's Day",
  "June Solstice",
  "Singapore Armed Forces Day",
  "Hari Raya Haji",
  "Day off for Hari Raya Haji",
  "Racial Harmony Day",
  "National Day",
  "Teachers' Day",
  "September Equinox",
  "Children's Day",
  "Diwali/Deepavali",
  "December Solstice",
  "Christmas Eve",
  "Christmas Day",
  "Day off for Christmas Day",
  "New Year's Eve",
];

test("get sg holidays for 2022", async () => {
  const ctx = await createContextInner({
    session: null,
  });
  const caller = appRouter.createCaller(ctx);

  const sgHolidays = await caller.holiday.get(input);
  const sgHolidayNames = sgHolidays.map((holiday) => holiday.name);
  const sgValidHolidays = sgHolidayNames.filter((name) =>
    holidayNames2022.includes(name)
  );

  expect(sgValidHolidays.length).toEqual(holidayNames2022.length);
});
