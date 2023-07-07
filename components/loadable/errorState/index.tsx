import { errorStateMessage } from '../loadable.consts';

export const ErrorState = () => {
  return <span className='text-2xl'>{errorStateMessage}</span>;
};
