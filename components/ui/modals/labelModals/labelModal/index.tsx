import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import {
  dataButtonLabelModalAddLabel,
  dataButtonTodoModalCancel,
  dataButtonTodoModalClose,
} from '@data/dataObjects';
import { classNames } from '@lib/utils';
import { atomLabelNew, useLabelStateAdd } from '@states/labelStates';
import { atomLabelModalOpen, useLabelModalStateClose } from '@states/modalStates';
import ObjectID from 'bson-objectid';
import { Types } from 'lib/types';
import { Fragment as LabelModalFragment, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  const initialFocusDiv = useRef<HTMLInputElement>(null);
  const labelItem = useRecoilValue(atomLabelNew);
  const setLabelItem = useSetRecoilState(atomLabelNew);
  const addLabel = useLabelStateAdd();

  return (
    <LabelModalFragment>
      <ModalTransitionRoot
        show={isLabelModalOpen}
        initialFocus={initialFocusDiv}
        onClose={() => closeModal()}>
        <ModalTransitionChild className='h-40 px-2 pt-2 pb-4 sm:relative sm:bottom-24 sm:h-40 sm:max-w-lg'>
          <div className='flex flex-row items-center justify-between sm:inline-block'>
            <div className='flex flex-row items-center justify-between pl-2 text-base font-semibold text-gray-600 sm:mb-1 '>
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
              className={classNames('border-0 pl-2 outline-none focus:ring-0 focus:ring-offset-0')}
              placeholder='Enter new label'
              type='text'
              name='label'
              value={labelItem.name}
              onChange={(event) =>
                setLabelItem({
                  ...labelItem,
                  name: event.target.value,
                  _id: ObjectID().toHexString(),
                })
              }
              ref={initialFocusDiv}
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
                data={dataButtonLabelModalAddLabel}
                onClick={() => addLabel()}>
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
