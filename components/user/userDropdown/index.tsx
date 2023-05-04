import { PATH_IMAGE_APP } from '@constAssertions/data';
import { ICON_LOGOUT, ICON_SETTINGS } from '@data/materialSymbols';
import { ActiveDropdownMenuItemEffect } from '@effects/activeDropdownMenuItemEffect';
import { nextImageLoader } from '@stateLogics/utils';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dropdown } from '@dropdowns/v2/dropdown';
import { MenuItem } from '@dropdowns/v2/dropdown/menuItem';

export const UserDropdown = () => {
  const { data: session } = useSession();
  const userImage = session?.user.image;
  const dropdownOptions = {
    hasDivider: false,
    padding: 'p-0',
    hoverRing: 'hover:ring-4 hover:ring-slate-200',
  };
  const menuItemSettingOptions = {
    path: ICON_SETTINGS,
    tooltip: 'Settings',
    isDisabled: true,
  };
  const menuItemSignOutOptions = {
    path: ICON_LOGOUT,
    tooltip: 'Sign out',
  };

  return (
    <Dropdown
      options={dropdownOptions}
      menuButtonContent={
        <Fragment>
          <span className='sr-only'>Open user menu</span>
          <Image
            loader={!!userImage ? undefined : nextImageLoader}
            width={32}
            height={32}
            priority
            className='rounded-full drop-shadow-lg'
            src={!!userImage ? userImage : PATH_IMAGE_APP['avatar']}
            alt='User avatar'
          />
        </Fragment>
      }
    >
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      <div className='py-1'>
        <MenuItem options={menuItemSettingOptions}>Settings</MenuItem>
      </div>
      <div className='py-1'>
        <MenuItem
          options={menuItemSignOutOptions}
          onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_HOST })}
        >
          Sign out
        </MenuItem>
      </div>
    </Dropdown>
  );
};
