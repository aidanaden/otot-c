import type { NextPage } from "next";
import { useRouter } from "next/router";

import { SpinnerIcon } from "src/components";
import { HolidayCard } from "src/features/holidays";
import { getHolidaySchema } from "src/server/trpc/router/holiday/schema";
import { trpc } from "../utils/trpc";

const Holidays: NextPage = () => {
  const router = useRouter();
  const { country, year } = router.query;
  const countryCode = country?.toString().toUpperCase();
  const cleaned = getHolidaySchema.parse({
    country: countryCode ?? "SG",
    year: (year as string) ?? "2021",
  });
  const holidays = trpc.holiday.get.useQuery({
    ...cleaned,
  });

  const uniqueHolidays = Array.from(
    new Set(holidays.data?.map((holiday) => holiday.name))
  );

  return (
    <>
      {holidays.isLoading ? (
        <div className="h-[calc(100vh - 72px)] w-3xl w-full flex items-center justify-center">
          <SpinnerIcon className="h-6 w-6 self-center" />
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 w-full mt-[144px] overflow-y-auto h-fit">
          {holidays.data?.map((holiday) => (
            <HolidayCard key={holiday.urlid} holiday={holiday} />
          ))}
        </div>
      )}
      {/* <AuthShowcase /> */}
    </>
  );
};

export default Holidays;
