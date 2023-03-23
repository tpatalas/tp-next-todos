import { Combobox, Transition } from '@headlessui/react';
import { ComboBoxResetQueryEffect } from '@lib/stateLogics/effects/ui/comboBoxResetQueryEffect';
import { Types } from '@lib/types';
import { optionsButtonComboBoxToggle } from '@options/button';
import { atomComboBoxQuery } from '@states/comboBoxes';
import { classNames } from '@states/utils';
import { PseudoIconButton } from '@ui/pseudoButtons/pseudoIconButton';
import { Fragment as ComboBoxFragment } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

type Props = Pick<Types, 'selected' | 'children' | 'placeholder'> &
  Partial<Pick<Types, 'hasComboBoxBoardStyle' | 'comboBoxInputButton'>> & { onChange: (value: never) => void };

export const ComboBox = ({
  onChange,
  selected,
  children,
  placeholder,
  comboBoxInputButton,
  hasComboBoxBoardStyle = true,
}: Props) => {
  const setQuery = useSetRecoilState(atomComboBoxQuery);
  const resetQuery = useResetRecoilState(atomComboBoxQuery);

  return (
    <ComboBoxFragment>
      <ComboBoxResetQueryEffect />
      <div className='relative z-10 w-full min-w-[18rem]'>
        <Combobox
          value={selected}
          onChange={onChange}
          multiple>
          <>
            <div
              className={classNames(
                'relative flex flex-col rounded-lg outline-none',
                hasComboBoxBoardStyle && 'group/comboBox focus-within:shadow-2xl focus-within:shadow-slate-300/40',
              )}>
              <div
                className={classNames(
                  'relative w-full cursor-default overflow-hidden rounded-lg py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 group-focus-within/comboBox:border-opacity-50 sm:text-sm',
                  hasComboBoxBoardStyle &&
                    'border border-solid border-slate-200 bg-slate-50 shadow-xl shadow-slate-300/40',
                )}>
                <Combobox.Input
                  className='w-full border-none py-2 pl-4 pr-12 text-sm leading-5 text-gray-900 placeholder:text-gray-400 focus:ring-0'
                  placeholder={placeholder}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {!comboBoxInputButton ? (
                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-1'>
                    {/* PseudoIconButton is used since button elements cannot be nested */}
                    <PseudoIconButton options={optionsButtonComboBoxToggle} />
                  </Combobox.Button>
                ) : (
                  <div className='absolute inset-y-0 right-0 flex items-center pr-1'>{comboBoxInputButton}</div>
                )}
              </div>
              <Transition
                as={'div'}
                show={comboBoxInputButton ? true : undefined}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className={classNames(
                  '-mt-[5px] rounded-b-lg',
                  hasComboBoxBoardStyle &&
                    'border-x border-b border-solid border-slate-200 shadow-xl shadow-slate-300/40 group-focus-within/comboBox:border-opacity-50',
                )}
                afterLeave={() => resetQuery()}>
                {children}
              </Transition>
            </div>
          </>
        </Combobox>
      </div>
    </ComboBoxFragment>
  );
};
