export function fill<T>(
  array: T[] | undefined,
  count: number,
): (T | undefined)[] {
  return array || [...new Array(count)];
}
