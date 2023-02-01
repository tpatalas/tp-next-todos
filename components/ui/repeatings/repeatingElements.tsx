import { Types } from '@lib/types';
import { Fragment } from 'react';

export const RepeatingElements = ({
  repeats,
  children,
}: {
  repeats: number;
  children: Types['children'];
}) => {
  return (
    <Fragment>
      {[...Array(repeats)].map((_, index) => (
        <ul key={index}>{children}</ul>
      ))}
    </Fragment>
  );
};
