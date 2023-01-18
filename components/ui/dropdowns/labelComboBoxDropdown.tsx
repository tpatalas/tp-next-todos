import { dataDropdownComboBox } from '@data/dataObjects';
import { Types } from '@lib/types';
import { LabelComboBox } from '@ui/comboBoxes/labelComboBox';
import {
  Fragment as HeaderContentFragment,
  Fragment as LabelComboBoxDropdownFragment,
} from 'react';
import { Dropdown } from './dropdown';

type Props = Partial<Pick<Types, 'todo'>>;

export const LabelComboBoxDropdown = ({ todo }: Props) => {
  return (
    <LabelComboBoxDropdownFragment>
      <Dropdown
        data={dataDropdownComboBox}
        headerContents={<HeaderContentFragment>Label</HeaderContentFragment>}>
        <LabelComboBox todo={todo} />
      </Dropdown>
    </LabelComboBoxDropdownFragment>
  );
};
