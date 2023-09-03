'use client';

import { Portal } from '@headlessui/react';
import { isMobile } from 'react-device-detect';
import { usePopperTooltip } from 'react-popper-tooltip';
import { PropsTooltip } from './tooltip.types';

export const Tooltip = ({ configs = {}, children }: PropsTooltip) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({ ...configs });
  const { kbd, tooltip, classNameTooltip, classNameKbd } = configs;

  return (
    <>
      <span ref={setTriggerRef}>{children}</span>
      {visible && (
        <>
          {!isMobile && (
            <Portal>
              <div
                ref={setTooltipRef}
                {...getTooltipProps()}
                className={!!tooltip ? classNameTooltip : undefined}
              >
                <span>{tooltip}</span>
                <kbd className={!!kbd ? classNameKbd : undefined}>{kbd}</kbd>
              </div>
            </Portal>
          )}
        </>
      )}
    </>
  );
};
