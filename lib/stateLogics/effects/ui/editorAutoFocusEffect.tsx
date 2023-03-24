import { PATHNAME } from '@constAssertions/data';
import { CATCH } from '@constAssertions/misc';
import { CustomEditor } from '@lib/types/typesSlate';
import { atomCatch } from '@states/utils';
import { Types } from 'lib/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const EditorAutoFocusEffect = ({
  isAutoFocus,
  editor,
}: {
  isAutoFocus: Types['isAutoFocus'];
  editor: CustomEditor;
}) => {
  const router = useRouter();
  const completedPath = router.asPath === PATHNAME['completed'];
  const isCatchConfirmModal = useRecoilValue(atomCatch(CATCH.confirmModal));

  useEffect(() => {
    ReactEditor.blur(editor);

    if (!isAutoFocus || isCatchConfirmModal || completedPath) return;

    ReactEditor.focus(editor);
    Transforms.select(editor, Editor.end(editor, []));
  }, [isAutoFocus, completedPath, editor, isCatchConfirmModal]);

  return null;
};
