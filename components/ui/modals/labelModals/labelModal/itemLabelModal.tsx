import { DisableButton } from '@buttons/disableButton';
import { dataButtonLabelModalUpdateLabel } from '@data/dataObjects';
import { LabelModalWithKeyEffect } from '@effects/labelModalWithKeyEffect';
import { Types } from '@lib/types';
import { useLabelStateUpdate } from '@states/labelStates';
import { useConditionCompareLabelItemsEqual } from '@states/utilsStates';
import { Fragment } from 'react';
import { LabelModal } from '.';

export const ItemLabelModal = ({ label }: Pick<Types, 'label'>) => {
  const updateLabel = useLabelStateUpdate(label._id);
  const condition = useConditionCompareLabelItemsEqual(label._id);

  return (
    <Fragment>
      <LabelModal
        label={label}
        headerContents='Update label'
        footerButtons={
          <DisableButton
            data={dataButtonLabelModalUpdateLabel}
            conditionalRendering={condition}
            onClick={() => updateLabel()}>
            Update
          </DisableButton>
        }>
        <LabelModalWithKeyEffect label={label} />
      </LabelModal>
    </Fragment>
  );
};
