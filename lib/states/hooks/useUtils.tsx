import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';

export const useGetWithRecoilCallback = () => {
  return useRecoilCallback(({ snapshot }) => <T,>(p: RecoilValue<T>) => {
    return snapshot.getLoadable(p).getValue();
  });
};

export const usePrefetchRouter = (pathName: string) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(pathName);
  }, [pathName, router]);

  return () => {
    router.push(pathName);
  };
};
