import { Types } from '@lib/types';
import { useEffect } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

// recoil test observer: required to observe state change on unit test
export const RecoilObserver = <T,>({
  node,
  onChange,
}: {
  node: RecoilState<T>;
  onChange: Types['onChange'];
}) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
