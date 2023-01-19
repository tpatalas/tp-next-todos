import { IconButton } from '@buttons/iconButton';
import { SvgIcon } from '@components/icons/svgIcon';
import {
  ICON_ADD,
  ICON_CHECK_BOX_FILL,
  ICON_CHECK_BOX_OUTLINE_BLANK,
  ICON_UNFOLD_MORE,
} from '@data/materialSymbols';
import { Combobox, Transition } from '@headlessui/react';
import { Labels, Types } from '@lib/types';
import { atomQueryLabels } from '@states/labels';
import { useLabelModalStateOpen } from '@states/modals/hooks';
import { atomTodoNew } from '@states/todos';
import { classNames } from '@states/utils';
import { PseudoIconButton } from '@ui/pseudoButtons/pseudoIconButton';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type Props = Partial<Pick<Types, 'todo'>>;

export const ComboBox = ({ todo }: Props) => {
  const labels = useRecoilValue(atomQueryLabels);
  const todoNew = useRecoilValue(atomTodoNew);
  const todoId = todo ? todo._id! : todoNew._id!;
  const selectedLabels = labels.filter(
    (label) => label.title_id && label.title_id.includes(todoId),
  );
  const setSelectedLabels = useSetRecoilState(atomQueryLabels);
  const [query, setQuery] = useState('');
  const labelModalOpen = useLabelModalStateOpen(undefined);

  const onChangeHandler = (selected: Labels[]) => {
    const updateChange = labels.map((label) => {
      const labelId = selected.filter((select) => select._id === label._id)[0]?._id;
      const isTodoIdExist = label.title_id && label.title_id.includes(todoId);
      const addOrCreateTodoId = label.title_id ? [...label.title_id, todoId] : [todoId];
      const updateTitleId = () => {
        if (!labelId) return label;
        return {
          ...label,
          title_id: !isTodoIdExist ? addOrCreateTodoId : label.title_id,
        };
      };
      const removeTitleId = () => {
        if (labelId) return label;
        return {
          ...label,
          title_id: label.title_id && label.title_id.filter((titleId) => titleId !== todoId),
        };
      };
      return isTodoIdExist ? removeTitleId() : updateTitleId();
    });
    setSelectedLabels(updateChange);
  };

  const filteredLabels =
    query === ''
      ? labels
      : labels.filter((label) =>
          label.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <div className='relative'>
      <div className='fixed top-16 z-10 w-72'>
        <Combobox
          value={selectedLabels}
          onChange={onChangeHandler}
          multiple>
          <div className='group/comboBox relative mt-1 flex flex-col rounded-lg outline-none focus-within:shadow-2xl focus-within:shadow-slate-300/40'>
            <div className='relative w-full cursor-default overflow-hidden rounded-lg border border-solid border-slate-200 bg-white py-1 text-left shadow-xl shadow-slate-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 group-focus-within/comboBox:border-opacity-50 sm:text-sm'>
              <Combobox.Input
                className='w-full border-none py-2 pl-4 pr-10 text-sm leading-5 text-gray-900 placeholder:text-gray-400 focus:ring-0'
                displayValue={(label: Labels) => label.name}
                placeholder='Enter a label'
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-1'>
                {/* PseudoIconButton is used since button elements cannot be nested */}
                <PseudoIconButton
                  data={{
                    path: ICON_UNFOLD_MORE,
                    padding: 'p-1',
                    color: 'fill-gray-400',
                    tooltip: 'Open/close a list',
                  }}
                />
              </Combobox.Button>
            </div>
            <Transition
              as={'div'}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              className='-mt-[5px] rounded-b-lg border-x border-b border-solid border-slate-200 shadow-xl shadow-slate-300/40 group-focus-within/comboBox:border-opacity-50'
              afterLeave={() => setQuery('')}>
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
                          active ? 'gray-text-700 bg-gray-100' : 'text-gray-500'
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
              <div className='px-3 pt-3 pb-2'>
                <IconButton
                  data={{
                    path: ICON_ADD,
                    size: 'h-6 w-6',
                    width: 'w-full',
                  }}
                  headerContents='Add new label'
                  onClick={() => labelModalOpen()}
                />
              </div>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};
