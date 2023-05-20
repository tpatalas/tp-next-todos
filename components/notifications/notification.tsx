import { IconButton } from '@buttons/iconButton';
import { NotificationResetEffect } from '@effects/notifications';
import { MinimizeModalTransition } from '@modals/modal/modalTransition/minimizeModalTransition';
import { optionsButtonGlobalClose } from '@options/button';
import { optionsNotification } from '@options/misc';
import { selectorNotificationState, atomNotificationOpen } from '@states/notifications';
import { TypesNotification } from 'lib/types';
import dynamic from 'next/dynamic';
import { Fragment as NotificationFragment } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const SvgIcon = dynamic(() => import('@icon/svgIcon').then((mod) => mod.SvgIcon));

export const Notification = () => {
  const notification = useRecoilValue(selectorNotificationState) as TypesNotification;
  const isNotificationOpen = useRecoilValue(atomNotificationOpen);
  const setNotificationOpen = useSetRecoilState(atomNotificationOpen);

  return (
    <NotificationFragment>
      <MinimizeModalTransition
        show={isNotificationOpen}
        options={optionsNotification}
      >
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center '>
              <div className='flex flex-shrink-0'>
                <SvgIcon
                  options={{
                    path: notification.iconPath,
                    className: notification.iconPresetStyle,
                  }}
                />
              </div>
              <p className='ml-3 text-sm font-medium text-gray-900'>{notification.message}</p>
            </div>
            <div className='ml-4 flex flex-shrink-0'>
              <IconButton
                options={optionsButtonGlobalClose}
                onClick={() => setNotificationOpen(false)}
              />
            </div>
          </div>
          {notification.description && (
            <p className='ml-8 mr-3 break-all text-sm text-gray-500'>{notification.description}</p>
          )}
        </div>
      </MinimizeModalTransition>
      <NotificationResetEffect />
    </NotificationFragment>
  );
};
