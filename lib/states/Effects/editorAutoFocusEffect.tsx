import { CATCH_MODAL } from '@data/stateObjects';
import { CustomEditor } from '@lib/types/typesSlate';
import { atomCatch } from '@states/utilsStates';
import { Types } from 'lib/types';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const EditorAutoFocusEffect = ({
  autoFocus,
  editor,
}: {
  autoFocus: Types['autoFocus'];
  editor: CustomEditor;
}) => {
  const isCatchConfirmModal = useRecoilValue(atomCatch(CATCH_MODAL.confirmModal));

  useEffect(() => {
    ReactEditor.blur(editor);

    if (!autoFocus || isCatchConfirmModal) return;

    setTimeout(() => {
      ReactEditor.focus(editor);
      Transforms.select(editor, { path: Path.next([0, 0]), offset: 0 });
    }, 100);
  }, [autoFocus, editor, isCatchConfirmModal]);

  return null;
};
