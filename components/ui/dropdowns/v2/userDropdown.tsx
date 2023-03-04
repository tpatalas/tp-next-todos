import { ICON_LOGOUT, ICON_SETTINGS } from '@data/materialSymbols';
import { ActiveDropdownMenuItemEffect } from '@states/misc/activeDropdownMenuItemEffect';
import { nextImageLoader } from '@states/utils';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dropdown } from './dropdown';
import { MenuItem } from './dropdown/menuItem';

export const UserDropdown = () => {
  return (
    <Dropdown
      options={{ hasDivider: false, padding: 'p-0', hoverRing: 'hover:ring-4 hover:ring-slate-200' }}
      menuButtonContent={
        <Fragment>
          <span className='sr-only'>Open user menu</span>
          <Image
            loader={nextImageLoader}
            width={32}
            height={32}
            className='rounded-full drop-shadow-lg'
            src='user_avatar.webp'
            alt='User avatar'
          />
        </Fragment>
      }>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      <div className='py-1'>
        <MenuItem
          options={{
            path: ICON_SETTINGS,
            tooltip: 'Settings',
            isDisabled: true,
          }}>
          Settings
        </MenuItem>
      </div>
      <div className='py-1'>
        <MenuItem
          options={{
            path: ICON_LOGOUT,
            tooltip: 'Sign out',
          }}
          onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_HOST + '/app' })}>
          Sign out
        </MenuItem>
      </div>
    </Dropdown>
  );
};
