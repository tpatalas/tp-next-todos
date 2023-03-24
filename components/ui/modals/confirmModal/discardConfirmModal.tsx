import { Button as ConfirmButton } from '@buttons/button';
import { useTodoModalConfirmStateDiscard } from '@hooks/modals';
import { Types } from '@lib/types';
import { HeaderDescription } from '@modals/modal/modalHeaders/headerDescription';
import { HeaderTitle } from '@modals/modal/modalHeaders/headerTitle';
import { optionsButtonConfirmModalDiscard } from '@options/button';
import { optionsSvgConfirmModalHeaderIcon } from '@options/svg';
import { atomConfirmModalDiscard } from '@states/modals';
import dynamic from 'next/dynamic';
import { Fragment as DiscardHeaderContentFragment, Fragment as HeaderContentFragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
const ConfirmModal = dynamic(() => import('.').then((mod) => mod.ConfirmModal));
const SvgIcon = dynamic(() => import('@components/icons/svgIcon').then((mod) => mod.SvgIcon));

export const DiscardConfirmModal = ({ todo }: Partial<Pick<Types, 'todo'>>) => {
  const discardConfirmModal = useTodoModalConfirmStateDiscard(todo?._id);
  const isConfirmModalOpen = useRecoilValue(atomConfirmModalDiscard(todo?._id));
  const initialFocusButton = useRef<HTMLButtonElement>(null);

  return (
    <ConfirmModal
      show={isConfirmModalOpen}
      initialFocus={initialFocusButton}
      itemIds={todo}
      headerIcons={<SvgIcon options={optionsSvgConfirmModalHeaderIcon} />}
      menuButtonContent={
        <HeaderContentFragment>
          <HeaderTitle>Discard changes</HeaderTitle>
          <HeaderDescription>
            <DiscardHeaderContentFragment>Are you Sure you want to discard your changes?</DiscardHeaderContentFragment>
          </HeaderDescription>
        </HeaderContentFragment>
      }
      footerButtons={
        <ConfirmButton
          options={optionsButtonConfirmModalDiscard}
          onClick={() => discardConfirmModal()}
          ref={initialFocusButton}>
          Discard
        </ConfirmButton>
      }
    />
  );
};
