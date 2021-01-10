import React, { FC } from "react";

import { Crumb, CrumbProps } from "components/crumb";

export interface HomeCrumbProps extends CrumbProps {}

export const HomeCrumb: FC<HomeCrumbProps> = ({ ...otherProps }) => {
  return (
    <Crumb href="/" {...otherProps}>
      Home
    </Crumb>
  );
};
