import { PATH_HOME } from '@constAssertions/data';
import { atomHtmlTitleTag } from '@states/misc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const FilterPathHomeEffect = () => {
  const { asPath } = useRouter();
  const path = (key: keyof typeof PATH_HOME) => asPath === PATH_HOME[key];

  const filterPathAppHandler = useRecoilCallback(({ set }) => () => {
    const setState = (htmlTitle: string) => {
      set(atomHtmlTitleTag, htmlTitle);
    };

    if (path('home')) return setState('Todo list to automate your tasks');
    if (path('pricing')) return setState('Pricing');
    if (path('features')) return setState('Features');
    if (path('implementations')) return setState('Implementations');
  });

  useEffect(() => {
    filterPathAppHandler();
  }, [filterPathAppHandler]);

  return null;
};
