import { IconButton } from '@buttons/iconButton';
import { DATA_FOOTER_SOCIAL, TypesFooterSocial } from '@collections/footer';
import { DATA_FOOTER_NAVIGATION } from '@collections/footer';
import { STYLE_LINK_NORMAL } from '@data/stylePreset';
import { Logo } from '@layouts/layoutHeader/logo';
import { classNames } from '@stateLogics/utils';
import { DividerX } from '@ui/dividers/dividerX';
import Link from 'next/link';

export const Footer = () => {
  const socialButton = (social: TypesFooterSocial) => {
    return {
      path: social.path,
      size: 'w-6 h-6',
      color: 'fill-gray-400',
    };
  };

  return (
    <>
      <footer>
        <DividerX options={{ width: 'w-11/12' }} />
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-center space-y-8 overflow-hidden px-6 pb-10 pt-16 lg:px-12'>
          <div className='mb-8'>
            <Logo />
          </div>
          <nav
            className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-2 ml:space-x-12'
            aria-label='Footer'>
            {DATA_FOOTER_NAVIGATION.map((item) => (
              <div
                key={item.name}
                className='pb-6'>
                <Link
                  href={item.path}
                  className={classNames(
                    STYLE_LINK_NORMAL,
                    'text-sm leading-6 text-slate-800 text-opacity-80',
                  )}>
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className='flex w-full flex-row-reverse items-center justify-between'>
            <div className='flex justify-center space-x-10'>
              {DATA_FOOTER_SOCIAL.map((social) => (
                <IconButton
                  key={social.name}
                  options={socialButton(social)}
                />
              ))}
            </div>
            <p className='text-center text-xs leading-5 text-gray-500'>
              &copy; 2023 tpAtalas. Repository code under MIT License.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
