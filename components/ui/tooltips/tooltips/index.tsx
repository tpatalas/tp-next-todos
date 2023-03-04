import { Portal } from '@headlessui/react';
import { classNames } from '@states/utils';
import { TypesTooltipAttributes, Types } from 'lib/types';
import React, { Fragment as TooltipFragment, memo } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

type Props = { options: Partial<TypesTooltipAttributes> } & Pick<Types, 'children'>;

export const Tooltip = memo(({ options, children }: Props) => {
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
    <TooltipFragment>
      <span ref={setTriggerRef}>{children}</span>
      {visible && (
        <Portal>
          <div
            ref={setTooltipRef}
            {...getTooltipProps()}
            className={classNames(
              options.tooltip && 'z-50 whitespace-nowrap rounded-md bg-gray-700 p-2 text-xs text-white opacity-90',
            )}>
            <span>{options.tooltip}</span>
            <kbd
              className={classNames(
                options.kbd &&
                  'ml-2 h-6 rounded border-x border-y py-px px-1.5 font-sans tracking-normal subpixel-antialiased',
              )}>
              {options.kbd}
            </kbd>
          </div>
        </Portal>
      )}
    </TooltipFragment>
  );
});

Tooltip.displayName = 'Tooltip';
