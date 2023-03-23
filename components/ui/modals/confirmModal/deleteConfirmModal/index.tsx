import { Button as ConfirmButton } from '@buttons/button';
import { Types } from '@lib/types';
import { HeaderDescription } from '@modals/modal/modalHeaders/headerDescription';
import { HeaderTitle } from '@modals/modal/modalHeaders/headerTitle';
import { optionsButtonConfirmModalDelete } from '@options/button';
import { optionsSvgConfirmModalDelete } from '@options/svg';
import dynamic from 'next/dynamic';
import { Fragment as DeleteHeaderContentFragment, Fragment as HeaderContentFragment, useRef } from 'react';
const ConfirmModal = dynamic(() => import('..').then((mod) => mod.ConfirmModal));
const SvgIcon = dynamic(() => import('@components/icons/svgIcon').then((mod) => mod.SvgIcon));

type Props = Pick<Types, 'onClickConfirm' | 'show' | 'deletingItem'> & Partial<Pick<Types, 'itemIds'>>;

export const DeleteConfirmModal = ({ itemIds, onClickConfirm, show, deletingItem }: Props) => {
  const initialFocusButton = useRef<HTMLButtonElement>(null);

  return (
    <ConfirmModal
      itemIds={itemIds}
      show={show}
      initialFocus={initialFocusButton}
      headerIcons={<SvgIcon options={optionsSvgConfirmModalDelete} />}
      menuButtonContent={
        <HeaderContentFragment>
          <HeaderTitle>Delete item</HeaderTitle>
          <HeaderDescription>
            <DeleteHeaderContentFragment>
              Are you Sure you want to delete the following item?
              <span className='mt-2 break-words text-center line-clamp-2 sm:max-w-sm sm:text-left'>
                <strong>{deletingItem}</strong>
              </span>
            </DeleteHeaderContentFragment>
          </HeaderDescription>
        </HeaderContentFragment>
      }
      footerButtons={
        <ConfirmButton
          options={optionsButtonConfirmModalDelete}
          onClick={onClickConfirm}
          ref={initialFocusButton}>
          Delete
        </ConfirmButton>
      }
    />
  );
};
