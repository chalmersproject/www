import { useState } from "react";
import get from "lodash/get";

interface GraphQLError {
  message: string;
  path: string[];
}

export const formatError = (error: Error): string => {
  {
    const graphQLError: GraphQLError | undefined = get(
      error,
      "source.errors[0]",
    );
    if (graphQLError) {
      const { message } = graphQLError;
      return `A server error ocurred: ${message}`;
    }
  }
  return error.message;
};

export const useThrowError = (): ((error: Error) => void) => {
  const [, setError] = useState(undefined);
  return (error: Error) => {
    setError(() => {
      throw error;
    });
  };
};
