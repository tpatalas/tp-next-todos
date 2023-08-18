export const transitionDuration = {
  '75': 'duration-75',
  '100': 'duration-100',
  '150': 'duration-150',
  '200': 'duration-200',
  '300': 'duration-300',
  '500': 'duration-500',
  '700': 'duration-700',
  '1000': 'duration-1000',
};

export const transitionDelay = {
  '75': 'delay-75',
  '100': 'delay-100',
  '150': 'delay-150',
  '200': 'delay-200',
  '300': 'delay-300',
  '500': 'delay-500',
  '700': 'delay-700',
  '1000': 'delay-1000',
};

export const transitionRate = {
  '0.5': 0.5,
  '0.75': 0.75,
  '1.0': 1.0,
  '1.5': 1.5,
  '2.0': 2.0,
  '3.0': 3.0,
  '4.0': 4.0,
  '5.0': 5.0,
};

export const transitionTypes = {
  fadeIn: {
    enter: 'transition-opacity ease-in-out',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition-opacity ease-in-out',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  scaleY: {
    enter: 'transition transform-gpu ease-in-out origin-top',
    enterFrom: 'scale-y-[0] opacity-0',
    enterTo: 'scale-y-[1] opacity-100',
    leave: 'transition ease-in-out origin-bottom',
    leaveFrom: 'scale-y-[1] opacity-100',
    leaveTo: 'scale-y-[0] opacity-0',
  },
  scaleX: {
    enter: 'transition transform-gpu ease-in-out origin-left',
    enterFrom: 'scale-x-[0] opacity-0',
    enterTo: 'scale-x-[1] opacity-100',
    leave: 'transition ease-in-out origin-right',
    leaveFrom: 'scale-x-[1] opacity-100',
    leaveTo: 'scale-X-[0] opacity-0',
  },
  scaleCenterFull: {
    enter: 'transition transform-gpu ease-in-out',
    enterFrom: 'scale-[0] opacity-0',
    enterTo: 'scale-[1] opacity-100',
    leave: 'transition ease-in-out',
    leaveFrom: 'scale-[1] opacity-100',
    leaveTo: 'scale-[0] opacity-0',
  },
  scaleCenterSm: {
    enter: 'transition transform-gpu ease-in-out',
    enterFrom: 'scale-[0.9] opacity-0',
    enterTo: 'scale-[1] opacity-100',
    leave: 'transition ease-in-out',
    leaveFrom: 'scale-[0.9] opacity-100',
    leaveTo: 'scale-[0] opacity-0',
  },
  translateDown: {
    enter: 'transition ease-in-out transform-gpu',
    enterFrom: 'opacity-0 -translate-y-5',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transition ease-in-out transform-gpu',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 -translate-y-5',
  },
};
