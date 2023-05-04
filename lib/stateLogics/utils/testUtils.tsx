import { RenderOptions, render } from '@testing-library/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode, useEffect } from 'react';
import { RecoilRoot, RecoilState, atom, useRecoilSnapshot, useSetRecoilState } from 'recoil';

interface TypesRecoilRootProvider<T> extends TypesRecoilObserver<T> {
  children: ReactNode;
  session: Session | null;
}

interface TypesRecoilObserver<T> {
  node?: RecoilState<T>;
  state?: T;
}

export const RecoilObserver = <T,>({ node, state }: TypesRecoilObserver<T>) => {
  const testAtom = atom<T>({ key: 'atomRecoilObserverSetValue' });
  const dynamicNode = node ? node : testAtom;
  const setValue = useSetRecoilState(dynamicNode);
  const value = useRecoilSnapshot().getLoadable(dynamicNode).valueMaybe();

  useEffect(() => {
    state && setValue(state);
  }, [setValue, state]);

  return <div>{!!value ? 'active' : 'inactive'}</div>;
};

const RecoilRootProvider = <T,>({ children, session, node, state }: TypesRecoilRootProvider<T>) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>{children}</SessionProvider>
      <RecoilObserver
        node={node}
        state={state}
      />
    </RecoilRoot>
  );
};

interface RenderWithRecoilRootAndSessionOptions<T> extends Omit<RenderOptions, 'wrapper'> {
  session: Session | null;
  node?: RecoilState<T>;
  state?: T;
}

export const renderWithRecoilRootAndSession = <T,>(
  ui: ReactElement,
  options?: RenderWithRecoilRootAndSessionOptions<T>,
) =>
  render(ui, {
    wrapper: (props) => (
      <RecoilRootProvider<T>
        {...props}
        session={options?.session ?? null}
        node={options?.node}
        state={options?.state}
      />
    ),
    ...options,
  });
