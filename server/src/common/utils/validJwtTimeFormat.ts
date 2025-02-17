const isValidJwtTimeFormat = (value: string): boolean => {
  return /^\d+[smhd]$/.test(value); // Matches formats like "15m", "7d", "2h"
};
