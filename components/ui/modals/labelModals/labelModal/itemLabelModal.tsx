import { DisableButton } from '@buttons/disableButton';
import { Types } from '@lib/types';
import { Fragment } from 'react';
import { LabelModal } from '.';
import { optionsButtonLabelModalUpdateLabel } from '@options/button';
import { KeysWithLabelModalEffect } from '@effects/keysWithLabelModalEffect';
import { useLabelUpdateItem } from '@hooks/labels';
import { useConditionCompareLabelItemsEqual } from '@hooks/misc';

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
