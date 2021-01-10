import React, { FC, useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import { fill } from "utils/placeholder";
import { gql } from "@apollo/client";

import { BoxProps } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";

import { ShelterTags_shelter } from "schema";

export const SHELTER_TAGS_FRAGMENTS = gql`
  fragment ShelterTags_shelter on Shelter {
    tags
  }
`;

export interface ShelterTagsProps extends BoxProps {
  readonly shelter: ShelterTags_shelter | undefined;
}

export const ShelterTags: FC<ShelterTagsProps> = ({
  shelter,
  ...otherProps
}) => {
  const items = useMemo(() => {
    const { tags } = shelter ?? {};
    const sorted = tags ? [...tags].sort() : undefined;
    return fill(sorted, 3);
  }, [shelter]);

  if (isEmpty(items)) {
    return null;
  }
  return (
    <Wrap spacing={1.5} {...otherProps}>
      {items.map((tag, index) => (
        <WrapItem key={tag ?? index}>
          {tag ? (
            <Tag colorScheme="blue">{tag}</Tag>
          ) : (
            <Skeleton>
              <Tag w={20} />
            </Skeleton>
          )}
        </WrapItem>
      ))}
    </Wrap>
  );
};
