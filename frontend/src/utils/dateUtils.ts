import { parse, format, isValid } from 'date-fns';

const DATE_SERVER_FORMAT = 'yyyy-MM-dd';
const USER_FRIENDLY_FORMAT = 'MMM dd yyyy';

export function parseDate(dateString: string): Date | null {
  const parsedDate = parse(dateString, DATE_SERVER_FORMAT, new Date());
  return isValid(parsedDate) ? parsedDate : null;
}

export function formatDate(date: Date): string {
  return format(date, DATE_SERVER_FORMAT);
}

export function formatDateForUser(date: string): string {
  return format(parseDate(date)!, USER_FRIENDLY_FORMAT);
}
