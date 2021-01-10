import React, { FC } from "react";
import Link, { LinkProps } from "next/link";

import {
  BreadcrumbItem,
  BreadcrumbItemProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { BreadcrumbLink } from "@chakra-ui/react";
import { SkeletonText } from "@chakra-ui/react";
import { useTransparentize } from "utils/theme";

export interface CrumbProps extends BreadcrumbItemProps {
  href?: LinkProps["href"];
}

export const Crumb: FC<CrumbProps> = ({
  isCurrentPage,
  href,
  children,
  ...otherProps
}) => {
  const currentLinkColor = useColorModeValue("pink.800", "pink.300");

  const separatorColorDark = useTransparentize("pink.400", 0.64);
  const separatorColor = useColorModeValue("pink.300", separatorColorDark);

  const linkColorTransparency = 0.75;
  const linkColorLight = useTransparentize("pink.800", linkColorTransparency);
  const linkColorDark = useTransparentize("pink.300", linkColorTransparency);
  const linkColor = useColorModeValue(linkColorLight, linkColorDark);

  const renderLink = () => (
    <BreadcrumbLink
      fontWeight={isCurrentPage ? "medium" : undefined}
      color={isCurrentPage ? currentLinkColor : linkColor}
    >
      {children ?? <SkeletonText skeletonHeight={3} noOfLines={1} w={20} />}
    </BreadcrumbLink>
  );

  return (
    <BreadcrumbItem
      isCurrentPage={isCurrentPage}
      color={separatorColor}
      {...otherProps}
    >
      {href && !isCurrentPage ? (
        <Link href={href} passHref>
          {renderLink()}
        </Link>
      ) : (
        renderLink()
      )}
    </BreadcrumbItem>
  );
};
