/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthUpdateUser
// ====================================================

export interface AuthUpdateUser_updateUser_user {
  __typename: "User";
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string | null;
  isAdmin: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export interface AuthUpdateUser_updateUser {
  __typename: "UpdateUserPayload";
  user: AuthUpdateUser_updateUser_user;
}

export interface AuthUpdateUser {
  /**
   * Update a `User`'s account information.
   */
  updateUser: AuthUpdateUser_updateUser;
}

export interface AuthUpdateUserVariables {
  input: UpdateUserInput;
}
