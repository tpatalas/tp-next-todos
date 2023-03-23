import { DisableButton } from '@buttons/disableButton';
import { Types } from '@lib/types';
import { useLabelUpdateItem } from '@states/labels/hooks';
import { useConditionCompareLabelItemsEqual } from '@states/utils/hooks';
import { Fragment } from 'react';
import { LabelModal } from '.';
import { KeysWithLabelModalEffect } from '@lib/stateLogics/effects/keybindings/KeysWithLabelModalEffect';
import { optionsButtonLabelModalUpdateLabel } from '@options/button';

export const ItemLabelModal = ({ label }: Pick<Types, 'label'>) => {
  const updateLabel = useLabelUpdateItem(label._id);
  const condition = useConditionCompareLabelItemsEqual(label._id);

  return (
    <Fragment>
      <LabelModal
        label={label}
        menuButtonContent='Update label'
        footerButtons={
          <DisableButton
            options={optionsButtonLabelModalUpdateLabel}
            isConditionalRendering={condition}
            onClick={() => updateLabel()}>
            Update
          </DisableButton>
        }>
        <KeysWithLabelModalEffect label={label} />
      </LabelModal>
    </Fragment>
  );
};
