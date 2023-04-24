import { UserSessionEffect } from './userSessionEffect';
import { UserSessionResetEffect } from './userSessionResetEffect';

export const UserSessionGroupEffect = () => {
  return (
    <>
      <UserSessionEffect />
      <UserSessionResetEffect />
    </>
  );
};
