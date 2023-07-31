'use client';

import { Portal } from '@headlessui/react';
import { classNames } from '@stateLogics/utils';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { usePopperTooltip } from 'react-popper-tooltip';
import { PropsTooltip } from './tooltip.types';

export const Tooltip = memo(({ options = {}, children }: PropsTooltip) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    trigger: options.trigger ?? 'hover',
    delayShow: options.delayShow ?? 50,
    offset: options.offset ?? [0, 25],
    placement: options.placement ?? 'bottom',
    visible: options.isVisible,
    closeOnTriggerHidden: options.isCloseOnTriggerHidden,
    delayHide: 50,
    interactive: false,
  });

  return (
    <>
      <span
        className={classNames(options.container)}
        ref={setTriggerRef}
      >
        {children}
      </span>
      {visible && (
        <>
          {!isMobile && (
            <Portal>
              <div
                ref={setTooltipRef}
                {...getTooltipProps()}
                className={classNames(
                  options.tooltip &&
                    'z-50 max-w-[15rem] truncate whitespace-nowrap rounded-lg bg-gray-700 p-2 text-xs text-white opacity-90',
                )}
              >
                <span>{options.tooltip}</span>
                <kbd
                  className={classNames(
                    options.kbd &&
                      'ml-2 h-6 rounded border-x border-y py-px px-1.5 font-sans tracking-normal subpixel-antialiased',
                  )}
                >
                  {options.kbd}
                </kbd>
              </div>
            </Portal>
          )}
        </>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';
