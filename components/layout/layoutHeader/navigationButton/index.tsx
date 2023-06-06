import { IconButton } from '@buttons/iconButton';
import { useNavigationOpen } from '@layout/layout.hooks';
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
