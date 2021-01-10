import React, { FC, ReactNode } from "react";
import range from "lodash/range";

export interface RepeatProps {
  readonly count: number;
  readonly children: (key: number) => ReactNode;
}

export const Repeat: FC<RepeatProps> = ({ count, children }) => (
  <>{range(count).map((_, index) => children(index))}</>
);
