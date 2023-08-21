'use client';

import { forwardRef, useState } from 'react';
import { PropsButtonWithTooltip } from '../button.types';
import { Button } from '..';
import { Tooltip } from '@/tooltip/index';

export const ButtonWithTooltip = forwardRef<HTMLButtonElement, PropsButtonWithTooltip>(
  ({ configs = {}, onClick, onKeyDown, onDoubleClick, children }: PropsButtonWithTooltip, ref) => {
    const [hasTooltip, setTooltip] = useState(false);
    const { isDisabled, placement, offset, tooltip, kbd, isVisible } = configs;
    const configsTooltip = {
      tooltip: (hasTooltip || isDisabled) && !tooltip ? undefined : tooltip,
      kbd: (hasTooltip || isDisabled) && !kbd ? undefined : kbd,
      placement,
      offset,
      isVisible,
    };

    return (
      <Tooltip configs={configsTooltip}>
        <Button
          configs={configs}
          onMouseDown={() => !isDisabled && setTooltip(true)}
          onMouseEnter={() => !isDisabled && setTooltip(false)}
          onMouseLeave={() => !isDisabled && setTooltip(true)}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onDoubleClick={onDoubleClick}
          ref={ref}
        >
          {children}
        </Button>
      </Tooltip>
    );
  },
);
ButtonWithTooltip.displayName = 'ButtonWithTooltip';
