import { USER } from '@data/dataTypesConst';
import { createDataNewUser } from '@lib/queries/queryUsers';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { atomUserNew } from '.';

export const useUserValueUpdate = () => {
  return useRecoilCallback(({ set, snapshot }) => (targetName: USER, content: string) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    //create new user
    set(atomUserNew, {
      ...get(atomUserNew),
      [targetName]: content,
    });
  });
};

export const useUserCreate = () => {
  return useRecoilCallback(({ snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const userValue = get(atomUserNew);

    createDataNewUser(userValue);
  });
};
