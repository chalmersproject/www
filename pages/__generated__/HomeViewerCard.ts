/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeViewerCard
// ====================================================

export interface HomeViewerCard_viewer {
  __typename: "User";
  id: string;
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

export interface HomeViewerCard {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: HomeViewerCard_viewer | null;
}
