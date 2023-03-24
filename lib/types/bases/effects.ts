import { IDB_STORE } from '@constAssertions/storage';
import { BREAKPOINT } from '@constAssertions/ui';
import { AtomEffect } from 'recoil';
import { Types } from '..';

export type CollectTypesEffects = TypesEffects;

export interface TypesEffects {
  // All Effect
  shouldGet: boolean;
  isSessionSetEnabled: boolean;
  isSessionResetEnabled: boolean;
  // Refetch Effect
  queryKey: string;
  queryFunction<T>(): Promise<{ data: T }>;
  depQueryFunction<T>(): Promise<{ data: T }>;
  storeName: IDB_STORE;
  isIndexedDBEnabled: boolean;
  isRefetchingOnMutation: boolean;
  isRefetchingOnFocus: boolean;
  isRefetchingOnBlur: boolean;
  refetchDelayOnMutation: number;
  refetchInterval: number;
  // MediaQuery Effect
  breakpoint: BREAKPOINT;
  isStateUnderBreakpoint: boolean;
  isStateOverBreakpoint: boolean;
}
/**
 * Types Atom Effects - Recoil
 * none-collectable Types
 */

export type TypesRefetchEffect = <T>({
  queryKey,
  queryFunction,
  depQueryFunction,
  isIndexedDBEnabled,
  storeName,
  isRefetchingOnMutation,
  refetchDelayOnMutation,
  isRefetchingOnFocus,
  isRefetchingOnBlur,
  refetchInterval,
}: Partial<
  Pick<
    Types,
    | 'isIndexedDBEnabled'
    | 'isRefetchingOnMutation'
    | 'refetchDelayOnMutation'
    | 'isRefetchingOnFocus'
    | 'isRefetchingOnBlur'
    | 'refetchInterval'
    | 'depQueryFunction'
  >
> &
  Pick<Types, 'queryFunction' | 'queryKey' | 'storeName'>) => AtomEffect<T>;

export type TypesSessionStorageEffect = <T>({
  queryKey,
  shouldGet,
  isSessionSetEnabled,
  isSessionResetEnabled,
}: Pick<Types, 'queryKey'> &
  Partial<Pick<Types, 'shouldGet' | 'isSessionResetEnabled' | 'isSessionSetEnabled'>>) => AtomEffect<T | boolean>;

export type TypesMediaQueryEffect = <T>({
  breakpoint,
  isStateUnderBreakpoint,
  isStateOverBreakpoint,
}: Pick<Types, 'breakpoint'> & Partial<Pick<Types, 'isStateUnderBreakpoint' | 'isStateOverBreakpoint'>>) => AtomEffect<
  T | boolean
>;

export type TypesAtomEffect<T> = AtomEffect<T>;
export type TypesAtomEffectWithParam<T, P> = (key: P) => AtomEffect<T>;
