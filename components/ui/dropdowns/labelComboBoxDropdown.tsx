import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { IconButton } from '@buttons/iconButton';
import { dataDropdownComboBox } from '@data/dataObjects';
import { ICON_CLOSE } from '@data/materialSymbols';
import { Types } from '@lib/types';
import { selectorSelectedLabels } from '@states/labels';
import { useRemoveTitleId } from '@states/labels/hooks';
import { useTodoModalStateClose } from '@states/modals/hooks';
import { classNames, paths } from '@states/utils';
import { LabelComboBox } from '@ui/comboBoxes/labelComboBox';
import { Fragment as LabelComboBoxDropdownFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';

type Props = Partial<Pick<Types, 'todo'>>;

export const LabelComboBoxDropdown = ({ todo }: Props) => {
  const selectedLabels = useRecoilValue(selectorSelectedLabels(todo?._id));
  const removeTitleId = useRemoveTitleId(todo?._id);
  const closeTodoModal = useTodoModalStateClose(todo?._id);

  return (
    <LabelComboBoxDropdownFragment>
      <div className='flex flex-row items-center justify-start overflow-x-auto px-1 pt-1 pb-2'>
        <Dropdown
          data={dataDropdownComboBox}
          headerContents={selectedLabels.length === 0 && 'Label'}>
          <LabelComboBox todo={todo} />
        </Dropdown>
        <ul className='flex flex-row items-center justify-center'>
          {selectedLabels.map((label) => (
            <li key={label._id}>
              <div
                className={classNames(
                  'ml-1 flex cursor-pointer flex-row items-center justify-center rounded-lg py-[3px] pl-2 pr-1 text-sm text-gray-700',
                  label.color && label.color,
                  'bg-opacity-40 hover:bg-opacity-60',
                )}>
                <PrefetchRouterButton
                  path={paths('/app/label/', label._id)}
                  className='max-w-[5.3rem] truncate pr-1'
                  tooltip={label.name}
                  onClick={() => closeTodoModal()}>
                  {label.name}
                </PrefetchRouterButton>
                <IconButton
                  data={{
                    path: ICON_CLOSE,
                    padding: 'p-[2px]',
                    hoverBg: 'hover:bg-gray-900 hover:bg-opacity-10',
                    size: 'h-4 w-4',
                    color: 'fill-gray-700 hover:fill-gray-900',
                    container: 'h-5',
                  }}
                  onClick={() => removeTitleId(label._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </LabelComboBoxDropdownFragment>
  );
};
