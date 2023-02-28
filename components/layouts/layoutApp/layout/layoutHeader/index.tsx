import { IconButton } from '@buttons/iconButton';
import { optionsButtonSidebarToggle } from '@data/dataOptions';
import { STYLE_BUTTON_KEY_ONLY_RING } from '@data/stylePreset';
import { Menu, Transition } from '@headlessui/react';
import { LayoutLogo } from '@layouts/layoutApp/layoutLogo';
import { useSidebarOpen } from '@states/layouts/hooks';
import { classNames } from '@states/utils';
import Image from 'next/image';
import {
  Fragment,
  Fragment as LayoutHeaderFragment,
  Fragment as LeftSideFragment,
  Fragment as LogoFragment,
  Fragment as RightSidebarFragment,
  Fragment as SidebarButtonFragment,
} from 'react';
import { HeaderSearchBar } from './headerSearchBar';

const userNavigation = [
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export const LayoutHeader = () => {
  const setSidebarOpen = useSidebarOpen();

  return (
    <LayoutHeaderFragment>
      <div className='sticky top-1 z-10 flex max-h-[4rem] min-h-[4rem] flex-row items-center justify-between bg-transparent sm:mb-2'>
        <LeftSideFragment>
          <div className='flex flex-row items-center justify-between pl-3 md:w-full md:max-w-3xs'>
            <SidebarButtonFragment>
              <IconButton
                options={optionsButtonSidebarToggle}
                onClick={() => setSidebarOpen()}
              />
              <span className='sr-only'>Open sidebar</span>
            </SidebarButtonFragment>
            <LogoFragment>
              <div className='hidden w-full flex-row justify-start pl-4 md:flex'>
                <LayoutLogo />
              </div>
            </LogoFragment>
          </div>
        </LeftSideFragment>
        <RightSidebarFragment>
          <div className='flex flex-1 pl-2 pr-3'>
            <HeaderSearchBar />
            <div className='ml-4 flex items-center md:ml-6'>
              {/* Profile dropdown */}
              <Menu
                as='div'
                className='relative ml-3'>
                <div>
                  <Menu.Button
                    className={classNames(
                      'flex max-w-xs items-center rounded-full bg-transparent text-sm outline-none transition-all duration-300 hover:ring-4 hover:ring-gray-200 hover:transition-all focus:ring-0 focus:ring-offset-0',
                      STYLE_BUTTON_KEY_ONLY_RING,
                    )}>
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      width={32}
                      height={32}
                      className='rounded-full drop-shadow-lg'
                      src={process.env.NEXT_PUBLIC_IMAGE_DOMAIN + '/user_avatar.webp'}
                      alt='User avatar'
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}>
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </RightSidebarFragment>
      </div>
    </LayoutHeaderFragment>
  );
};
