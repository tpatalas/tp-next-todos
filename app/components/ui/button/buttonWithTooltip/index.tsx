'use client';

import { forwardRef, useState } from 'react';
import { PropsButtonWithTooltip } from '../button.types';
import { Button } from '..';
import { Tooltip } from '@tooltips/tooltips';

export const ButtonWithTooltip = forwardRef<HTMLButtonElement, PropsButtonWithTooltip>(
  ({ options = {}, onClick, onKeyDown, onDoubleClick, children }: PropsButtonWithTooltip, ref) => {
    const [hasTooltip, setTooltip] = useState(false);
    const { ariaLabel, type, className, isDisabled, container, placement, offset, tooltip, kbd } = options;
    const optionsButton = { ariaLabel, type, className, isDisabled };
    const optionsTooltip = {
      tooltip: (hasTooltip || isDisabled) && !tooltip ? undefined : tooltip,
      kbd: (hasTooltip || isDisabled) && !kbd ? undefined : kbd,
      container,
      placement,
      offset,
    };

    return (
      <Tooltip options={optionsTooltip}>
        <Button
          options={optionsButton}
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
