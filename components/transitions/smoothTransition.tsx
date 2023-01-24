import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { Fragment, useEffect, useState } from 'react';

type Props = Pick<Types, 'children'>;

export const SmoothTransition = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Fragment>
      <Transition
        show={show}
        enter='transition-opacity duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        {children}
      </Transition>
    </Fragment>
  );
};
