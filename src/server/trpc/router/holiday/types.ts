export type CalendarificHoliday = {
  name: string;
  description: string;
  country: {
    id: string;
    name: string;
  };
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
    };
  };
  type: string[];
  urlid: string;
  locations: string;
  states: string;
};

export type CalendarificHolidayResponse = {
  meta: {
    code: number;
    error_type?: string;
    error_detail?: string;
  };
  response: {
    holidays?: CalendarificHoliday[] | undefined;
  };
};
