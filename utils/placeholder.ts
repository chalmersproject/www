export const usePlaceholders = <T>(
  array: T[] | undefined,
  count: number,
): (T | undefined)[] => array || [...new Array(count)];
