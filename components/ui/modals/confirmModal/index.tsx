import { Button as CancelButton } from '@buttons/button';
import { IconButton as CloseIconButton } from '@buttons/iconButton';
import { optionsButtonConfirmModalCancelIcon, optionsButtonConfirmModalCancel } from '@data/dataOptions';
import { useModalConfirmStateCancel } from '@states/modals/hooks';
import { Types } from 'lib/types';
import { Fragment as ConfirmModalFragment, useRef } from 'react';
import { ModalTransitionChild } from '../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../modal/modalTransition/modalTransitionRoot';

type Props = Pick<Types, 'show' | 'headerContents' | 'headerIcons' | 'footerButtons'> &
  Partial<Pick<Types, 'children' | 'itemIds' | 'show' | 'initialFocus' | 'iconBgColor' | 'children'>>;

export const ConfirmModal = ({ itemIds, ...props }: Props) => {
  const cancelConfirmModal = useModalConfirmStateCancel(itemIds?._id);
  const initialFocusButton = props.initialFocus && useRef<HTMLButtonElement>(null);

  return (
    <ConfirmModalFragment>
      <ModalTransitionRoot
        show={props.show}
        initialFocus={props.initialFocus ? props.initialFocus : initialFocusButton}
        onClose={() => cancelConfirmModal()}>
        <ModalTransitionChild>
          <div>
            <div className='absolute top-0 right-0 hidden pt-2.5 pr-2.5 sm:block'>
              <CloseIconButton
                options={optionsButtonConfirmModalCancelIcon}
                onClick={() => cancelConfirmModal()}
              />
            </div>
            <div className='sm:flex sm:items-start'>
              <div
                className={`mx-auto mb-2 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full sm:my-2 sm:mx-0 sm:h-14 sm:w-14 ${
                  props.iconBgColor || 'bg-red-100'
                }`}>
                {props.headerIcons}
              </div>
              <div className='space-y-2 text-center sm:mt-1 sm:ml-4 sm:text-left'>{props.headerContents}</div>
            </div>
          </div>
          <div className='mt-8 flex justify-end'>
            <CancelButton
              options={optionsButtonConfirmModalCancel}
              onClick={() => cancelConfirmModal()}
              ref={props.initialFocus ? null : initialFocusButton}>
              Cancel
            </CancelButton>
            {props.footerButtons}
          </div>
        </ModalTransitionChild>
      </ModalTransitionRoot>
      {props.children}
    </ConfirmModalFragment>
  );
};
