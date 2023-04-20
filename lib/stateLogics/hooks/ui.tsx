import { RefObject, useCallback, useEffect, useState } from 'react';

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
    const position = window.scrollY;
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

export const useVerticalScrollPositionTrigger = (
  scrollRef: RefObject<HTMLElement>,
  triggerRate?: number,
) => {
  const [isShowing, setIsShowing] = useState(false);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { top, bottom } = scrollRef.current.getBoundingClientRect();
    const multiplier = (triggerRate && triggerRate) ?? 1.2; // higher the number the earlier the element gets triggered
    const lowerMiddle = Math.floor((top + bottom) / multiplier);
    const elementPositionMiddle = window.scrollY - lowerMiddle;
    const elementPositionValue = elementPositionMiddle > 0 ? 0 : elementPositionMiddle; // set to 0 when reaches to the trigger point

    elementPositionValue === 0 && setIsShowing(true);
  }, [scrollRef, triggerRate]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isShowing;
};
