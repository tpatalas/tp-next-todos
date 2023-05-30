import { ICON_DELETE, ICON_EDIT_NOTE } from '@data/materialSymbols';
import { Types } from 'lib/types';
import { optionsDropdownLabelItem } from '@options/misc';
import { ActiveDropdownMenuItemEffect } from '@effects/activeDropdownMenuItemEffect';
import { useLabelModalStateOpen } from '@hooks/modals';
import { TypesOptionsDropdown } from '@lib/types/options';
import { TypesLabel } from '@label/label.types';
import { useLabelRemoveItem } from '@label/label.hooks';
import { Dropdown } from '@dropdowns/v1/dropdown';
import { DropdownMenuItem } from '@dropdowns/v1/dropdown/dropdownMenuItem';

type Props = { options: TypesOptionsDropdown } & Pick<TypesLabel, 'label'> &
  Partial<Pick<Types, 'menuContentOnClose'>>;

export const LabelItemDropdown = ({ label, options, menuContentOnClose }: Props) => {
  const openModal = useLabelModalStateOpen(label?._id);
  const removeLabel = useLabelRemoveItem(label._id);

  return (
    <Dropdown
      options={{ hoverBg: options.hoverBg, isInitiallyVisible: false, ...optionsDropdownLabelItem }}
      menuContentOnClose={menuContentOnClose}
    >
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      <div className='py-1'>
        <DropdownMenuItem
          options={{
            shouldKeepOpeningOnClick: false,
            path: ICON_EDIT_NOTE,
            tooltip: 'Edit',
          }}
          onClick={() => openModal()}
        >
          Edit label
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          options={{
            shouldKeepOpeningOnClick: false,
            path: ICON_DELETE,
            tooltip: 'Delete',
          }}
          onClick={() => removeLabel()}
        >
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
