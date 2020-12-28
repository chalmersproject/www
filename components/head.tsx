import React, { FC } from "react";
import Head from "next/head";

export interface TitleProps {
  readonly children?: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  const title = children ? `${children} | Joya` : "Joya";
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
