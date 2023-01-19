import { Portal } from '@headlessui/react';
import { classNames } from '@states/utils';
import { TypesTooltipAttributes, Types } from 'lib/types';
import React, { Fragment as TooltipFragment, memo } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

type Props = Pick<Types, 'children'> & Partial<TypesTooltipAttributes>;

export const Tooltip = memo(
  ({
    children,
    trigger = 'hover',
    delayShow = 50,
    offset = [0, 25],
    placement = 'bottom',
    onVisible,
    closeOnTriggerHidden,
    tooltip,
    kbd,
  }: Props) => {
    const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
      trigger: trigger,
      delayShow: delayShow,
      delayHide: 50,
      offset: offset,
      interactive: false,
      placement: placement,
      visible: onVisible,
      closeOnTriggerHidden: closeOnTriggerHidden,
    });

    return (
      <TooltipFragment>
        <span ref={setTriggerRef}>{children}</span>
        {visible && (
          <Portal>
            <div
              ref={setTooltipRef}
              {...getTooltipProps()}
              className={classNames(
                tooltip &&
                  'z-50 whitespace-nowrap rounded-md bg-gray-700 p-2 text-xs text-white opacity-90',
              )}>
              <span>{tooltip}</span>
              <kbd
                className={classNames(
                  kbd &&
                    'ml-2 h-6 rounded border-x border-y py-px px-1.5 font-sans tracking-normal subpixel-antialiased',
                )}>
                {kbd}
              </kbd>
            </div>
          </Portal>
        )}
      </TooltipFragment>
    );
  },
);

Tooltip.displayName = 'Tooltip';
