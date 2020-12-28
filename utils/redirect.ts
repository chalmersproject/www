import first from "lodash/first";
import { NextRouter } from "next/router";

export const getRedirect = (router: NextRouter): string | null => {
  const { redirect } = router.query;
  return (Array.isArray(redirect) ? first(redirect) : redirect) ?? null;
};
