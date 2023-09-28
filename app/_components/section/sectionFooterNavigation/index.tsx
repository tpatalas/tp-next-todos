import { Logo } from '@/_components/layout/logo';
import { styleNextLink } from '@/next/next.styles';
import { styleDividerX } from '@/ui/divider/divider.styles';
import { DividerX } from '@/ui/divider/dividerX';
import Link from 'next/link';
import { DATA_FOOTER_NAVIGATION, DATA_FOOTER_SOCIAL } from './sectionFooterNavigation.data';
import { SvgIcon } from '@/icon/svgIcon';
import { configsSvgIconSocial } from '@/icon/svgIcon/svgIcon.configs';

export const copyRightText = '\u00A9 2023 tpatalas. Repository code under MIT License.';

export const SectionFooterNavigation = () => {
  return (
    <footer>
      <DividerX style={styleDividerX({ width: 'xl' })} />
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
                className={styleNextLink({ className: 'text-sm leading-6 text-slate-800 text-opacity-80' })}
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
                key={social._id}
                href={social.link}
                className='group rounded-full p-1 hover:bg-slate-900 hover:bg-opacity-10'
                target='_blank'
              >
                <SvgIcon configs={configsSvgIconSocial({ preset: social._id })} />
              </Link>
            ))}
          </div>
          <p className='text-center text-xs leading-5 text-gray-500'>{copyRightText}</p>
        </div>
      </div>
    </footer>
  );
};
