import { TypesOptionsLoadingState } from '@components/loadable/loadable.types';
import { LoadingSkeletonTodos } from '@components/todos/loadingTodos/loadingSkeletonTodos';
import { LoadingSkeletonLabels } from '@label/loadingLabels/loadingSkeletonLabels';
import { TypesOptionsFloatingLabelInput } from '@lib/types/options';

// loadingState
export const optionsLoadingTodos: TypesOptionsLoadingState = {
  loadingSkeleton: <LoadingSkeletonTodos />,
  repeatingCount: 10,
  margin: 'ml-4 sm:ml-1 mt-5',
  space: 'space-y-10',
};

export const optionsLoadingLabels: TypesOptionsLoadingState = {
  loadingSkeleton: <LoadingSkeletonLabels />,
  repeatingCount: 10,
  margin: 'ml-4',
  space: 'space-y-4',
};

export const optionsFloatingLabelsEmail = (isError: boolean): TypesOptionsFloatingLabelInput => {
  return {
    name: 'email',
    inputType: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    required: true,
    isError: isError,
  };
};

export const optionsFloatingLabelPassword = (
  isPasswordShown: boolean,
  isError: boolean,
): TypesOptionsFloatingLabelInput => {
  return {
    name: 'password',
    inputType: isPasswordShown ? 'text' : 'password',
    placeholder: 'Password',
    required: true,
    padding: 'pr-14',
    isError: isError,
  };
};
