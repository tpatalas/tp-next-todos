import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import { atomLabelNew, atomSelectorLabelItem } from '@states/labels';
import { atomLabelModalOpen } from '@states/modals';
import { Types } from 'lib/types';
import { Fragment as LabelModalFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  optionsButtonTodoModalClose,
  optionsButtonTodoModalCancel,
  optionsButtonLabelModalAddLabel,
} from '@options/button';
import { useLabelValueUpdate, useLabelAdd } from '@hooks/labels';
import { useConditionCheckLabelTitleEmpty } from '@hooks/misc';
import { useLabelModalStateClose } from '@hooks/modals';
import { ModalTransitionChild } from '@modals/modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '@modals/modal/modalTransition/modalTransitionRoot';
import { Button } from '@buttons/button';
import { classNames } from '@stateLogics/utils';
import { KeysWithLabelModalEffect } from '@effects/keysWithLabelModalEffect';
import { DividerX } from '@ui/dividers/dividerX';

type Props = Partial<
  Pick<Types, 'label' | 'children' | 'menuButtonContent' | 'footerButtons' | 'headerButtons'>
>;

export const LabelModal = ({
  label,
  footerButtons,
  children,
  menuButtonContent = 'Create new label',
}: Props) => {
  const isLabelModalOpen = useRecoilValue(atomLabelModalOpen(label?._id));
  const closeModal = useLabelModalStateClose(label?._id);
  const initialFocusInput = useRef<HTMLInputElement>(null);
  const labelItem =
    typeof label === 'undefined'
      ? useRecoilValue(atomLabelNew)
      : useRecoilValue(atomSelectorLabelItem(label._id));
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
              {menuButtonContent}
              <IconButton
                options={optionsButtonTodoModalClose}
                onClick={() => closeModal()}
              />
            </div>
            <div className='hidden sm:mb-3 sm:block'>
              <DividerX />
            </div>
          </div>
          <div className='h-full w-full overflow-scroll pl-2 pr-3'>
            <input
              className={classNames(
                'w-full rounded-lg border-0 bg-transparent py-1 pl-2 outline-none focus:ring-0 focus:ring-offset-0',
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
            <Button
              options={optionsButtonTodoModalCancel}
              onClick={() => closeModal()}>
              Cancel
            </Button>
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
