import React, { FC } from "react";

import { Title, TitleProps } from "components/head";
import { Image, ImageProps } from "components/head";
import { Description, DescriptionProps } from "components/head";
import { PageURL, PageURLProps } from "components/head";
import { PageType, PageTypeProps } from "components/head";
import { Header, HeaderProps } from "components/header";

import { Flex, BoxProps, VStack } from "@chakra-ui/react";

export interface LayoutProps
  extends Omit<BoxProps, "title">,
    Pick<HeaderProps, "crumbs"> {
  pageTitle?: TitleProps["children"];
  pageDescription?: DescriptionProps["children"];
  pageImageUrl?: ImageProps["url"];
  pageUrl?: PageURLProps["url"];
  pageType?: PageTypeProps["type"];
}

export const Layout: FC<LayoutProps> = ({
  pageTitle: title,
  pageDescription: description,
  pageImageUrl: imageUrl,
  pageUrl,
  pageType = "website",
  crumbs,
  children,
  ...otherProps
}) => (
  <>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Image url={imageUrl} />
    <PageURL url={pageUrl} />
    <PageType type={pageType} />
    <Flex direction="column" minH="100vh">
      <Header crumbs={crumbs} />
      <VStack as="main" align="stretch" {...otherProps}>
        {children}
      </VStack>
    </Flex>
  </>
);
