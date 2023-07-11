import { DATA_FOOTER_NAVIGATION, DATA_FOOTER_SOCIAL } from '@collections/footer';
import { STYLE_LINK_NORMAL } from '@data/stylePreset';
import { SvgIcon } from '@icon/svgIcon';
import { Logo } from '@layout/layoutHeader/logo';
import { classNames } from '@stateLogics/utils';
import { DividerX } from '@ui/dividers/dividerX';
import Link from 'next/link';
import { optionsSocialPaths } from '../section.utils';
import { copyRightText } from '../section.consts';

export const Footer = () => {
  return (
    <>
      <footer>
        <DividerX options={{ width: 'w-11/12' }} />
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-center space-y-8 overflow-hidden px-6 pb-10 pt-16 lg:px-12'>
          <div className='mb-8'>
            <Logo />
          </div>
          <nav
            className='-mb-6 w-full columns-2 justify-between sm:flex sm:justify-center sm:space-x-6 ml:space-x-12'
            aria-label='Footer'
          >
            {DATA_FOOTER_NAVIGATION.map((item) => (
              <div
                key={item.name}
                className='pb-6'
              >
                <Link
                  href={item.path}
                  className={classNames(
                    STYLE_LINK_NORMAL,
                    'text-sm leading-6 text-slate-800 text-opacity-80',
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className='flex w-full flex-row-reverse items-center justify-between'>
            <div className='flex justify-center space-x-10'>
              {DATA_FOOTER_SOCIAL.map((social) => (
                <Link
                  aria-label='Visit Github Repository'
                  key={social.name}
                  href={social.link}
                  className='group rounded-full p-1 hover:bg-slate-900 hover:bg-opacity-10'
                  target='_blank'
                >
                  <SvgIcon options={optionsSocialPaths(social)} />
                </Link>
              ))}
            </div>
            <p className='text-center text-xs leading-5 text-gray-500'>{copyRightText}</p>
          </div>
        </div>
      </footer>
    </>
  );
};
