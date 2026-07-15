/**
 * Formats a timezone-adjusted local date/time into a beautiful string.
 * @param {number} timezoneOffsetInSeconds - Offset from UTC in seconds
 * @returns {string} e.g. "Wednesday, Jul 15, 6:43 PM"
 */
export function formatCurrentDateTime(timezoneOffsetInSeconds = 0) {
  // Get current system time in ms
  const systemTime = new Date().getTime();
  
  // Get browser timezone offset in ms (getTimezoneOffset returns minutes)
  const browserOffset = new Date().getTimezoneOffset() * 60000;
  
  // Calculate UTC time in ms
  const utcTime = systemTime + browserOffset;
  
  // Calculate destination local time in ms
  const destLocalTime = utcTime + (timezoneOffsetInSeconds * 1000);
  const localDate = new Date(destLocalTime);

  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options).format(localDate);
}

/**
 * Extracts a shorthand day name from a Unix timestamp.
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} e.g. "Mon"
 */
export function formatDayName(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { weekday: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Formats time from Unix timestamp.
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} e.g. "6:00 PM"
 */
export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
