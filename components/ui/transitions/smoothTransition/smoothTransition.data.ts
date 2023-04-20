import { TypesDataTransition } from './smoothTransition.types';

export const DATA_SMOOTH_TRANSITION: TypesDataTransition[] = [
  {
    type: 'fadeOut',
    enter: 'transition-opacity ease-in-out',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition-opacity ease-in-out',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  {
    type: 'scaleOutY',
    enter: 'transition ease-in-out origin-top',
    enterFrom: 'scale-y-[0] opacity-0',
    enterTo: 'scale-y-[1] opacity-100',
    leave: 'transition ease-in-out origin-bottom',
    leaveFrom: 'scale-y-[1] opacity-100',
    leaveTo: 'scale-y-[0] opacity-0',
  },
  {
    type: 'scaleOutX',
    enter: 'transition ease-in-out origin-left',
    enterFrom: 'scale-X-[0] opacity-0',
    enterTo: 'scale-X-[1] opacity-100',
    leave: 'transition ease-in-out origin-right',
    leaveFrom: 'scale-X-[1] opacity-100',
    leaveTo: 'scale-X-[0] opacity-0',
  },
];
