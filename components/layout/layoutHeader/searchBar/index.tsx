import { IconButton } from '@buttons/iconButton';
import { ICON_SEARCH, ICON_CLOSE } from '@data/materialSymbols';
import { SvgIcon } from '@icon/svgIcon';
import { atomLayoutSearch } from '@layout/layout.states';
import { classNames } from '@stateLogics/utils';
import { Fragment as ResetSearchFragment, Fragment as SearchBarFragment } from 'react';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

export const SearchBar = () => {
  const setSearchInput = useSetRecoilState(atomLayoutSearch);
  const searchInputValue = useRecoilValue(atomLayoutSearch);
  const resetSearchInput = useResetRecoilState(atomLayoutSearch);

  return (
    <SearchBarFragment>
      <div className='relative flex flex-1 flex-row items-center justify-between'>
        <form
          className={classNames(
            'md:mr-15 relative flex w-full max-w-xl items-center rounded-lg border border-transparent text-gray-400 drop-shadow-sm focus-within:border-slate-200 focus-within:border-opacity-50 focus-within:text-gray-600 focus-within:shadow-lg focus-within:shadow-slate-300/60 sm:mr-10 lg:mr-10 xl:max-w-2xl',
          )}
          action='#'
          method='GET'
        >
          <label
            htmlFor='search-field'
            className='sr-only'
          >
            Search
          </label>
          <div className='pointer-events-none absolute inset-y-0 left-4 flex items-center'>
            <SvgIcon
              options={{
                path: ICON_SEARCH,
                className: 'h-6 w-6 fill-gray-500',
              }}
            />
          </div>
          <input
            id='search-field'
            className='block h-12 w-full rounded-lg border-transparent bg-blue-100 bg-opacity-80 pl-12 pr-12 text-base text-gray-900 placeholder-gray-500 focus-within:bg-transparent focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0'
            placeholder='Search'
            type='search'
            name='search'
            value={searchInputValue}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <ResetSearchFragment>
            {searchInputValue && (
              <div className='absolute right-2 bg-transparent'>
                <IconButton
                  options={{
                    path: ICON_CLOSE,
                  }}
                  onClick={() => resetSearchInput()}
                />
              </div>
            )}
          </ResetSearchFragment>
        </form>
      </div>
    </SearchBarFragment>
  );
};
