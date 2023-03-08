import { Types } from '@lib/types';
import { TypesOptionsFloatingLabelInput } from '@lib/types/typesOptions';
import { classNames } from '@states/utils';
import { forwardRef, Fragment } from 'react';

type Props = { options: TypesOptionsFloatingLabelInput } & Partial<Pick<Types, 'onClick' | 'onChange' | 'inputValue'>>;

export const FloatingLabelInput = forwardRef<HTMLInputElement, Props>(
  ({ options, onChange, inputValue }: Props, ref) => {
    return (
      <div>
        <div className='relative'>
          <Fragment>
            <input
              id={options.name}
              name={options.name}
              type={options.inputType}
              autoComplete={options.autoComplete}
              placeholder={options.placeholder}
              required={options.required}
              value={inputValue}
              onChange={onChange}
              ref={ref}
              className={classNames(
                'peer block w-full appearance-none rounded-xl border py-3 placeholder-transparent shadow-md shadow-slate-200 outline-none transition-all',
                options.isError
                  ? 'border-red-600 ring-0 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                  : 'border-slate-200 focus:border-blue-500',
                options.padding,
              )}
            />
            <label
              htmlFor={options.name}
              className={classNames(
                'absolute left-2.5 -top-2 block cursor-text select-none bg-white px-1 text-xs font-medium transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:left-2.5 peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-xs',
                options.isError ? 'text-red-600 peer-focus:text-red-500' : 'text-gray-400 peer-focus:text-blue-500',
              )}>
              {options.placeholder}
            </label>
          </Fragment>
        </div>
      </div>
    );
  },
);

FloatingLabelInput.displayName = 'FloatingLabelInput';
