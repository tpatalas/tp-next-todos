import { ICON_DELETE, ICON_EDIT_NOTE, ICON_MORE_VERT } from '@data/materialSymbols';
import { ActiveDropdownMenuItemEffect } from '@effects/activeDropdownMenuItemEffect';
import { TypesDataDropdown } from '@lib/types/typesData';
import { useLabelStateRemove } from '@states/labelStates';
import { useLabelModalStateOpen } from '@states/modalStates';
import { Types } from 'lib/types';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';

type Props = { data: TypesDataDropdown } & Pick<Types, 'label'>;

export const LabelItemDropdown = ({ label, data: { initialVisible } }: Props) => {
  const openModal = useLabelModalStateOpen(label?._id);
  const removeLabel = useLabelStateRemove(label._id);

  return (
    <Dropdown
      data={{
        tooltip: 'Menu',
        path: ICON_MORE_VERT,
        padding: 'p-2',
        color: 'fill-gray-500 group-hover:fill-gray-700',
        hoverBg: 'hover:bg-gray-200',
        initialVisible: initialVisible,
      }}>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      <div className='py-1'>
        <DropdownMenuItem
          onClick={() => openModal()}
          path={ICON_EDIT_NOTE}
          tooltip='Edit'>
          Edit label
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          onClick={() => removeLabel()}
          path={ICON_DELETE}
          tooltip='Delete'>
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
