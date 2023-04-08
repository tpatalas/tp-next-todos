import { PATH_HOME, PATH_IMAGE_HOME } from '@constAssertions/data';
import { STYLE_BLUR_GRADIENT, STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames, nextImageLoader } from '@stateLogics/utils';
import Image from 'next/image';
import Link from 'next/link';

const signInButtonOptions: TypesOptionsButton = {
  signInButtonName: 'Get started',
  className: STYLE_BUTTON_NORMAL_BLUE,
};

export const Hero = () => {
  return (
    <div className='relative isolate pt-10'>
      <div className='py-24 sm:py-32 lg:pb-40'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='mb-2 text-4xl font-bold text-slate-800 sm:text-6xl'>
              Simplify your life
            </h1>
            <h1 className='text-4xl font-bold text-slate-800 sm:text-6xl'>Automate your tasks</h1>
            <p className='mt-6 text-xl leading-8 text-gray-600'>
              Focus on your work more and manage your to-dos less. Enhance your efficiency and
              improve your productivity.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <SignInButton options={signInButtonOptions} />
              <Link
                className='text-sm font-semibold leading-6 text-gray-900'
                href={PATH_HOME['features']}>
                Learn more <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='group/image relative mt-16 flow-root sm:mt-24'>
              <div
                className={classNames(
                  'absolute h-full w-full animate-glow rounded-xl',
                  STYLE_BLUR_GRADIENT,
                )}
              />
              <div className='mx-auto flex w-full max-w-5xl flex-row items-center justify-center rounded-xl border-none ring-0 lg:rounded-2xl'>
                <Image
                  loader={nextImageLoader}
                  width={0}
                  height={0}
                  className='h-auto w-auto rounded-xl ring-1 ring-slate-300/5 drop-shadow-2xl'
                  src={PATH_IMAGE_HOME['demo']}
                  alt='demo application image'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
