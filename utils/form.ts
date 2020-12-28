export type Complete<T> = { [P in keyof T]-?: Exclude<T[P], undefined | null> };

export const assertComplete = <Values extends Record<string, any>>(
  values: Values,
): Complete<Values> => {
  for (const key in values) {
    const value = values[key];
    if (value === null || value === undefined) {
      throw new Error(
        `Expected all fields to be non-null, but field '${key}' is ${value}.`,
      );
    }
  }
  return values as Complete<Values>;
};
