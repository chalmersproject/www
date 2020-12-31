import React, { FC } from "react";
import Head from "next/head";

export interface TitleProps {
  readonly children?: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  const siteTitle = "Chalmers Project";
  const pageTitle = children ? `${children} | ${siteTitle}` : siteTitle;
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};
