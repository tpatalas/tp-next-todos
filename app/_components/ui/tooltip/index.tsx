import { Portal } from '@headlessui/react';
import { isMobile } from 'react-device-detect';
import { usePopperTooltip } from 'react-popper-tooltip';
import { PropsTooltip } from './tooltip.types';
import { cx } from 'class-variance-authority';

export const Tooltip = ({ configs = {}, children }: PropsTooltip) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    trigger: configs.trigger ?? 'hover',
    delayShow: configs.delayShow ?? 50,
    offset: configs.offset ?? [0, 25],
    placement: configs.placement ?? 'bottom',
    visible: configs.isVisible,
    closeOnTriggerHidden: configs.isCloseOnTriggerHidden,
    delayHide: 50,
    interactive: false,
  });

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
                className={cx(
                  configs.tooltip &&
                    'z-50 max-w-[15rem] truncate whitespace-nowrap rounded-lg bg-gray-700 p-2 text-xs text-white opacity-90',
                )}
              >
                <span>{configs.tooltip}</span>
                <kbd
                  className={cx(
                    configs.kbd &&
                      'ml-2 h-6 rounded border-x border-y py-px px-1.5 font-sans tracking-normal subpixel-antialiased',
                  )}
                >
                  {configs.kbd}
                </kbd>
              </div>
            </Portal>
          )}
        </>
      )}
    </>
  );
};
