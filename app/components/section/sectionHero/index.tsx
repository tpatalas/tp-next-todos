import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { SmoothTransition } from '@/transition/smoothTransition';
import { optionsTransition } from '@/transition/transition.utils';
import { DELAY } from '@constAssertions/ui';
import { sectionHeroContents } from '../section.consts';
import Link from 'next/link';
import { SignInButton } from '@/button/signInButton';
import { STYLE_BUTTON_NORMAL_BLUE } from '@/button/button.consts';
import { TypesOptionsButtonWithTooltip } from '@/button/button.types';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import Image from 'next/image';
import { PATH_HOME, PATH_IMAGE } from '@/lib/consts/assertion.consts';
import { STYLE_BLUR_GRADIENT_R_LG } from '@/lib/consts/style.consts';
import { classNames } from '@/lib/utils/misc.utils';
import getBase64FromImageURL from '@/lib/utils/base64Converter.utils';

export const SectionHero = async () => {
  const placeholderDemo = await getBase64FromImageURL(PATH_IMAGE['demo']);
  const signInButtonOptions: Partial<TypesOptionsButtonWithTooltip> = {
    signInButtonName: 'Get started',
    className: STYLE_BUTTON_NORMAL_BLUE,
  };
  const translateDownHandler = (delay?: keyof typeof DELAY) => {
    return optionsTransition({ transition: 'translateDown', duration: 1000, delay: delay });
  };

  return (
    <div>
      <div className='relative isolate pt-10'>
        <div className='py-24 sm:py-32 lg:pb-40'>
          <DivContainerWithRef>
            <SmoothTransition options={translateDownHandler()}>
              <div className='mx-auto max-w-2xl text-center'>
                <div className='mb-2 text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                  {sectionHeroContents.title}
                </div>
                <div className='text-4xl font-bold text-slate-800 will-change-transform sm:text-6xl'>
                  {sectionHeroContents.subTitle}
                </div>
              </div>
            </SmoothTransition>
            <SmoothTransition options={translateDownHandler(300)}>
              <div className='mx-auto max-w-2xl text-center'>
                <p className='mt-6 text-xl leading-8 text-gray-600 will-change-transform'>
                  {sectionHeroContents.content}
                </p>
              </div>
            </SmoothTransition>
            <SmoothTransition options={translateDownHandler(700)}>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <SignInButton options={signInButtonOptions} />
                <Link
                  className='text-sm font-semibold leading-6 text-gray-900'
                  href={PATH_HOME['features']}
                >
                  Learn more <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </SmoothTransition>
            <SmoothTransition>
              <div className='flex justify-center'>
                <div className='relative mt-16 flow-root max-w-[60rem] sm:mt-24'>
                  <SmoothTransitionWithDivRef
                    options={optionsTransition({
                      transition: 'fadeIn',
                      duration: 1000,
                      delay: 500,
                      rate: 3,
                    })}
                  >
                    <div
                      className={classNames(
                        'absolute h-full w-full rounded-xl will-change-transform',
                        STYLE_BLUR_GRADIENT_R_LG,
                      )}
                      data-testid='gradient-testid'
                    />
                  </SmoothTransitionWithDivRef>
                  <SmoothTransitionWithDivRef
                    options={optionsTransition({
                      transition: 'scaleCenterSm',
                      duration: 700,
                      delay: 300,
                      rate: 3,
                    })}
                  >
                    <div className='mx-auto flex w-full max-w-[60rem] flex-row items-center justify-center rounded-xl border-none ring-0 lg:rounded-2xl'>
                      <Image
                        width={961}
                        height={754}
                        className='h-auto w-auto rounded-2xl ring-2 ring-slate-300/20 drop-shadow-2xl will-change-transform'
                        src={PATH_IMAGE['demo']}
                        sizes='90vw'
                        alt='demo application image'
                        placeholder='blur'
                        blurDataURL={placeholderDemo}
                        priority={true}
                      />
                    </div>
                  </SmoothTransitionWithDivRef>
                </div>
              </div>
            </SmoothTransition>
          </DivContainerWithRef>
        </div>
      </div>
    </div>
  );
};
