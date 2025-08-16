/**
 * Generate a short name from a full name by taking the first letter of each word
 * and making them uppercase.
 * 
 * Examples:
 * - "Melbourne Chess Club" -> "MCC"
 * - "Victorian Chess Association" -> "VCA"
 * - "Chess Victoria" -> "CV"
 * 
 * @param fullName - The full name to abbreviate
 * @returns The abbreviated name in uppercase
 */
export function generateShortName(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }
  
  return fullName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}
