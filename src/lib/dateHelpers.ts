import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  parse,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMonthOfInterval,
  startOfHour,
} from 'date-fns';
import { TimePeriod } from '@/types/analytics';

export function calculateDateRange(period: TimePeriod): { startDate: Date; endDate: Date } {
  const now = new Date();

  switch (period) {
    case 'today':
      return { startDate: startOfDay(now), endDate: endOfDay(now) };
    case 'week':
      return { startDate: startOfWeek(now), endDate: endOfWeek(now) };
    case 'month':
      return { startDate: startOfMonth(now), endDate: endOfMonth(now) };
    case 'all':
      return { startDate: new Date(0), endDate: now };
    default:
      return { startDate: startOfWeek(now), endDate: endOfWeek(now) };
  }
}

export function formatChartDate(date: Date | string, period: TimePeriod): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  switch (period) {
    case 'today':
      return format(dateObj, 'HH:mm'); // 14:00
    case 'week':
      return format(dateObj, 'EEE'); // Mon, Tue, etc.
    case 'month':
      return format(dateObj, 'MMM dd'); // Jan 15
    case 'all':
      return format(dateObj, 'MMM yyyy'); // Jan 2024
    default:
      return format(dateObj, 'MMM dd');
  }
}

export function getDateIntervals(startDate: Date, endDate: Date, period: TimePeriod): Date[] {
  switch (period) {
    case 'today':
      return eachHourOfInterval({ start: startDate, end: endDate });
    case 'week':
    case 'month':
      return eachDayOfInterval({ start: startDate, end: endDate });
    case 'all':
      return eachMonthOfInterval({ start: startDate, end: endDate });
    default:
      return eachDayOfInterval({ start: startDate, end: endDate });
  }
}

export function normalizeDate(date: Date, period: TimePeriod): Date {
  switch (period) {
    case 'today':
      return startOfHour(date);
    case 'week':
    case 'month':
      return startOfDay(date);
    case 'all':
      return startOfMonth(date);
    default:
      return startOfDay(date);
  }
}
