import { TRANSITION_TYPE, DURATION, DELAY } from './transition.consts';

type Props = {
  transition: keyof typeof TRANSITION_TYPE;
  duration?: keyof typeof DURATION;
  delay?: keyof typeof DELAY;
  rate?: number;
};

export const optionsTransition = ({ transition, duration, delay, rate }: Props) => {
  return Object.assign(
    { type: TRANSITION_TYPE[transition] },
    !!duration && { enterDuration: DURATION[duration] },
    !!delay && { delay: DELAY[delay] },
    !!rate && { rate: rate },
  );
};
