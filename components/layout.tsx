import React, { FC } from "react";

import { Box, BoxProps, Flex } from "@chakra-ui/react";

import { PageTitle, PageTitleProps } from "components/meta";
import { PageImage, PageImageProps } from "components/meta";
import { PageDescription, PageDescriptionProps } from "components/meta";
import { PageURL, PageURLProps } from "components/meta";
import { PageType, PageTypeProps } from "components/meta";

import { Header, HeaderProps } from "components/header";
import { PageProgress } from "components/progress";

export interface LayoutProps
  extends BoxProps,
    Pick<HeaderProps, "breadcrumbs"> {
  pageUrl?: PageURLProps["url"];
  pageType?: PageTypeProps["type"];
  pageTitle?: PageTitleProps["title"];
  pageDescription?: PageDescriptionProps["description"];
  pageImageUrl?: PageImageProps["imageUrl"];
}

export const Layout: FC<LayoutProps> = ({
  pageTitle,
  pageDescription,
  pageImageUrl,
  pageUrl,
  pageType = "website",
  breadcrumbs,
  children,
  ...otherProps
}) => (
  <>
    <>
      <PageTitle title={pageTitle} />
      <PageDescription description={pageDescription} />
      <PageImage imageUrl={pageImageUrl} />
      <PageURL url={pageUrl} />
      <PageType type={pageType} />
    </>
    <Flex direction="column" minH="100vh">
      <Header breadcrumbs={breadcrumbs} />
      <Box as="main" w="full" py={4} {...otherProps}>
        {children}
      </Box>
      <Footer />
    </Flex>
    <PageProgress />
  </>
);

const Footer: FC = () => {
  return <Box h={10} />;
};
