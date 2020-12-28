/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthCreateUser
// ====================================================

export interface AuthCreateUser_createUser_user {
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

export interface AuthCreateUser_createUser {
  __typename: "CreateUserPayload";
  user: AuthCreateUser_createUser_user;
}

export interface AuthCreateUser {
  /**
   * Register a new user account.
   */
  createUser: AuthCreateUser_createUser;
}

export interface AuthCreateUserVariables {
  input: CreateUserInput;
}
