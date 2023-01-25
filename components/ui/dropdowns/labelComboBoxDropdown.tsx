import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { IconButton } from '@buttons/iconButton';
import { dataDropdownComboBox } from '@data/dataObjects';
import { ICON_CLOSE } from '@data/materialSymbols';
import { Types } from '@lib/types';
import { selectorSelectedLabels } from '@states/labels';
import { useRemoveTitleId } from '@states/labels/hooks';
import { useTodoModalStateClose } from '@states/modals/hooks';
import { classNames, paths } from '@states/utils';
import { useHorizontalScrollPosition } from '@states/utils/hooks';
import { LabelComboBox } from '@ui/comboBoxes/labelComboBox';
import {
  Fragment as GradientLeftFragment,
  Fragment as GradientRightFragment,
  Fragment as LabelComboBoxDropdownFragment,
  useRef,
} from 'react';
import { useRecoilValue } from 'recoil';
import { Dropdown } from './dropdown';

type Props = Partial<Pick<Types, 'todo'>>;

export const LabelComboBoxDropdown = ({ todo }: Props) => {
  const selectedLabels = useRecoilValue(selectorSelectedLabels(todo?._id));
  const removeTitleId = useRemoveTitleId(todo?._id);
  const closeTodoModal = useTodoModalStateClose(todo?._id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { leftPosition, rightPosition, isOverflow } = useHorizontalScrollPosition(scrollRef);

  return (
    <LabelComboBoxDropdownFragment>
      <div className='relative flex w-full max-w-[27rem] flex-row'>
        <GradientLeftFragment>
          <div
            className={classNames(
              'absolute left-0 top-1/2 ml-2 block h-[calc(100%-20%)] w-10 -translate-y-2/4 bg-gradient-to-r',
              leftPosition > 0 &&
                'from-white group-hover/focuser:from-slate-100 group-focus/focuser:from-blue-100',
            )}
          />
        </GradientLeftFragment>
        <div
          className='scrollbar-hide ml-1 flex flex-row items-center justify-start overflow-x-auto py-1 px-1'
          ref={scrollRef}>
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
                    'mx-[0.12rem] flex cursor-pointer flex-row items-center justify-center rounded-lg py-[3px] pl-2 pr-1 text-sm text-gray-700',
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
        <GradientRightFragment>
          <div
            className={classNames(
              'absolute right-0 top-1/2 block h-[calc(100%-20%)] w-5 -translate-y-2/4 bg-gradient-to-l',
              isOverflow && rightPosition !== 0
                ? 'from-white group-hover/focuser:from-slate-100 group-focus/focuser:from-blue-100'
                : 'from-transparent group-hover/focuser:from-transparent group-focus/focuser:from-transparent',
            )}
          />
        </GradientRightFragment>
      </div>
    </LabelComboBoxDropdownFragment>
  );
};
