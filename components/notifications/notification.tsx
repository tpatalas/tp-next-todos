import { IconButton } from '@buttons/iconButton';
import {
  Div as DivButton,
  Div as DivNotification,
  Div as DivHeader,
  Div as DivHeaders,
} from '@containers/div';
import { Para as ParaMessageDescription, Para as ParaMessageTitle } from '@containers/para';
import { dataButtonGlobalClose, dataNotification } from '@data/dataObjects';
import { NotificationResetEffect } from '@effect/notificationResetEffect';
import { MinimizeModalTransition } from '@modals/modal/modalTransition/minimizeModalTransition';
import { selectorNotificationState, atomNotificationOpen } from '@states/notificationStates';
import { TypesNotification } from 'lib/types';
import dynamic from 'next/dynamic';
import { Fragment as NotificationFragment } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const SvgIcon = dynamic(() => import('components/icons/svgIcon').then((mod) => mod.SvgIcon));

export const Notification = () => {
  const notification = useRecoilValue(selectorNotificationState) as TypesNotification;
  const isNotificationOpen = useRecoilValue(atomNotificationOpen);
  const setNotificationOpen = useSetRecoilState(atomNotificationOpen);

  return (
    <NotificationFragment>
      <MinimizeModalTransition
        show={isNotificationOpen}
        data={dataNotification}>
        <DivNotification className='flex flex-col'>
          <DivHeaders className='flex flex-row justify-between'>
            <DivHeader className='flex flex-row items-center '>
              <DivButton className='flex flex-shrink-0'>
                <SvgIcon
                  data={{
                    path: notification.iconPath,
                    className: notification.iconPresetStyle,
                  }}
                />
              </DivButton>
              <ParaMessageTitle className='ml-3 text-sm font-medium text-gray-900'>
                {notification.message}
              </ParaMessageTitle>
            </DivHeader>
            <DivButton className='ml-4 flex flex-shrink-0'>
              <IconButton
                data={dataButtonGlobalClose}
                onClick={() => setNotificationOpen(false)}
              />
            </DivButton>
          </DivHeaders>
          {notification.description && (
            <ParaMessageDescription className='ml-8 mr-3 break-all text-sm text-gray-500'>
              {notification.description}
            </ParaMessageDescription>
          )}
        </DivNotification>
      </MinimizeModalTransition>
      <NotificationResetEffect />
    </NotificationFragment>
  );
};
