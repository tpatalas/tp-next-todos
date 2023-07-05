import { Dropdown } from '@dropdowns/v1/dropdown';
import { DropdownMenuItem } from '@dropdowns/v1/dropdown/dropdownMenuItem';
import { ActiveDropdownMenuItemEffect } from '@effects/activeDropdownMenuItemEffect';
import { useLabelModalStateOpen } from '@hooks/modals';
import {
  optionsDropdownLabelItem,
  optionsLabelItemDropdownDelete,
  optionsLabelItemDropdownEditLabel,
} from '@label/label.consts';
import { useLabelRemoveItem } from '@label/label.hooks';
import { TypesLabel } from '@label/label.types';
import { TypesOptionsDropdown } from '@lib/types/options';
import { Types } from 'lib/types';

type Props = { options: TypesOptionsDropdown } & Pick<TypesLabel, 'label'> &
  Partial<Pick<Types, 'menuContentOnClose'>>;

export const LabelItemDropdown = ({ label, options, menuContentOnClose }: Props) => {
  const openModal = useLabelModalStateOpen(label?._id);
  const removeLabel = useLabelRemoveItem(label._id);

  return (
    <Dropdown
      options={optionsDropdownLabelItem(options.hoverBg)}
      menuContentOnClose={menuContentOnClose}
    >
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      <div className='py-1'>
        <DropdownMenuItem
          options={optionsLabelItemDropdownEditLabel}
          onClick={() => openModal()}
        >
          Edit label
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          options={optionsLabelItemDropdownDelete}
          onClick={() => removeLabel()}
        >
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
