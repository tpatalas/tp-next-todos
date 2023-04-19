import { STYLE_BLUR_GRADIENT_R_LG, STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';

export const HomeStartToday = () => {
  const signInButtonOptions: TypesOptionsButton = {
    signInButtonName: 'Get started',
    className: STYLE_BUTTON_NORMAL_BLUE,
  };

  return (
    <>
      <div className='py-18 relative isolate my-10 px-6 md:mt-12 md:py-24 lg:px-8'>
        <div
          className='absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
          aria-hidden='true'>
          <div
            className={classNames(
              'custom-clip-path aspect-[2500/600] w-[70rem] flex-none opacity-40 md:aspect-[1400/600] md:opacity-30',
              STYLE_BLUR_GRADIENT_R_LG,
            )}
          />
        </div>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl'>
            Achieve More with Less.
            <br />
            Get started today.
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600'>
            Elevate your efficiency and unlock the key to accomplishing more with our
            productivity-boosting app.
          </p>
          <div className='mt-10 flex items-center justify-center'>
            <SignInButton options={signInButtonOptions} />
          </div>
        </div>
      </div>
    </>
  );
};
