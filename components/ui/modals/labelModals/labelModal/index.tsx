import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import { atomLabelModalOpen } from '@states/modals';
import { Types } from 'lib/types';
import { Fragment as LabelModalFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  optionsButtonTodoModalClose,
  optionsButtonTodoModalCancel,
  optionsButtonLabelModalAddLabel,
} from '@options/button';
import { useConditionCheckLabelTitleEmpty } from '@hooks/misc';
import { useLabelModalStateClose } from '@hooks/modals';
import { ModalTransitionChild } from '@modals/modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '@modals/modal/modalTransition/modalTransitionRoot';
import { Button } from '@buttons/button';
import { classNames } from '@stateLogics/utils';
import { KeysWithLabelModalEffect } from '@effects/KeysWithLabelModalEffect';
import { DividerX } from '@ui/dividers/dividerX';
import { atomLabelNew, atomSelectorLabelItem } from '@label/label.states';
import { TypesLabel } from '@label/label.types';
import { useLabelValueUpdate, useLabelAdd } from '@label/label.hooks';

type Props = Partial<
  Pick<Types, 'children' | 'menuButtonContent' | 'footerButtons' | 'headerButtons'> &
    Pick<TypesLabel, 'label'>
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
  const atomLabel = typeof label === 'undefined' ? atomLabelNew : atomSelectorLabelItem(label._id);
  const labelItem = useRecoilValue(atomLabel);
  const updateLabelItem = useLabelValueUpdate(label);
  const addLabel = useLabelAdd();
  const condition = useConditionCheckLabelTitleEmpty();

  return (
    <LabelModalFragment>
      <ModalTransitionRoot
        show={isLabelModalOpen}
        initialFocus={initialFocusInput}
        onClose={() => closeModal()}
      >
        <ModalTransitionChild className='h-40 px-2 pb-4 pt-2 sm:relative sm:bottom-24 sm:h-40 sm:max-w-lg'>
          <div className='flex flex-row items-center justify-between sm:inline-block'>
            <div className='flex w-full flex-row items-center justify-between pl-3 text-base font-semibold text-gray-600 will-change-transform sm:mb-1'>
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
          <div className='h-full w-full overflow-auto pl-2 pr-3'>
            <input
              className={classNames(
                'w-full rounded-lg border-0 bg-transparent py-1 pl-2 outline-none will-change-transform focus:ring-0 focus:ring-offset-0',
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
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            {footerButtons || (
              <DisableButton
                isConditionalRendering={condition}
                options={optionsButtonLabelModalAddLabel}
                onClick={() => addLabel()}
              >
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
