'use client';

import { Portal } from '@headlessui/react';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { usePopperTooltip } from 'react-popper-tooltip';
import { PropsTooltip } from './tooltip.types';
import { mergeClasses } from '@/_lib/utils/misc.utils';

export const Tooltip = memo(({ options = {}, className, children }: PropsTooltip) => {
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
        ref={setTriggerRef}
        className={className}
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
                className={mergeClasses(
                  options.tooltip &&
                    'z-50 max-w-[15rem] truncate whitespace-nowrap rounded-lg bg-gray-700 p-2 text-xs text-white opacity-90',
                )}
              >
                <span>{options.tooltip}</span>
                <kbd
                  className={mergeClasses(
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
