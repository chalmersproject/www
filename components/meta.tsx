import React, { FC } from "react";
import Head from "next/head";

export interface PageTitleProps {
  readonly title?: string | string[] | null;
}

export const PageTitle: FC<PageTitleProps> = ({ title }) => {
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

export interface PageDescriptionProps {
  readonly description?: string | null;
}

export const PageDescription: FC<PageDescriptionProps> = ({ description }) => {
  if (!description) return null;
  return (
    <Head>
      <meta name="description" content={description} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta
        name="twitter:description"
        property="twitter:description"
        content={description}
      />
    </Head>
  );
};

export interface PageImageProps {
  readonly imageUrl?: string | null;
}

export const PageImage: FC<PageImageProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;
  return (
    <Head>
      <meta name="og:image" property="og:image" content={imageUrl} />
      <meta name="twitter:image" property="twitter:image" content={imageUrl} />
    </Head>
  );
};

export interface SiteNameProps {}

export const SiteName: FC<SiteNameProps> = () => {
  return (
    <Head>
      <meta property="og:site_name" content="Chalmers Project" />
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
