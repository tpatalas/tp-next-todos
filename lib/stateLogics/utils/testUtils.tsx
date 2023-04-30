import { FC, ReactElement, useEffect } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { RecoilRoot, RecoilState, atom, useRecoilSnapshot, useRecoilValue } from 'recoil';

const RecoilRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const renderWithRecoilRoot = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: RecoilRootProvider, ...options });

export const RecoilObserverValue = <T,>({ node }: { node: RecoilState<T> | null }) => {
  const testingOnlyAtom = atom({ key: 'atomForTestingPurposeOnly' });
  const state = node ? node : testingOnlyAtom;
  const value = useRecoilSnapshot().getLoadable(state).valueMaybe();

  return <div>{!!value ? 'active' : 'inactive'}</div>;
};

// recoil test observer: required to observe state change on unit test
export const RecoilObserverOnChange = <T,>({
  node,
  onChange,
}: {
  node: RecoilState<T>;
  onChange: (value: T) => void;
}) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
