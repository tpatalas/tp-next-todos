import { IconButton } from '@buttons/iconButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { useDataButtonComboboxFilterLabel } from '@data/dataObjectsHooks';
import { ICON_CHECK_BOX_FILL, ICON_CHECK_BOX_OUTLINE_BLANK } from '@data/materialSymbols';
import { STYLE_HOVER_SLATE_LIGHT } from '@data/stylePreset';
import { Combobox } from '@headlessui/react';
import { Labels, Types } from '@lib/types';
import { atomComboBoxQuery } from '@states/comboBoxes';
import { ComboBoxSelectedLabelsEffect } from '@states/comboBoxes/comboBoxSelectedLabelsEffect';
import { useSetFilterLabels } from '@states/comboBoxes/hooks';
import { selectorComboBoxFilteredLabels, selectorSelectedLabels } from '@states/labels';
import { useLabelChangeHandler } from '@states/labels/hooks';
import { useLabelModalStateOpen } from '@states/modals/hooks';
import { classNames } from '@states/utils';
import { Fragment as LabelComboBoxFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { ComboBox } from './comboBox';
import { ComboBoxNewItemButton } from './comboBox/comboBoxNewItemButton';

type Props = Partial<Pick<Types, 'todo' | 'selectedQueryLabels'>>;

export const LabelComboBox = ({ todo }: Props) => {
  const onChangeLabelHandler = useLabelChangeHandler(todo?._id);
  const selectedLabels = useRecoilValue(selectorSelectedLabels(todo?._id));
  const labelModalOpen = useLabelModalStateOpen(undefined);
  const filteredLabels = useRecoilValue(selectorComboBoxFilteredLabels(todo?._id));
  const query = useRecoilValue(atomComboBoxQuery);
  const dataComboBoxInputButton = useDataButtonComboboxFilterLabel(todo?._id);
  const setFilter = useSetFilterLabels(todo?._id);

  return (
    <LabelComboBoxFragment>
      <ComboBox
        selected={selectedLabels}
        onChangeTypeNever={onChangeLabelHandler}
        hasComboBoxBoardStyle={false}
        placeholder={
          selectedLabels.length > 0
            ? 'Labels selected ' + '(' + selectedLabels.length + ')'
            : 'Enter a label'
        }
        comboBoxInputButton={
          <IconButton
            data={dataComboBoxInputButton}
            onClick={() => setFilter()}
          />
        }>
        <Combobox.Options className='relative max-h-60 w-full overflow-auto bg-white py-1 text-base ring-0 ring-transparent focus:outline-none sm:text-sm'>
          {filteredLabels.length === 0 && query !== '' ? (
            <div className='relative cursor-default select-none py-2 px-4 text-gray-500'>
              Nothing found!
            </div>
          ) : (
            filteredLabels.map((label: Labels) => (
              <Combobox.Option
                key={label._id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                    active
                      ? 'gray-text-700 bg-slate-600 bg-opacity-10 font-semibold'
                      : `text-gray-500 ${STYLE_HOVER_SLATE_LIGHT}`
                  }`
                }
                value={label}>
                {({ selected, active }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate fill-gray-300 pl-2',
                        selected ? 'font-medium' : 'font-normal',
                      )}>
                      {label.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 top-[0.15em] left-0 flex items-center pl-3'>
                        <SvgIcon
                          data={{
                            path: ICON_CHECK_BOX_FILL,
                            className: 'h-6 w-6 fill-red-500',
                          }}
                        />
                      </span>
                    ) : (
                      <span className='absolute inset-y-0 left-0 top-[0.15em] flex items-center pl-3'>
                        <SvgIcon
                          data={{
                            path: ICON_CHECK_BOX_OUTLINE_BLANK,
                            className: classNames(
                              'h-6 w-6 opacity-80',
                              active ? 'fill-gray-400' : 'fill-gray-300',
                            ),
                          }}
                        />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
        <ComboBoxNewItemButton
          headerContents='Add new label'
          onClick={() => labelModalOpen()}
        />
      </ComboBox>
      <ComboBoxSelectedLabelsEffect todo={todo} />
    </LabelComboBoxFragment>
  );
};
