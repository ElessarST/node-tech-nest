import { parse, format, isValid } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

export function parseDate(dateString: string): Date | null {
  const parsedDate = parse(dateString, DATE_FORMAT, new Date());
  return isValid(parsedDate) ? parsedDate : null;
}

export function formatDate(date: Date): string {
  return format(date, DATE_FORMAT);
}
