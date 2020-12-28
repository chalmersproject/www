import React, { FC } from "react";

import { FieldName, FieldErrors } from "react-hook-form";
import {
  ErrorMessage as HookErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";

import {
  FormErrorMessage as _FormErrorMessage,
  FormErrorMessageProps as _FormErrorMessageProps,
} from "@chakra-ui/react";

export interface FormErrorMessageProps<Errors extends FieldErrors = FieldErrors>
  extends _FormErrorMessageProps {
  name: FieldName<FieldValuesFromFieldErrors<Errors>>;
  errors: Errors;
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  errors,
  name,
  ...otherProps
}) => (
  <HookErrorMessage
    {...{ errors, name }}
    render={({ message }) =>
      message ? (
        <_FormErrorMessage {...otherProps}>{message}</_FormErrorMessage>
      ) : null
    }
  />
);
