/**
 * Format ISO datetime string to user-friendly format
 * Example: "2025-08-16T19:30+10:00" → "August 16, 2025 at 7:30 PM"
 */
export function formatEventDateTime(isoDateTime: string): string {
  try {
    const date = new Date(isoDateTime);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid datetime format:', isoDateTime);
      return isoDateTime; // Return original if parsing fails
    }
    
    // Format options for user-friendly display
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return isoDateTime; // Return original if formatting fails
  }
}

/**
 * Format ISO datetime string to short format
 * Example: "2025-08-16T19:30+10:00" → "Aug 16, 7:30 PM"
 */
export function formatShortDateTime(isoDateTime: string): string {
  try {
    const date = new Date(isoDateTime);
    
    if (isNaN(date.getTime())) {
      return isoDateTime;
    }
    
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleDateString('en-US', options);
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
    const date = new Date(isoDateTime);
    
    if (isNaN(date.getTime())) {
      return isoDateTime;
    }
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);
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
    const date = new Date(isoDateTime);
    
    if (isNaN(date.getTime())) {
      return isoDateTime;
    }
    
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleTimeString('en-US', options);
  } catch (error) {
    console.error('Error formatting time only:', error);
    return isoDateTime;
  }
}
