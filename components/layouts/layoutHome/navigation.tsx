import { NetworkStatus } from '@components/notifications/networkStatus';
import { Div } from '@containers/div';
import { usePrefetchRouter } from '@hooks/useUtils';
import { Logo } from './logo';

const Navigation = () => {
  const routerPushPrefetch = usePrefetchRouter('/');

  return (
    <nav className='m-3 flex h-0 flex-row items-center space-x-3 p-2'>
      <Div
        onClick={() => routerPushPrefetch()}
        className='cursor-pointer'>
        <Logo />
      </Div>
      <NetworkStatus />
    </nav>
  );
};
export default Navigation;
