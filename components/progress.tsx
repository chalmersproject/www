import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Fade } from "@chakra-ui/react";
import { Progress, ProgressProps } from "@chakra-ui/react";

export interface PageProgressProps extends ProgressProps {}

export const PageProgress: FC<PageProgressProps> = ({ ...otherProps }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setShow(true);
    const handleEnd = () => setShow(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleEnd);
    router.events.on("routeChangeError", handleEnd);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleEnd);
      router.events.off("routeChangeError", handleEnd);
    };
  }, [router]);

  return (
    <Fade in={show}>
      <Progress
        colorScheme="blue"
        pos="fixed"
        top={0}
        left={0}
        right={0}
        size="xs"
        isIndeterminate
        {...otherProps}
      />
    </Fade>
  );
};
