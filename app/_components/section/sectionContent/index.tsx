import { SmoothTransition } from '@/transition/smoothTransition';
import { DELAY } from '@/transition/transition.consts';
import { optionsTransition } from '@/transition/transition.utils';
import { SectionContentText } from './sectionContentText';
import { sectionContentTextContents } from '../section.consts';
import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { classNames } from '@/_lib/utils/misc.utils';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';
import { ImageWithRemotePlaceholder } from '@/next/imageWithRemotePlaceholder';

const styleImageWrapper = 'relative w-80 h-auto rounded-xl shadow-2xl shadow-blue-500/40 ring-purple-300/10';
const styleImage = 'h-auto w-full rounded-xl drop-shadow-2xl';
const styleImageFrame = 'md:h-[440px]';
const optionsImageSpotlight = {
  width: 504,
  height: 689,
  className: styleImage,
  src: PATH_IMAGE['contentFocus'],
  sizes: '(max-width: 748px) 70vw, 33vw',
  alt: 'content focus image',
  priority: true,
};
const optionsImageOverload = {
  width: 494,
  height: 650,
  className: styleImage,
  src: PATH_IMAGE['contentOrganize'],
  sizes: '(max-width: 748px) 70vw, 33vw',
  alt: 'content organize image',
  priority: true,
};

export const SectionContent = () => {
  const divContainerSpotlight_id = 'sectionContent_spotlight';
  const divContainerOverload_id = 'sectionContent_overload';
  const transitionHandler = (delay: keyof typeof DELAY) => {
    return optionsTransition({ transition: 'scaleCenterSm', duration: 700, delay: delay, rate: 1.5 });
  };

  return (
    <SmoothTransition>
      <div className='relative my-24 flex flex-row items-center justify-center px-5 py-10 sm:px-10 md:my-32 lg:px-28'>
        <div className='md:min-w-3/4 grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-2'>
          <SectionContentText
            _id={divContainerSpotlight_id}
            title={sectionContentTextContents.spotlight.title}
            subTitle={sectionContentTextContents.spotlight.subTitle}
            content={sectionContentTextContents.spotlight.content}
          />
          <DivContainerWithRef
            _id={divContainerSpotlight_id}
            className={classNames(styleImageFrame)}
          >
            <SmoothTransitionWithDivRef
              _id={divContainerSpotlight_id}
              options={transitionHandler(500)}
            >
              <div className={classNames(styleImageWrapper, 'opacity-100')}>
                <ImageWithRemotePlaceholder options={optionsImageSpotlight} />
              </div>
            </SmoothTransitionWithDivRef>
          </DivContainerWithRef>
          <DivContainerWithRef
            _id={divContainerOverload_id}
            className={classNames('max-md:order-last', styleImageFrame)}
          >
            <SmoothTransitionWithDivRef
              _id={divContainerOverload_id}
              options={transitionHandler(700)}
            >
              <div className={classNames(styleImageWrapper, 'opacity-100')}>
                <ImageWithRemotePlaceholder options={optionsImageOverload} />
              </div>
            </SmoothTransitionWithDivRef>
          </DivContainerWithRef>
          <SectionContentText
            _id={divContainerOverload_id}
            title={sectionContentTextContents.overload.title}
            subTitle={sectionContentTextContents.overload.subTitle}
            content={sectionContentTextContents.overload.content}
          />
        </div>
      </div>
    </SmoothTransition>
  );
};
