import { TypesLayout } from '@layout/layout.types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FilterPathHomeEffect = dynamic(() =>
  import('@layout/layoutEffects/filterPathHomeEffect').then((mod) => mod.FilterPathHomeEffect),
);

const InitialNavigationEffect = dynamic(() =>
  import('@layout/layoutEffects/initialNavigationEffect').then((mod) => mod.InitialNavigationEffect),
);

const LayoutTypeEffect = dynamic(() =>
  import('@layout/layoutEffects/layoutTypeEffect').then((mod) => mod.LayoutTypeEffect),
);

const BodyTagClassEffect = dynamic(() =>
  import('@layout/layoutEffects/bodyTagClassEffect').then((mod) => mod.BodyTagClassEffect),
);

export const LayoutHomeLazy = ({ path }: Pick<TypesLayout, 'path'>) => {
  return (
    <Suspense fallback={null}>
      <LayoutTypeEffect path={path} />
      <FilterPathHomeEffect />
      <InitialNavigationEffect />
      <BodyTagClassEffect />
    </Suspense>
  );
};
