import { Button as CancelButton } from '@buttons/button';
import { IconButton as CloseIconButton } from '@buttons/iconButton';
import { Types } from 'lib/types';
import { Fragment as ConfirmModalFragment, useRef } from 'react';
import { ModalTransitionChild } from '../modal/modalTransition/modalTransitionChild';
import { ModalTransitionRoot } from '../modal/modalTransition/modalTransitionRoot';
import { optionsButtonConfirmModalCancelIcon, optionsButtonConfirmModalCancel } from '@options/button';
import { useModalConfirmStateCancel } from '@hooks/modals';

type Props = Pick<Types, 'show' | 'menuButtonContent' | 'headerIcons' | 'footerButtons'> &
  Partial<Pick<Types, 'children' | 'itemIds' | 'show' | 'initialFocus' | 'iconBgColor' | 'children'>>;

export const ConfirmModal = ({ itemIds, ...props }: Props) => {
  const cancelConfirmModal = useModalConfirmStateCancel(itemIds?._id);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const initialFocusButton = props.initialFocus && initialFocusRef;

  return (
    <ConfirmModalFragment>
      <ModalTransitionRoot
        show={props.show}
        initialFocus={props.initialFocus ? props.initialFocus : initialFocusButton}
        onClose={() => cancelConfirmModal()}
      >
        <ModalTransitionChild>
          <div>
            <div className='absolute right-0 top-0 hidden pr-2.5 pt-2.5 sm:block'>
              <CloseIconButton
                options={optionsButtonConfirmModalCancelIcon}
                onClick={() => cancelConfirmModal()}
              />
            </div>
            <div className='sm:flex sm:items-start'>
              <div
                className={`mx-auto mb-2 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:my-2 sm:h-14 sm:w-14 ${
                  props.iconBgColor || 'bg-red-100'
                }`}
              >
                {props.headerIcons}
              </div>
              <div className='space-y-2 text-center sm:ml-4 sm:mt-1 sm:text-left'>
                {props.menuButtonContent}
              </div>
            </div>
          </div>
          <div className='mt-8 flex justify-end'>
            <CancelButton
              options={optionsButtonConfirmModalCancel}
              onClick={() => cancelConfirmModal()}
              ref={props.initialFocus ? null : initialFocusButton}
            >
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
