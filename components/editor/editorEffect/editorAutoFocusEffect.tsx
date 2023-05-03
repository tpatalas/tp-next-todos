import { PATH_APP } from '@constAssertions/data';
import { CATCH } from '@constAssertions/misc';
import { TypesPropsAuthFocusEffect } from '@editor/editor.types';
import { atomCatch } from '@states/misc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const EditorAutoFocusEffect = ({ isAutoFocus, editor }: TypesPropsAuthFocusEffect) => {
  const router = useRouter();
  const completedPath = router.asPath === PATH_APP['completed'];
  const isCatchConfirmModal = useRecoilValue(atomCatch(CATCH.confirmModal));

  useEffect(() => {
    ReactEditor.blur(editor);

    if (!isAutoFocus || isCatchConfirmModal || completedPath) return;

    ReactEditor.focus(editor);
    Transforms.select(editor, Editor.end(editor, []));
  }, [isAutoFocus, completedPath, editor, isCatchConfirmModal]);

  return null;
};
