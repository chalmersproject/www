/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthGetViewer
// ====================================================

export interface AuthGetViewer_viewer {
  __typename: "User";
  id: string;
}

export interface AuthGetViewer {
  /**
   * Get the currently authenticated `User`.
   */
  viewer: AuthGetViewer_viewer | null;
}
