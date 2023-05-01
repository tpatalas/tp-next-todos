export interface TypesNextAuthError {
  _id: string;
  message: string;
}

export interface TypesAuthErrorMessage {
  isError: boolean;
  isSignIn: boolean;
  defaultMessage: string;
  errorMessage: string;
}

export type TypesPropsErrorMessage = {
  options?: Partial<TypesAuthErrorMessage>;
};
