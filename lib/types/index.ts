import { CollectTypesArrayObject } from './bases/arrayOfObjects';
import { CollectTypesData } from './bases/data';
import { CollectTypesEffects } from './bases/effects';
import { CollectTypesMisc } from './bases/misc';
import { CollectTypesUi } from './bases/ui';

/**
 * Global Collection Types
 */
export type Types = CollectTypesMisc &
  CollectTypesArrayObject &
  CollectTypesUi &
  CollectTypesData &
  CollectTypesEffects;

export * from './bases/arrayOfObjects';
export * from './bases/data';
export * from './bases/effects';
export * from './bases/misc';
export * from './bases/ui';
