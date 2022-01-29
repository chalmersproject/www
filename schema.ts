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

export interface CreateShelterMutation_payload_shelter_address {
  __typename: "Address";
  line1: string;
  line2: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface CreateShelterMutation_payload_shelter_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface CreateShelterMutation_payload_shelter_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface CreateShelterMutation_payload_shelter {
  __typename: "Shelter";
  id: string;
  slug: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  address: CreateShelterMutation_payload_shelter_address;
  location: any;
  capacity: CreateShelterMutation_payload_shelter_capacity;
  occupancy: CreateShelterMutation_payload_shelter_occupancy;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface CreateShelterMutation_payload {
  __typename: "CreateShelterPayload";
  shelter: CreateShelterMutation_payload_shelter;
}

export interface CreateShelterMutation {
  /**
   * Register a new `Shelter`.
   */
  payload: CreateShelterMutation_payload;
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

export interface UpdateShelterMutation_payload_shelter_address {
  __typename: "Address";
  line1: string;
  line2: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface UpdateShelterMutation_payload_shelter_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface UpdateShelterMutation_payload_shelter_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface UpdateShelterMutation_payload_shelter {
  __typename: "Shelter";
  id: string;
  slug: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  address: UpdateShelterMutation_payload_shelter_address;
  location: any;
  capacity: UpdateShelterMutation_payload_shelter_capacity;
  occupancy: UpdateShelterMutation_payload_shelter_occupancy;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface UpdateShelterMutation_payload {
  __typename: "UpdateShelterPayload";
  shelter: UpdateShelterMutation_payload_shelter;
}

export interface UpdateShelterMutation {
  /**
   * Update a `Shelter`'s details.
   */
  payload: UpdateShelterMutation_payload;
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
  payload: boolean;
}

export interface DeleteShelterMutationVariables {
  input: DeleteShelterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterEditorQuery
// ====================================================

export interface ShelterEditorQuery_shelter_address {
  __typename: "Address";
  line1: string;
  line2: string | null;
  city: string;
  region: string;
  country: string;
  postcode: string;
}

export interface ShelterEditorQuery_shelter_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface ShelterEditorQuery_shelter_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface ShelterEditorQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  address: ShelterEditorQuery_shelter_address;
  location: any;
  capacity: ShelterEditorQuery_shelter_capacity;
  occupancy: ShelterEditorQuery_shelter_occupancy;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface ShelterEditorQuery {
  /**
   * Get a `Shelter` by its `ID`.
   */
  shelter: ShelterEditorQuery_shelter | null;
}

export interface ShelterEditorQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSignalMutation
// ====================================================

export interface CreateSignalMutation_payload_signal_shelter_signals {
  __typename: "Signal";
  id: string;
}

export interface CreateSignalMutation_payload_signal_shelter {
  __typename: "Shelter";
  id: string;
  signals: CreateSignalMutation_payload_signal_shelter_signals[];
}

export interface CreateSignalMutation_payload_signal {
  __typename: "Signal";
  id: string;
  name: string;
  slug: string;
  measure: ShelterMeasure;
  value: number | null;
  shelter: CreateSignalMutation_payload_signal_shelter;
}

export interface CreateSignalMutation_payload {
  __typename: "CreateSignalPayload";
  signal: CreateSignalMutation_payload_signal;
}

export interface CreateSignalMutation {
  /**
   * Register a new `Signal`.
   */
  payload: CreateSignalMutation_payload;
}

export interface CreateSignalMutationVariables {
  input: CreateSignalInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSignalMutation
// ====================================================

export interface DeleteSignalMutation_payload_shelter_signals {
  __typename: "Signal";
  id: string;
}

export interface DeleteSignalMutation_payload_shelter {
  __typename: "Shelter";
  id: string;
  signals: DeleteSignalMutation_payload_shelter_signals[];
}

export interface DeleteSignalMutation_payload {
  __typename: "DeleteSignalPayload";
  shelter: DeleteSignalMutation_payload_shelter;
}

export interface DeleteSignalMutation {
  /**
   * Delete a `Signal`.
   */
  payload: DeleteSignalMutation_payload;
}

export interface DeleteSignalMutationVariables {
  input: DeleteSignalInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SignalEditorQuery
// ====================================================

export interface SignalEditorQuery_signal_shelter {
  __typename: "Shelter";
  id: string;
}

export interface SignalEditorQuery_signal {
  __typename: "Signal";
  id: string;
  name: string;
  measure: ShelterMeasure;
  shelter: SignalEditorQuery_signal_shelter;
}

export interface SignalEditorQuery {
  /**
   * Get a `Signal` by its `ID`.
   */
  signal: SignalEditorQuery_signal | null;
}

export interface SignalEditorQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SignalInfoQuery
// ====================================================

export interface SignalInfoQuery_signal_measurements_occupancy {
  __typename: "ShelterSpace";
  beds: number;
  spots: number;
}

export interface SignalInfoQuery_signal_measurements {
  __typename: "ShelterMeasurement";
  id: string;
  occupancy: SignalInfoQuery_signal_measurements_occupancy;
  timestamp: any;
}

export interface SignalInfoQuery_signal {
  __typename: "Signal";
  id: string;
  secret: string;
  name: string;
  measure: ShelterMeasure;
  value: number | null;
  measurements: SignalInfoQuery_signal_measurements[];
}

export interface SignalInfoQuery_viewer {
  __typename: "User";
  id: string;
  isAdmin: boolean;
}

export interface SignalInfoQuery {
  /**
   * Get a `Signal` by its `ID`.
   */
  signal: SignalInfoQuery_signal | null;
  /**
   * Get the currently authenticated `User`.
   */
  viewer: SignalInfoQuery_viewer | null;
}

export interface SignalInfoQueryVariables {
  signalId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeQuery
// ====================================================

export interface HomeQuery_viewer {
  __typename: "User";
  id: string;
  isAdmin: boolean;
}

export interface HomeQuery_shelters {
  __typename: "Shelter";
  id: string;
  name: string;
  slug: string;
  about: string | null;
  imageUrl: string | null;
  food: ShelterFood;
  tags: ShelterTag[];
}

export interface HomeQuery {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: HomeQuery_viewer | null;
  /**
   * List all registered `Shelter`s.
   */
  shelters: HomeQuery_shelters[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MapQuery
// ====================================================

export interface MapQuery_shelters_occupancy {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface MapQuery_shelters_capacity {
  __typename: "ShelterSpace";
  spots: number;
  beds: number;
}

export interface MapQuery_shelters {
  __typename: "Shelter";
  id: string;
  location: any;
  occupancy: MapQuery_shelters_occupancy;
  capacity: MapQuery_shelters_capacity;
}

export interface MapQuery {
  /**
   * List all registered `Shelter`s.
   */
  shelters: MapQuery_shelters[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterPopupQuery
// ====================================================

export interface ShelterPopupQuery_shelter_occupancy {
  __typename: "ShelterSpace";
  beds: number;
  spots: number;
}

export interface ShelterPopupQuery_shelter_capacity {
  __typename: "ShelterSpace";
  beds: number;
  spots: number;
}

export interface ShelterPopupQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  slug: string;
  tags: ShelterTag[];
  about: string | null;
  occupancy: ShelterPopupQuery_shelter_occupancy;
  capacity: ShelterPopupQuery_shelter_capacity;
}

export interface ShelterPopupQuery {
  /**
   * Get a `Shelter` by its `ID`.
   */
  shelter: ShelterPopupQuery_shelter | null;
}

export interface ShelterPopupQueryVariables {
  shelterId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShelterHomeQuery
// ====================================================

export interface ShelterHomeQuery_viewer {
  __typename: "User";
  id: string;
  isAdmin: boolean;
}

export interface ShelterHomeQuery_shelter_occupancy {
  __typename: "ShelterSpace";
  beds: number;
  spots: number;
}

export interface ShelterHomeQuery_shelter_capacity {
  __typename: "ShelterSpace";
  beds: number;
  spots: number;
}

export interface ShelterHomeQuery_shelter_signals_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
}

export interface ShelterHomeQuery_shelter_signals_measurements {
  __typename: "ShelterMeasurement";
  id: string;
  timestamp: any;
}

export interface ShelterHomeQuery_shelter_signals {
  __typename: "Signal";
  id: string;
  name: string;
  slug: string;
  measure: ShelterMeasure;
  shelter: ShelterHomeQuery_shelter_signals_shelter;
  measurements: ShelterHomeQuery_shelter_signals_measurements[];
}

export interface ShelterHomeQuery_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
  about: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string;
  websiteUrl: string | null;
  location: any;
  food: ShelterFood;
  occupancy: ShelterHomeQuery_shelter_occupancy;
  capacity: ShelterHomeQuery_shelter_capacity;
  signals: ShelterHomeQuery_shelter_signals[];
  slug: string;
  tags: ShelterTag[];
}

export interface ShelterHomeQuery {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: ShelterHomeQuery_viewer | null;
  /**
   * Get a `Shelter` by its slug.
   */
  shelter: ShelterHomeQuery_shelter | null;
}

export interface ShelterHomeQueryVariables {
  slug: string;
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
// GraphQL fragment: ShelterCrumb_shelter
// ====================================================

export interface ShelterCrumb_shelter {
  __typename: "Shelter";
  name: string;
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShelterTags_shelter
// ====================================================

export interface ShelterTags_shelter {
  __typename: "Shelter";
  tags: ShelterTag[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SignalCard_signal
// ====================================================

export interface SignalCard_signal_shelter {
  __typename: "Shelter";
  id: string;
  name: string;
}

export interface SignalCard_signal_measurements {
  __typename: "ShelterMeasurement";
  id: string;
  timestamp: any;
}

export interface SignalCard_signal {
  __typename: "Signal";
  id: string;
  name: string;
  slug: string;
  measure: ShelterMeasure;
  shelter: SignalCard_signal_shelter;
  measurements: SignalCard_signal_measurements[];
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

export enum ShelterMeasure {
  BEDS = "BEDS",
  SPOTS = "SPOTS",
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

export interface CreateSignalInput {
  name: string;
  shelterId: string;
  measure: ShelterMeasure;
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

export interface DeleteSignalInput {
  signalId: string;
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
