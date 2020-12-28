import React, { FC } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export interface InputIconProps extends IconProps {}

export const InputIcon: FC<InputIconProps> = ({
  boxSize,
  color,
  children,
  ...otherProps
}) => (
  <Icon boxSize={boxSize ?? 5} color={color ?? "blue.500"} {...otherProps}>
    {children}
  </Icon>
);
