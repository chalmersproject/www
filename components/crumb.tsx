import React, { FC } from "react";
import Link, { LinkProps } from "next/link";

import { BreadcrumbItem, BreadcrumbItemProps } from "@chakra-ui/react";
import { BreadcrumbLink } from "@chakra-ui/react";
import { SkeletonText } from "@chakra-ui/react";

export interface CrumbProps extends BreadcrumbItemProps {
  href?: LinkProps["href"];
}

export const Crumb: FC<CrumbProps> = ({
  isCurrentPage,
  href,
  children,
  ...otherProps
}) => {
  const link = (
    <BreadcrumbLink
      fontWeight={isCurrentPage ? "medium" : undefined}
      color={isCurrentPage ? "pink.800" : "pink.700"}
    >
      {children ? (
        children
      ) : (
        <SkeletonText skeletonHeight={3} noOfLines={1} w={20} />
      )}
    </BreadcrumbLink>
  );
  return (
    <BreadcrumbItem
      isCurrentPage={isCurrentPage}
      color="pink.200"
      {...otherProps}
    >
      {href && !isCurrentPage ? <Link href={href}>{link}</Link> : link}
    </BreadcrumbItem>
  );
};
