import React, { FC } from "react";
import Head from "next/head";

export interface TitleProps {
  readonly children?: string | string[] | null;
}

export const Title: FC<TitleProps> = ({ children: title }) => {
  const siteTitle = "Chalmers Project";
  const propTitle = Array.isArray(title) ? title.join(" | ") : title;
  const pageTitle = propTitle ? `${propTitle} | ${siteTitle}` : siteTitle;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="og:title" property="og:title" content={pageTitle} />
      <meta name="twitter:title" property="twitter:title" content={pageTitle} />
    </Head>
  );
};

export interface DescriptionProps {
  readonly children?: string | null;
}

export const Description: FC<DescriptionProps> = ({ children: text }) => {
  if (!text) return null;
  return (
    <Head>
      <meta name="description" content={text} />
      <meta name="og:description" property="og:description" content={text} />
      <meta
        name="twitter:description"
        property="twitter:description"
        content={text}
      />
    </Head>
  );
};

export interface ImageProps {
  readonly url?: string | null;
}

export const Image: FC<ImageProps> = ({ url }) => {
  if (!url) return null;
  return (
    <Head>
      <meta name="og:image" property="og:image" content={url} />
      <meta name="twitter:image" property="twitter:image" content={url} />
    </Head>
  );
};

export interface SiteNameProps {
  readonly children?: string;
}

export const SiteName: FC<SiteNameProps> = ({ children: name }) => {
  if (!name) return null;
  return (
    <Head>
      <meta property="og:site_name" content={name} />
    </Head>
  );
};

export interface PageURLProps {
  readonly url?: string;
}

export const PageURL: FC<PageURLProps> = ({ url }) => {
  if (!url) return null;
  return (
    <Head>
      <meta property="og:url" content={url} />
    </Head>
  );
};

export interface PageTypeProps {
  readonly type: "article" | "website";
}

export const PageType: FC<PageTypeProps> = ({ type }) => (
  <Head>
    <meta property="og:type" content={type} />
  </Head>
);
