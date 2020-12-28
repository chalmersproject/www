import React, { FC, ComponentProps } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export interface InputIconProps extends IconProps {
  as: ComponentProps<typeof Icon>["as"];
}

export const InputIcon: FC<InputIconProps> = ({
  boxSize,
  color,
  children,
  ...otherProps
}) => (
  <Icon boxSize={boxSize ?? 5} color={color ?? "pink.500"} {...otherProps}>
    {children}
  </Icon>
);
