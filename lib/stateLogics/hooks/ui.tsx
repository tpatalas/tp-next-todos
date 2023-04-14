import { TypesDataScrollRate } from '@collections/footer';
import { RefObject, useCallback, useEffect, useState } from 'react';

type TypesScrollPosition = 'startPosition' | 'multiplier';
type PropsScrollPositionRate = Record<TypesScrollPosition, number> &
  Partial<{
    adjuster: number;
    type: 'percentage' | 'value';
  }>;

export const useHorizontalScrollPosition = (ref: RefObject<HTMLDivElement>) => {
  const [leftPosition, setLeftPosition] = useState(-1);
  const [rightPosition, setRightPosition] = useState(-1);
  const [isOverflow, setIsOverflow] = useState(false);

  const initialOverflown = ref.current && ref.current.scrollWidth > 300;

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      const overScrollWidth = currentRef.clientWidth < currentRef.scrollWidth;
      const overflown = overScrollWidth || (initialOverflown as boolean);
      setIsOverflow(overflown);
    }

    const handleScroll = () => {
      if (currentRef) {
        const scrollWidth = currentRef.scrollWidth - currentRef.clientWidth;
        const rightPosition = scrollWidth && scrollWidth - currentRef.scrollLeft;
        setLeftPosition(ref.current.scrollLeft);
        setRightPosition(rightPosition as number);
      }
    };

    ref.current && ref.current.addEventListener('scroll', handleScroll);
    return () => {
      currentRef && currentRef.removeEventListener('scroll', handleScroll);
    };
  }, [initialOverflown, ref]);

  return { leftPosition, rightPosition, isOverflow };
};

export const useVerticalScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useWindowWidth = () => {
  if (typeof window === 'undefined') return 0;
  const getWindowWidth = useCallback(() => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }, []);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const handleResize = useCallback(() => {
    setWindowWidth(getWindowWidth());
  }, [getWindowWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowWidth;
};

export const useScrollPositionRate = ({
  startPosition,
  multiplier,
  type,
  adjuster,
}: PropsScrollPositionRate) => {
  const clientWidth = useWindowWidth();
  const scrollPosition = useVerticalScrollPosition();
  const clientWidthAdjuster = adjuster ?? 1.1;
  const rateType = type ?? 'percentage';

  const dynamicStartPoint = clientWidth > 900 ? startPosition : clientWidth * clientWidthAdjuster;
  const scrollRate = (scrollPosition / dynamicStartPoint - 1) * multiplier;
  const scrollRateOutput = scrollRate > 100 ? 100 : scrollRate;
  if (!dynamicStartPoint || scrollPosition < dynamicStartPoint) return 0;
  if (rateType === 'percentage') return `${scrollRateOutput}%`;
  return scrollRateOutput;
};

export const useScrollPositionRateData = <T,>({
  name,
  data,
}: {
  name: T;
  data: TypesDataScrollRate<T>[];
}) => {
  const clientWidth = useWindowWidth();
  const dynamicAdjuster = (value?: number) => (clientWidth > 500 ? undefined : value);
  const position = data.find((item) => item.name === name) || ({} as TypesDataScrollRate<T>);
  const scrollPosition = useScrollPositionRate({
    startPosition: position.startPosition,
    multiplier: position.multiplier,
    adjuster: dynamicAdjuster(position.adjuster),
  });
  return scrollPosition;
};
