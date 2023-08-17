import { SmoothTransition } from '@/transition/smoothTransition';
import { SectionContentText } from './sectionContentText';
import { DivContainerWithRef } from '@/container/divContainerWithRef';
import { SmoothTransitionWithDivRef } from '@/transition/smoothTransitionWithDivRef';
import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';
import { ImageWithRemotePlaceholder } from '@/next/imageWithRemotePlaceholder';
import { sectionContents } from '../section.consts';
import { cx } from 'class-variance-authority';
import { configsTransition } from '@/transition/transition.configs';

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

  return (
    <SmoothTransition>
      <div className='relative my-24 flex flex-row items-center justify-center px-5 py-10 sm:px-10 md:my-32 lg:px-28'>
        <div className='md:min-w-3/4 grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-2'>
          <SectionContentText
            _id={divContainerSpotlight_id}
            title={sectionContents.spotlight.title}
            subTitle={sectionContents.spotlight.subTitle}
            content={sectionContents.spotlight.content}
          />
          <DivContainerWithRef
            _id={divContainerSpotlight_id}
            className={cx(styleImageFrame)}
          >
            <SmoothTransitionWithDivRef
              _id={divContainerSpotlight_id}
              configs={configsTransition({ preset: 'scaleCenterSm', delay: '500', rate: '1.5' })}
            >
              <div className={cx(styleImageWrapper, 'opacity-100')}>
                <ImageWithRemotePlaceholder configs={optionsImageSpotlight} />
              </div>
            </SmoothTransitionWithDivRef>
          </DivContainerWithRef>
          <DivContainerWithRef
            _id={divContainerOverload_id}
            className={cx('max-md:order-last', styleImageFrame)}
          >
            <SmoothTransitionWithDivRef
              _id={divContainerOverload_id}
              configs={configsTransition({ preset: 'scaleCenterSm', delay: '700', rate: '1.5' })}
            >
              <div className={cx(styleImageWrapper, 'opacity-100')}>
                <ImageWithRemotePlaceholder configs={optionsImageOverload} />
              </div>
            </SmoothTransitionWithDivRef>
          </DivContainerWithRef>
          <SectionContentText
            _id={divContainerOverload_id}
            title={sectionContents.overload.title}
            subTitle={sectionContents.overload.subTitle}
            content={sectionContents.overload.content}
          />
        </div>
      </div>
    </SmoothTransition>
  );
};
