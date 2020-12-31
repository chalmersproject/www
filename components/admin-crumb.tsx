import React, { FC } from "react";

import { Crumb, CrumbProps } from "components/crumb";

export interface AdminCrumbProps extends CrumbProps {}

export const AdminCrumb: FC<AdminCrumbProps> = ({ ...otherProps }) => {
  return (
    <Crumb href="/admin" {...otherProps}>
      Admin
    </Crumb>
  );
};
