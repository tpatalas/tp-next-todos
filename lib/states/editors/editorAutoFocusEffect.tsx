import { CATCH_MODAL, PATHNAME } from '@data/stateObjects';
import { CustomEditor } from '@lib/types/typesSlate';
import { atomCatch } from '@states/utils/states';
import { Types } from 'lib/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const EditorAutoFocusEffect = ({
  autoFocus,
  editor,
}: {
  autoFocus: Types['autoFocus'];
  editor: CustomEditor;
}) => {
  const router = useRouter();
  const completedPath = router.asPath === PATHNAME['completed'];
  const isCatchConfirmModal = useRecoilValue(atomCatch(CATCH_MODAL.confirmModal));

  useEffect(() => {
    ReactEditor.blur(editor);

    if (!autoFocus || isCatchConfirmModal || completedPath) return;

    setTimeout(() => {
      ReactEditor.focus(editor);
      Transforms.select(editor, Editor.end(editor, []));
    }, 100);
  }, [autoFocus, completedPath, editor, isCatchConfirmModal]);

  return null;
};
