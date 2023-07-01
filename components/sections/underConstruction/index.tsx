import { PATH_IMAGE_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_FULL_BLUE } from '@data/stylePreset';
import { classNames, cloudflareLoader } from '@stateLogics/utils';
import Image from 'next/image';
import Link from 'next/link';

export const UnderConstruction = () => {
  const styleParagraph = 'text-3xl font-bold uppercase tracking-wide ml:text-4xl';

  return (
    <section className='flex flex-row items-center justify-center pb-32 pt-16'>
      <div className='grid-row-2 grid w-full max-w-7xl items-center justify-items-center gap-6 px-2 py-5 sm:px-10 md:px-20 ml:grid-cols-2'>
        <div className='flex max-w-md flex-col items-center justify-center space-y-6 p-2 text-center'>
          <div className='flex flex-col items-center justify-center space-y-2 text-slate-800/90'>
            <h1 className={classNames(styleParagraph)}>Under</h1>
            <h1 className={classNames(styleParagraph)}>Construction</h1>
          </div>
          <div>
            <p className='text-slate-800/80'>
              The page is currently under construction for improvements to better serve you. We appreciate
              your patience. Please check back soon for an upgraded and user-friendly experience. Thank you!
            </p>
          </div>
          <Link
            href='/'
            className={classNames(
              STYLE_BUTTON_FULL_BLUE,
              'flex w-full max-w-xs flex-row justify-center whitespace-nowrap',
            )}
          >
            Back to homepage
          </Link>
        </div>
        <div className='relative flex h-[30rem] w-full max-w-lg flex-row items-center justify-center rounded-xl'>
          <Image
            loader={cloudflareLoader}
            width={1000}
            height={1000}
            className='h-auto w-full rounded-xl bg-transparent drop-shadow-2xl'
            src={PATH_IMAGE_HOME['underConstruction']}
            sizes='80vw'
            alt='content under construction'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
