import { RenderOptions, render } from '@testing-library/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode, useEffect } from 'react';
import { RecoilRoot, RecoilState, atom, useRecoilSnapshot, useRecoilValue, useSetRecoilState } from 'recoil';

const RecoilRootProvider = ({ children, session }: { children: ReactNode; session: Session | null }) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>{children}</SessionProvider>
    </RecoilRoot>
  );
};

export const renderWithRecoilRootAndSession = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { session: Session | null },
) =>
  render(ui, {
    wrapper: (props) => (
      <RecoilRootProvider
        {...props}
        session={options?.session ?? null}
      />
    ),
    ...options,
  });

export const RecoilObserverValue = <T,>({ node }: { node?: RecoilState<T> }) => {
  const testAtom = atom<T>({ key: 'atomRecoilObserverValue' });
  const state = node ? node : testAtom;
  const value = useRecoilSnapshot().getLoadable(state).valueMaybe();

  return <div>{!!value ? 'active' : 'inactive'}</div>;
};

export const RecoilObserverSetValue = <T,>({ node, state }: { node?: RecoilState<T>; state?: T }) => {
  const testAtom = atom<T>({ key: 'atomRecoilObserverSetValue' });
  const dynamicNode = node ? node : testAtom;
  const setValue = useSetRecoilState(dynamicNode);

  useEffect(() => {
    state && setValue(state);
  }, [setValue, state]);

  return null;
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
