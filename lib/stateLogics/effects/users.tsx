import { useClientErrorMessage } from '@hooks/notifications';
import { GroupEffects } from './groupEffects';

export const UserAuthGroupEffect = () => {
  const clientErrorMessage = useClientErrorMessage();
  return (
    <>
      <GroupEffects effects={[clientErrorMessage]} />
    </>
  );
};
