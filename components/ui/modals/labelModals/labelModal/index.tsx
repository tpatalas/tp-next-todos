import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import { optionsButtonTodoModalClose, optionsButtonTodoModalCancel, optionsButtonLabelModalAddLabel } from '@data/dataOptions';
import { KeysWithLabelModalEffect } from '@states/keybinds/KeysWithLabelModalEffect';
import { atomLabelNew, atomSelectorLabelItem } from '@states/labels';
import { useLabelValueUpdate, useLabelAdd } from '@states/labels/hooks';
import { atomLabelModalOpen } from '@states/modals';
import { useLabelModalStateClose } from '@states/modals/hooks';
import { classNames } from '@states/utils';
import { useConditionCheckLabelTitleEmpty } from '@states/utils/hooks';
import { Types } from 'lib/types';
import { Fragment as LabelModalFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Button as CancelButton } from '../../../buttons/button';
import { Divider as PlainLineDivider } from '../../../dividers/divider';
import { ModalTransitionChild } from '../../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../../modal/modalTransition/modalTransitionRoot';

type Props = Partial<Pick<Types, 'label' | 'children' | 'headerContents' | 'footerButtons' | 'headerButtons'>>;

export const LabelModal = ({ label, footerButtons, children, headerContents = 'Create new label' }: Props) => {
  const isLabelModalOpen = useRecoilValue(atomLabelModalOpen(label?._id));
  const closeModal = useLabelModalStateClose(label?._id);
  const initialFocusInput = useRef<HTMLInputElement>(null);
  const labelItem =
    typeof label === 'undefined' ? useRecoilValue(atomLabelNew) : useRecoilValue(atomSelectorLabelItem(label._id));
  const updateLabelItem = useLabelValueUpdate(label);
  const addLabel = useLabelAdd();
  const condition = useConditionCheckLabelTitleEmpty();

  return (
    <LabelModalFragment>
      <ModalTransitionRoot
        show={isLabelModalOpen}
        initialFocus={initialFocusInput}
        onClose={() => closeModal()}>
        <ModalTransitionChild className='h-40 px-2 pt-2 pb-4 sm:relative sm:bottom-24 sm:h-40 sm:max-w-lg'>
          <div className='flex flex-row items-center justify-between sm:inline-block'>
            <div className='flex w-full flex-row items-center justify-between pl-3 text-base font-semibold text-gray-600 sm:mb-1 '>
              {headerContents}
              <IconButton
                options={optionsButtonTodoModalClose}
                onClick={() => closeModal()}
              />
            </div>
            <div className='hidden sm:mb-3 sm:block'>
              <PlainLineDivider />
            </div>
          </div>
          <div className='h-full w-full overflow-scroll pl-2 pr-3'>
            <input
              className={classNames(
                'w-full rounded-lg border-0 py-1 pl-2 outline-none focus:ring-0 focus:ring-offset-0',
              )}
              placeholder='Enter new label'
              type='text'
              name='label'
              value={labelItem.name}
              onChange={(event) => updateLabelItem(event.target.value)}
              ref={initialFocusInput}
            />
          </div>
          <div className='flex flex-row justify-end pt-4'>
            <CancelButton
              options={optionsButtonTodoModalCancel}
              onClick={() => closeModal()}>
              Cancel
            </CancelButton>
            {footerButtons || (
              <DisableButton
                isConditionalRendering={condition}
                options={optionsButtonLabelModalAddLabel}
                onClick={() => addLabel()}>
                Add Label
              </DisableButton>
            )}
          </div>
        </ModalTransitionChild>
      </ModalTransitionRoot>
      {children}
      <KeysWithLabelModalEffect label={label} />
    </LabelModalFragment>
  );
};
