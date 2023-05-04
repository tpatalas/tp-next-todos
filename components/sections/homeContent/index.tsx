import { PATH_IMAGE_HOME } from '@constAssertions/data';
import { classNames, nextImageLoader } from '@stateLogics/utils';
import Image from 'next/image';
import { ContentText } from './contentText';
import { useRef } from 'react';
import { DELAY, DURATION } from '@constAssertions/ui';
import { TRANSITION_TYPE } from '@ui/transitions/smoothTransition/smoothTransition.types';
import { SmoothTransition } from '@ui/transitions/smoothTransition';

export const HomeContent = () => {
  const styleImageWrapper =
    'relative w-80 rounded-xl shadow-2xl shadow-slate-500/30 ring-2 ring-slate-300/10';
  const styleImage = 'h-auto w-auto rounded-xl drop-shadow-2xl';
  const imageOptions = {
    type: TRANSITION_TYPE['scaleCenterSm'],
    enterDuration: DURATION['700'],
  };
  const spotlightRef = useRef(null);
  const overloadRef = useRef(null);
  const spotlightImageRef = useRef(null);
  const overloadImageRef = useRef(null);

  return (
    <div className='w-screen'>
      <div className='relative my-24 flex flex-row items-center justify-center px-5 py-10 sm:px-10 md:my-32 lg:px-28'>
        <div className='md:min-w-3/4 grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-2'>
          <ContentText
            title='Spotlight your to-dos'
            subTitle="View your to-dos that are intelligently and automatically selected in Today's Focus."
            content="Add your to-dos as you please, with or without due dates and priorities. Today's Focus will display your most important to-dos for you."
            scrollRef={spotlightRef}
          />
          <div ref={spotlightImageRef}>
            <SmoothTransition
              options={{ ...imageOptions, delay: DELAY['500'] }}
              scrollRef={spotlightImageRef}
            >
              <div className={classNames(styleImageWrapper, 'opacity-100')}>
                <Image
                  loader={nextImageLoader}
                  width={0}
                  height={0}
                  className={styleImage}
                  src={PATH_IMAGE_HOME['contentFocus']}
                  alt='content focus image'
                  priority
                />
              </div>
            </SmoothTransition>
          </div>
          <div
            className='max-md:order-last'
            ref={overloadImageRef}
          >
            <SmoothTransition
              options={{ ...imageOptions, delay: DELAY['1000'] }}
              scrollRef={overloadImageRef}
            >
              <div className={classNames(styleImageWrapper, 'opacity-100')}>
                <Image
                  loader={nextImageLoader}
                  width={0}
                  height={0}
                  className={styleImage}
                  src={PATH_IMAGE_HOME['contentOrganize']}
                  alt='content organize image'
                  priority
                />
              </div>
            </SmoothTransition>
          </div>
          <ContentText
            title='Free your overload'
            subTitle='Work on a to-do list that is auto-allocated according to your capacity.'
            content="Today's Focus efficiently determines the ideal number of to-dos for you. As you
            consistently complete to-dos, the process adjusts and assigns more or fewer to-dos base
            on your completion rate."
            scrollRef={overloadRef}
          />
        </div>
      </div>
    </div>
  );
};
