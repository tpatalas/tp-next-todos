import { IconButton } from '@buttons/iconButton';
import { useNavigationOpen } from '@hooks/layouts';
import { optionsButtonSidebarToggle } from '@options/button';

export const NavigationButton = () => {
  const setNavigationOpen = useNavigationOpen();

  return (
    <>
      <IconButton
        options={optionsButtonSidebarToggle}
        onClick={() => setNavigationOpen()}
      />
      <span className='sr-only'>Open sidebar</span>
    </>
  );
};
