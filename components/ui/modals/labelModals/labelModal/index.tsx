import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import {
  dataButtonTodoModalAddTodo,
  dataButtonTodoModalCancel,
  dataButtonTodoModalClose,
} from '@data/dataObjects';
import { atomLabelModalOpen, useLabelModalStateClose } from '@states/modalStates';
import { Types } from 'lib/types';
import { Fragment as LabelModalFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Button as CancelButton } from '../../../buttons/button';
import { Divider as PlainLineDivider } from '../../../dividers/divider';
import { ModalTransitionChild } from '../../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../../modal/modalTransition/modalTransitionRoot';

type Props = Partial<
  Pick<Types, 'todo' | 'children' | 'headerContents' | 'footerButtons' | 'headerButtons'>
>;

export const LabelModal = ({
  headerContents = 'Create New Label',
  footerButtons,
  children,
}: Props) => {
  const isLabelModalOpen = useRecoilValue(atomLabelModalOpen(undefined));
  const closeModal = useLabelModalStateClose(undefined);
  const initialFocusDiv = useRef<HTMLDivElement>(null);

  return (
    <LabelModalFragment>
      <ModalTransitionRoot
        show={isLabelModalOpen}
        initialFocus={initialFocusDiv}
        onClose={() => closeModal()}>
        <ModalTransitionChild className='h-40 px-2 pt-2 pb-4 sm:relative sm:bottom-24 sm:h-40 sm:max-w-lg'>
          <div className='flex flex-row items-center justify-between sm:inline-block'>
            <div
              ref={initialFocusDiv}
              className='flex flex-row items-center justify-between pl-2 text-base font-semibold text-gray-600 sm:mb-1 '>
              {headerContents}
              <IconButton
                data={dataButtonTodoModalClose}
                onClick={() => closeModal()}
              />
            </div>
            <div className='hidden sm:mb-3 sm:block'>
              <PlainLineDivider />
            </div>
          </div>
          <div className='h-full w-full overflow-scroll pl-2'>
            <input
              placeholder='Enter Label'
              value=''
            />
          </div>
          <div className='flex flex-row justify-end pt-4'>
            <CancelButton
              data={dataButtonTodoModalCancel}
              onClick={() => closeModal()}>
              Cancel
            </CancelButton>
            {footerButtons || (
              <DisableButton
                data={dataButtonTodoModalAddTodo}
                // onClick={() => addTodo()}
              >
                Add Label
              </DisableButton>
            )}
          </div>
        </ModalTransitionChild>
      </ModalTransitionRoot>
      {children}
    </LabelModalFragment>
  );
};
