'use client';

import { forwardRef, useState } from 'react';
import { Button } from '..';
import { Tooltip } from '@/tooltip/index';
import { PropsButtonWithTooltip } from '../button.types';

export const ButtonWithTooltip = forwardRef<HTMLButtonElement, PropsButtonWithTooltip>(
  (
    { configsButton = {}, configsTooltip = {}, onClick, onKeyDown, onDoubleClick, children }: PropsButtonWithTooltip,
    ref,
  ) => {
    const [hasTooltip, setTooltip] = useState(false);
    const { tooltip, kbd } = configsTooltip;
    const { disabled } = configsButton;
    const tooltipConfigs = {
      tooltip: (hasTooltip || disabled) && !tooltip ? undefined : tooltip,
      kbd: (hasTooltip || disabled) && !kbd ? undefined : kbd,
      ...configsTooltip,
    };

    return (
      <Tooltip configs={tooltipConfigs}>
        <Button
          configs={configsButton}
          onMouseDown={() => !disabled && setTooltip(true)}
          onMouseEnter={() => !disabled && setTooltip(false)}
          onMouseLeave={() => !disabled && setTooltip(true)}
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
