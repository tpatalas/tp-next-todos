import { Button as ConfirmButton } from '@buttons/button';
import { Span as SpanTodoItemTitle } from '@containers/span';
import { dataButtonConfirmModalDelete, dataSvgConfirmModalDelete } from '@data/dataObjects';
import { useModalConfirmStateDelete } from '@hooks/useModals';
import { useAsyncTodoItem } from '@hooks/useTodos';
import { Types } from '@lib/types';
import { HeaderDescription } from '@modals/modal/modalHeaders/headerDescription';
import { HeaderTitle } from '@modals/modal/modalHeaders/headerTitle';
import { atomConfirmModalDelete } from '@states/atoms';
import dynamic from 'next/dynamic';
import { Fragment as DeleteHeaderContentFragment, Fragment as HeaderContentFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
const ConfirmModal = dynamic(() => import('.').then((mod) => mod.ConfirmModal));
const SvgIcon = dynamic(() => import('@components/icons/svgIcon').then((mod) => mod.SvgIcon));

export const DeleteConfirmModal = ({ todo }: Partial<Pick<Types, 'todo'>>) => {
  const deleteConfirmModal = useModalConfirmStateDelete(todo?._id);
  const isConfirmModalOpen = useRecoilValue(atomConfirmModalDelete(todo?._id));
  const initialFocusButton = useRef<HTMLButtonElement>(null);
  const todoItem = useAsyncTodoItem(todo?._id);

  return (
    <ConfirmModal
      todo={todo}
      show={isConfirmModalOpen}
      initialFocus={initialFocusButton}
      headerIcons={<SvgIcon data={dataSvgConfirmModalDelete} />}
      headerContents={
        <HeaderContentFragment>
          <HeaderTitle>Delete item</HeaderTitle>
          <HeaderDescription>
            <DeleteHeaderContentFragment>
              Are you Sure you want to delete the following item?
              <SpanTodoItemTitle className='mt-2 break-words text-center line-clamp-2 sm:max-w-sm sm:text-left'>
                <strong>{todoItem().title}</strong>
              </SpanTodoItemTitle>
            </DeleteHeaderContentFragment>
          </HeaderDescription>
        </HeaderContentFragment>
      }
      footerButtons={
        <ConfirmButton
          data={dataButtonConfirmModalDelete}
          onClick={() => deleteConfirmModal()}
          ref={initialFocusButton}>
          Delete
        </ConfirmButton>
      }
    />
  );
};
