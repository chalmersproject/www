/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HeaderQuery
// ====================================================

export interface HeaderQuery_viewer {
  __typename: "User";
  id: string;
  name: string;
  imageUrl: string | null;
}

export interface HeaderQuery {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: HeaderQuery_viewer | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateShelterMutation
// ====================================================

export interface CreateShelterMutation_createShelter_shelter_address {
  __typename: "Address";
  line1: string;
  line2: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface CreateShelterMutation_createShelter_shelter_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface CreateShelterMutation_createShelter_shelter_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface CreateShelterMutation_createShelter_shelter {
  __typename: "Shelter";
  id: string;
  slug: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  address: CreateShelterMutation_createShelter_shelter_address;
  location: any;
  capacity: CreateShelterMutation_createShelter_shelter_capacity;
  occupancy: CreateShelterMutation_createShelter_shelter_occupancy;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface CreateShelterMutation_createShelter {
  __typename: "CreateShelterPayload";
  shelter: CreateShelterMutation_createShelter_shelter;
}

export interface CreateShelterMutation {
  /**
   * Register a new `Shelter`.
   */
  createShelter: CreateShelterMutation_createShelter;
}

export interface CreateShelterMutationVariables {
  input: CreateShelterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateShelterMutation
// ====================================================

export interface UpdateShelterMutation_updateShelter_shelter_address {
  __typename: "Address";
  line1: string;
  line2: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface UpdateShelterMutation_updateShelter_shelter_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface UpdateShelterMutation_updateShelter_shelter_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface UpdateShelterMutation_updateShelter_shelter {
  __typename: "Shelter";
  id: string;
  slug: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  address: UpdateShelterMutation_updateShelter_shelter_address;
  location: any;
  capacity: UpdateShelterMutation_updateShelter_shelter_capacity;
  occupancy: UpdateShelterMutation_updateShelter_shelter_occupancy;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface UpdateShelterMutation_updateShelter {
  __typename: "UpdateShelterPayload";
  shelter: UpdateShelterMutation_updateShelter_shelter;
}

export interface UpdateShelterMutation {
  /**
   * Update a `Shelter`'s details.
   */
  updateShelter: UpdateShelterMutation_updateShelter;
}

export interface UpdateShelterMutationVariables {
  input: UpdateShelterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteShelterMutation
// ====================================================

export interface DeleteShelterMutation {
  /**
   * Delete a `Shelter`.
   */
  deleteShelter: boolean;
}

export interface DeleteShelterMutationVariables {
  input: DeleteShelterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterFormQuery
// ====================================================

export interface ShelterFormQuery_shelter_address {
  __typename: "Address";
  line1: string;
  line2: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface ShelterFormQuery_shelter_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface ShelterFormQuery_shelter_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface ShelterFormQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  address: ShelterFormQuery_shelter_address;
  location: any;
  capacity: ShelterFormQuery_shelter_capacity;
  occupancy: ShelterFormQuery_shelter_occupancy;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface ShelterFormQuery {
  /**
   * Get a `Shelter` by its `ID`.
   */
  shelter: ShelterFormQuery_shelter | null;
}

export interface ShelterFormQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminQuery
// ====================================================

export interface AdminQuery_viewer {
  __typename: "User";
  id: string;
  isAdmin: boolean;
}

export interface AdminQuery_shelters {
  __typename: "Shelter";
  id: string;
  name: string;
  slug: string;
  about: string | null;
  imageUrl: string | null;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface AdminQuery {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: AdminQuery_viewer | null;
  /**
   * List all registered `Shelter`s.
   */
  shelters: AdminQuery_shelters[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterMetaQuery
// ====================================================

export interface ShelterMetaQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
}

export interface ShelterMetaQuery {
  /**
   * Get a `Shelter` by its slug.
   */
  shelter: ShelterMetaQuery_shelter | null;
}

export interface ShelterMetaQueryVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterAdminQuery
// ====================================================

export interface ShelterAdminQuery_viewer {
  __typename: "User";
  id: string;
  isAdmin: boolean;
}

export interface ShelterAdminQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  slug: string;
  about: string | null;
  imageUrl: string | null;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface ShelterAdminQuery {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: ShelterAdminQuery_viewer | null;
  /**
   * Get a `Shelter` by its slug.
   */
  shelter: ShelterAdminQuery_shelter | null;
}

export interface ShelterAdminQueryVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterAdminMetaQuery
// ====================================================

export interface ShelterAdminMetaQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  imageUrl: string | null;
}

export interface ShelterAdminMetaQuery {
  /**
   * Get a `Shelter` by its slug.
   */
  shelter: ShelterAdminMetaQuery_shelter | null;
}

export interface ShelterAdminMetaQueryVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthViewerQuery
// ====================================================

export interface AuthViewerQuery_viewer {
  __typename: "User";
  id: string;
}

export interface AuthViewerQuery {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: AuthViewerQuery_viewer | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserAccountMutation
// ====================================================

export interface CreateUserAccountMutation_createUser_user {
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

export interface CreateUserAccountMutation_createUser {
  __typename: "CreateUserPayload";
  user: CreateUserAccountMutation_createUser_user;
}

export interface CreateUserAccountMutation {
  /**
   * Register a new user account.
   */
  createUser: CreateUserAccountMutation_createUser;
}

export interface CreateUserAccountMutationVariables {
  input: CreateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserAccountMutation
// ====================================================

export interface UpdateUserAccountMutation_updateUser_user {
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

export interface UpdateUserAccountMutation_updateUser {
  __typename: "UpdateUserPayload";
  user: UpdateUserAccountMutation_updateUser_user;
}

export interface UpdateUserAccountMutation {
  /**
   * Update a `User`'s account information.
   */
  updateUser: UpdateUserAccountMutation_updateUser;
}

export interface UpdateUserAccountMutationVariables {
  input: UpdateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AdminGuard_viewer
// ====================================================

export interface AdminGuard_viewer {
  __typename: "User";
  isAdmin: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HeaderMenu_viewer
// ====================================================

export interface HeaderMenu_viewer {
  __typename: "User";
  name: string;
  imageUrl: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShelterAdminCrumb_shelter
// ====================================================

export interface ShelterAdminCrumb_shelter {
  __typename: "Shelter";
  name: string;
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShelterCard_shelter
// ====================================================

export interface ShelterCard_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  slug: string;
  about: string | null;
  imageUrl: string | null;
  food: ShelterFood;
  tags: ShelterTag[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShelterList_shelter
// ====================================================

export interface ShelterList_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  slug: string;
  about: string | null;
  imageUrl: string | null;
  food: ShelterFood;
  tags: ShelterTag[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ShelterFood {
  MEALS = "MEALS",
  NONE = "NONE",
  SNACKS = "SNACKS",
}

export enum ShelterTag {
  ADULT = "ADULT",
  FAMILY = "FAMILY",
  FEMALE = "FEMALE",
  LGBTQ = "LGBTQ",
  MALE = "MALE",
  PETS = "PETS",
  YOUTH = "YOUTH",
}

export interface AddressInput {
  line1: string;
  line2?: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface CreateShelterInput {
  name: string;
  about?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  phone: string;
  websiteUrl?: string | null;
  address: AddressInput;
  location: any;
  capacity: ShelterSpaceInput;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  about?: string | null;
  imageUrl?: string | null;
}

export interface DeleteShelterInput {
  shelterId: string;
}

export interface ShelterSpaceInput {
  spots: number;
  beds: number;
}

export interface UpdateShelterInput {
  shelterId: string;
  name?: string | null;
  about?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  websiteUrl?: string | null;
  address?: AddressInput | null;
  location?: any | null;
  capacity?: ShelterSpaceInput | null;
  food?: ShelterFood | null;
  tags?: ShelterTag[] | null;
}

export interface UpdateUserInput {
  firstName?: string | null;
  lastName?: string | null;
  about?: string | null;
  imageUrl?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
