import { DisableButton } from '@buttons/disableButton';
import { KeysWithLabelModalEffect } from '@effects/KeysWithLabelModalEffect';
import { useLabelUpdateItem } from '@hooks/labels';
import { useConditionCompareLabelItemsEqual } from '@hooks/misc';
import { TypesLabel } from '@label/label.types';
import { optionsButtonLabelModalUpdateLabel } from '@options/button';
import { Fragment } from 'react';
import { LabelModal } from '.';

export const ItemLabelModal = ({ label }: Pick<TypesLabel, 'label'>) => {
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
            onClick={() => updateLabel()}
          >
            Update
          </DisableButton>
        }
      >
        <KeysWithLabelModalEffect label={label} />
      </LabelModal>
    </Fragment>
  );
};
