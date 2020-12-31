import { useMemo } from "react";

import first from "lodash/first";
import { NextRouter, useRouter } from "next/router";

export const getQueryParam = (
  router: NextRouter,
  key: string,
): string | null => {
  const { [key]: value } = router.query;
  return (Array.isArray(value) ? first(value) : value) ?? null;
};

export const getRedirect = (router: NextRouter): string | null =>
  getQueryParam(router, "redirect");

export const useQueryParam = (key: string): string | null => {
  const router = useRouter();
  return useMemo(() => getQueryParam(router, key), [router]);
};

export const useRedirect = (): string | null => useQueryParam("redirect");
