import { PATH_IMAGE_HOME } from '@constAssertions/data';
import { classNames, cloudflareLoader } from '@stateLogics/utils';
import Image from 'next/image';
import { ContentText } from './contentText';
import { useRef } from 'react';
import { DELAY } from '@constAssertions/ui';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { optionsTransition } from '@ui/transitions/smoothTransition/smoothTransition.utils';
import { contentTextOverload, contentTextSpotlight } from '../section.consts';

export const HomeContent = () => {
  const styleImageWrapper =
    'relative w-80 h-auto rounded-xl shadow-2xl shadow-blue-500/40 ring-purple-300/10';
  const styleImage = 'h-auto w-full rounded-xl drop-shadow-2xl';
  const styleImageFrame = 'md:h-[440px]';
  const spotlightRef = useRef(null);
  const overloadRef = useRef(null);
  const spotlightImageRef = useRef(null);
  const overloadImageRef = useRef(null);
  const transitionHandler = (delay: keyof typeof DELAY) => {
    return optionsTransition({ transition: 'scaleCenterSm', duration: 700, delay: delay });
  };

  return (
    <SmoothTransition>
      <div className='relative my-24 flex flex-row items-center justify-center px-5 py-10 sm:px-10 md:my-32 lg:px-28'>
        <div className='md:min-w-3/4 grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-2'>
          <ContentText
            title={contentTextSpotlight.title}
            subTitle={contentTextSpotlight.subTitle}
            content={contentTextSpotlight.content}
            scrollRef={spotlightRef}
          />
          <div
            ref={spotlightImageRef}
            className={classNames(styleImageFrame)}
          >
            <SmoothTransition
              options={transitionHandler(500)}
              scrollRef={spotlightImageRef}
            >
              <div className={classNames(styleImageWrapper, 'opacity-100')}>
                <Image
                  loader={cloudflareLoader}
                  width={504}
                  height={689}
                  className={styleImage}
                  src={PATH_IMAGE_HOME['contentFocus']}
                  sizes='(max-width: 748px) 70vw, 33vw'
                  alt='content focus image'
                  priority={true}
                />
              </div>
            </SmoothTransition>
          </div>
          <div
            className={classNames('max-md:order-last', styleImageFrame)}
            ref={overloadImageRef}
          >
            <SmoothTransition
              options={transitionHandler(700)}
              scrollRef={overloadImageRef}
            >
              <div className={classNames(styleImageWrapper, 'opacity-100')}>
                <Image
                  loader={cloudflareLoader}
                  width={494}
                  height={650}
                  className={styleImage}
                  src={PATH_IMAGE_HOME['contentOrganize']}
                  sizes='(max-width: 748px) 70vw, 33vw'
                  alt='content organize image'
                  priority={true}
                />
              </div>
            </SmoothTransition>
          </div>
          <ContentText
            title={contentTextOverload.title}
            subTitle={contentTextOverload.subTitle}
            content={contentTextOverload.content}
            scrollRef={overloadRef}
          />
        </div>
      </div>
    </SmoothTransition>
  );
};
