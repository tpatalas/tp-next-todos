import { IconButton } from '@buttons/iconButton';
import { useSidebarOpen } from '@hooks/layouts';
import { optionsButtonSidebarToggle } from '@options/button';

export const SidebarButton = () => {
  const setSidebarOpen = useSidebarOpen();

  return (
    <>
      <IconButton
        options={optionsButtonSidebarToggle}
        onClick={() => setSidebarOpen()}
      />
      <span className='sr-only'>Open sidebar</span>
    </>
  );
};
