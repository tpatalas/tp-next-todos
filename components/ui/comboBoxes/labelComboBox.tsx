import { IconButton } from '@buttons/iconButton';
import { ICON_CHECK_BOX_FILL, ICON_CHECK_BOX_OUTLINE_BLANK } from '@data/materialSymbols';
import { STYLE_HOVER_SLATE_LIGHT } from '@data/stylePreset';
import { ComboBoxSelectedLabelsEffect } from '@effects/comboBoxSelectedLabelsEffect';
import { Combobox } from '@headlessui/react';
import { useSetFilterLabels } from '@hooks/comboBoxes';
import { useLabelModalStateOpen } from '@hooks/modals';
import { atomComboBoxQuery } from '@states/comboBoxes';
import { useRecoilValue } from 'recoil';
import { ComboBox } from './comboBox';
import { ComboBoxNewItemButton } from './comboBox/comboBoxNewItemButton';
import { Fragment as LabelComboBoxFragment } from 'react';
import { classNames } from '@stateLogics/utils';
import { SvgIcon } from '@icon/svgIcon';
import { selectorSelectedLabels, selectorComboBoxFilteredLabels } from '@label/label.states';
import { Labels, TypesLabel } from '@label/label.types';
import { useLabelChangeHandler, useDataButtonComboboxFilterLabel } from '@label/label.hooks';
import { TypesTodo } from '@components/todos/todos.types';

type Props = Partial<Pick<TypesTodo, 'todo'> & Pick<TypesLabel, 'selectedQueryLabels'>>;

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
        onChange={onChangeLabelHandler}
        hasComboBoxBoardStyle={false}
        placeholder={
          selectedLabels.length > 0 ? 'Labels selected ' + '(' + selectedLabels.length + ')' : 'Enter a label'
        }
        comboBoxInputButton={
          <IconButton
            options={dataComboBoxInputButton}
            onClick={() => setFilter()}
          />
        }
      >
        <Combobox.Options className='relative max-h-60 w-full overflow-auto bg-slate-50 py-1 text-base ring-0 ring-transparent focus:outline-none sm:text-sm'>
          {filteredLabels.length === 0 && query !== '' ? (
            <div className='relative cursor-default select-none px-4 py-2 text-gray-500'>Nothing found!</div>
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
                value={label}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate fill-gray-300 pl-2',
                        selected ? 'font-medium' : 'font-normal',
                      )}
                    >
                      {label.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 top-[0.15em] flex items-center pl-3'>
                        <SvgIcon
                          options={{
                            path: ICON_CHECK_BOX_FILL,
                            className: 'h-6 w-6 fill-red-500',
                          }}
                        />
                      </span>
                    ) : (
                      <span className='absolute inset-y-0 left-0 top-[0.15em] flex items-center pl-3'>
                        <SvgIcon
                          options={{
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
          menuButtonContent='Add new label'
          onClick={() => labelModalOpen()}
        />
      </ComboBox>
      <ComboBoxSelectedLabelsEffect todo={todo} />
    </LabelComboBoxFragment>
  );
};
