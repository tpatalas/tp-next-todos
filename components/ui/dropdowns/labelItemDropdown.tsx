import { optionsDropdownLabelItem } from '@data/dataOptions';
import { ICON_DELETE, ICON_EDIT_NOTE } from '@data/materialSymbols';
import { TypesOptionsDropdown } from '@lib/types/typesOptions';
import { useLabelRemoveItem } from '@states/labels/hooks';
import { ActiveDropdownMenuItemEffect } from '@states/misc/activeDropdownMenuItemEffect';
import { useLabelModalStateOpen } from '@states/modals/hooks';
import { mergeObjects } from '@states/utils';
import { Types } from 'lib/types';
import { Dropdown } from './dropdown';
import { DropdownMenuItem } from './dropdown/dropdownMenuItem';

type Props = { options: TypesOptionsDropdown } & Pick<Types, 'label'> & Partial<Pick<Types, 'headerContentsOnClose'>>;

export const LabelItemDropdown = ({ label, options, headerContentsOnClose }: Props) => {
  const openModal = useLabelModalStateOpen(label?._id);
  const removeLabel = useLabelRemoveItem(label._id);

  return (
    <Dropdown
      options={mergeObjects<TypesOptionsDropdown>(optionsDropdownLabelItem, {
        hoverBg: options.hoverBg,
        isInitiallyVisible: false,
      })}
      headerContentsOnClose={headerContentsOnClose}>
      <ActiveDropdownMenuItemEffect menuItemId={null} />
      {/* give menuItemId any ID: string to activate the keyboard navigation */}
      <div className='py-1'>
        <DropdownMenuItem
          isDisabledCloseOnClick={false}
          onClick={() => openModal()}
          path={ICON_EDIT_NOTE}
          tooltip='Edit'>
          Edit label
        </DropdownMenuItem>
      </div>
      <div className='py-1'>
        <DropdownMenuItem
          isDisabledCloseOnClick={false}
          onClick={() => removeLabel()}
          path={ICON_DELETE}
          tooltip='Delete'>
          Delete
        </DropdownMenuItem>
      </div>
    </Dropdown>
  );
};
