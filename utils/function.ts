export const call = <Fn extends (...args: any[]) => any>(
  fn?: Fn,
  ...args: Parameters<Fn>
): ReturnType<Fn> | undefined => (fn ? fn(...args) : undefined);
