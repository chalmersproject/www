import React, { FC } from "react";
import { gql } from "@apollo/client";

import { Crumb, CrumbProps } from "components/crumb";

import { ShelterAdminCrumb_shelter } from "schema";

export const SHELTER_ADMIN_CRUMB_FRAGMENTS = gql`
  fragment ShelterAdminCrumb_shelter on Shelter {
    name
    slug
  }
`;

export interface ShelterAdminCrumbProps extends CrumbProps {
  shelter: ShelterAdminCrumb_shelter | null | undefined;
}

export const ShelterAdminCrumb: FC<ShelterAdminCrumbProps> = ({
  shelter,
  ...otherProps
}) => {
  const { name, slug } = shelter ?? {};
  const href = slug ? `/shelter/${slug}/admin` : undefined;
  return (
    <Crumb href={href} {...otherProps}>
      {name ?? "Shelter"}
    </Crumb>
  );
};
