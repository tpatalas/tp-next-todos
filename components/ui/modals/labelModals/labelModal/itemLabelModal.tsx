import { DisableButton } from '@buttons/disableButton';
import { dataButtonLabelModalUpdateLabel } from '@data/dataObjects';
import { Types } from '@lib/types';
import { useLabelStateUpdate } from '@states/labelStates';
import { Fragment } from 'react';
import { LabelModal } from '.';

export const ItemLabelModal = ({ label }: Pick<Types, 'label'>) => {
  const updateLabel = useLabelStateUpdate(label._id);

  return (
    <Fragment>
      <LabelModal
        label={label}
        headerContents='Update label'
        footerButtons={
          <DisableButton
            data={dataButtonLabelModalUpdateLabel}
            onClick={() => updateLabel()}>
            Update
          </DisableButton>
        }
      />
    </Fragment>
  );
};
