export const MELBOURNE_TIME_ZONE = 'Australia/Melbourne';

function parseIsoDateTime(isoDateTime: string): Date | null {
  const date = new Date(isoDateTime);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function formatDateParts(
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: MELBOURNE_TIME_ZONE,
    ...options,
  }).format(date);
}

function logRawDateTime(source: string, isoDateTime: string) {
  console.log(`[date-formatter] ${source} raw datetime from Contentful:`, isoDateTime);
}

function formatDatePartLabels(isoDateTime: string, locale: string, month: 'short' | 'long') {
  const date = parseIsoDateTime(isoDateTime);

  if (!date) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: MELBOURNE_TIME_ZONE,
    day: '2-digit',
    month,
    year: 'numeric',
  });

  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  ) as Record<string, string>;

  return {
    date: `${values.day} ${values.month} ${values.year}`,
    formattedDate: formatter.format(date),
  };
}

/**
 * Format ISO datetime string to user-friendly format
 * Example: "2025-08-16T19:30+10:00" → "August 16, 2025 at 7:30 PM"
 */
export function formatEventDateTime(isoDateTime: string): string {
  try {
    logRawDateTime('formatEventDateTime', isoDateTime);

    const dateParts = formatDatePartLabels(isoDateTime, 'en-US', 'long');

    if (!dateParts) {
      console.warn('Invalid datetime format:', isoDateTime);
      return isoDateTime;
    }

    const date = parseIsoDateTime(isoDateTime);

    if (!date) {
      return isoDateTime;
    }

    const formattedTime = formatDateParts(date, 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${dateParts.formattedDate} at ${formattedTime}`;
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return isoDateTime;
  }
}

/**
 * Format ISO datetime string to separate Melbourne date and time strings.
 */
export function formatEventDateTimeParts(
  isoDateTime: string,
  locale = 'en-AU',
  month: 'short' | 'long' = 'short'
): { date: string; time: string } {
  logRawDateTime('formatEventDateTimeParts', isoDateTime);

  const date = parseIsoDateTime(isoDateTime);

  if (!date) {
    return { date: isoDateTime, time: isoDateTime };
  }

  return {
    date: formatDateParts(date, locale, {
      day: '2-digit',
      month,
      year: 'numeric',
    }),
    time: formatDateParts(date, locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  };
}

/**
 * Format ISO datetime string to an event date key in Melbourne time.
 * This prevents UTC conversion from shifting events onto the wrong day.
 */
export function formatEventDateKey(isoDateTime: string): string {
  const date = parseIsoDateTime(isoDateTime);

  if (!date) {
    return isoDateTime;
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: MELBOURNE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  ) as Record<string, string>;

  return `${values.year}-${values.month}-${values.day}`;
}

/**
 * Format ISO datetime string to short format
 * Example: "2025-08-16T19:30+10:00" → "Aug 16, 7:30 PM"
 */
export function formatShortDateTime(isoDateTime: string): string {
  try {
    const date = parseIsoDateTime(isoDateTime);

    if (!date) {
      return isoDateTime;
    }

    return formatDateParts(date, 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting short datetime:', error);
    return isoDateTime;
  }
}

/**
 * Format ISO datetime string to date only
 * Example: "2025-08-16T19:30+10:00" → "August 16, 2025"
 */
export function formatDateOnly(isoDateTime: string): string {
  try {
    const date = parseIsoDateTime(isoDateTime);

    if (!date) {
      return isoDateTime;
    }

    return formatDateParts(date, 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date only:', error);
    return isoDateTime;
  }
}

/**
 * Format ISO datetime string to time only
 * Example: "2025-08-16T19:30+10:00" → "7:30 PM"
 */
export function formatTimeOnly(isoDateTime: string): string {
  try {
    const date = parseIsoDateTime(isoDateTime);

    if (!date) {
      return isoDateTime;
    }

    return formatDateParts(date, 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting time only:', error);
    return isoDateTime;
  }
}
