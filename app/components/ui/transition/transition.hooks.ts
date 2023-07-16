import { RefObject, useState, useCallback, useEffect } from 'react';

export const useVerticalScrollPositionTrigger = (
  scrollRef?: RefObject<HTMLElement>,
  triggerRate?: number,
) => {
  const [isShowing, setIsShowing] = useState(false);

  const handleScroll = useCallback(() => {
    if (!scrollRef?.current) return;

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
