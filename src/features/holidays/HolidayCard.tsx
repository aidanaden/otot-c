import { CalendarificHoliday } from "src/server/trpc/router/holiday";

type HolidayCardProps = {
  holiday: CalendarificHoliday;
};

const HolidayCard = ({ holiday }: HolidayCardProps) => {
  const date = new Date(holiday.date.iso);
  return (
    <div className="rounded-xl bg-neutral-200 pl-5 pr-4 py-4 h-full">
      <div className="flex flex-row gap-3 justify-between mb-3">
        <h3 className="font-display text-2xl font-extrabold capitalize place-self-end">
          {holiday.name}
        </h3>
      </div>
      <div className="flex flex-row gap-2">
        <div
          className="rounded-md w-min text-xs capitalize font-semibold py-1 px-2
          border-[1px] border-neutral-600 text-neutral-800"
        >
          {holiday.country.id.toUpperCase()}
        </div>
        <div
          className="rounded-md w-min text-xs capitalize font-semibold py-1 px-2
          border-[1px] border-neutral-600 text-neutral-800"
        >
          {date.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export { HolidayCard };
