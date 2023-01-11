import { atomQueryLabels } from '@atomQueries/index';
import { Labels, Types } from '@lib/types';
import { atomConfirmModalDelete, useLabelModalConfirmStateDelete } from '@states/modalStates';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

const DeleteConfirmModal = dynamic(() =>
  import('../deleteConfirmModal').then((mod) => mod.DeleteConfirmModal),
);

type Props = Pick<Types, 'label'>;

export const DeleteLabelConfirmModal = ({ label }: Props) => {
  const deleteConfirmModal = useLabelModalConfirmStateDelete(label._id);
  const isConfirmModalOpen = useRecoilValue(atomConfirmModalDelete(label._id));
  const labelItem =
    useRecoilValue(atomQueryLabels).find((item) => item._id === label._id) || ({} as Labels);

  return (
    <Fragment>
      <DeleteConfirmModal
        itemIds={label}
        show={isConfirmModalOpen}
        deletingItem={labelItem.name}
        onClickConfirm={() => deleteConfirmModal()}
      />
    </Fragment>
  );
};
