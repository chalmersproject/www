import React, { FC } from "react";
import { gql } from "@apollo/client";

import { Crumb, CrumbProps } from "components/crumb";

import { ShelterCrumb_shelter } from "schema";

export const SHELTER_CRUMB_FRAGMENTS = gql`
  fragment ShelterCrumb_shelter on Shelter {
    name
    slug
  }
`;

export interface ShelterCrumbProps extends CrumbProps {
  shelter: ShelterCrumb_shelter | null | undefined;
}

export const ShelterCrumb: FC<ShelterCrumbProps> = ({
  shelter,
  ...otherProps
}) => {
  const { name, slug } = shelter ?? {};
  const href = slug ? `/shelter/${slug}` : undefined;
  return (
    <Crumb href={href} {...otherProps}>
      {name ?? "Shelter"}
    </Crumb>
  );
};
