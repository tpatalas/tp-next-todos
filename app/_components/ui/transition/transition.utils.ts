import { TRANSITION_TYPE, DURATION, DELAY } from './transition.consts';
import { PropsTransitionConfigs } from './transition.types';

export const configsTransition = ({ transition, duration, delay, rate }: PropsTransitionConfigs) => {
  return Object.assign(
    { type: TRANSITION_TYPE[transition] },
    !!duration && { enterDuration: DURATION[duration] },
    !!delay && { delay: DELAY[delay] },
    !!rate && { rate: rate },
  );
};
