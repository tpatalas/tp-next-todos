import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { atomLabelModalOpen } from '@states/modals';
import { screen, waitFor } from '@testing-library/react';
import { atomUserSession } from '@user/user.states';
import { Session } from 'next-auth';
import { Suspense, useEffect } from 'react';
import { RecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { LabelList } from '..';

type Props<T> = { session: Session | null; userSession: boolean; node?: RecoilState<T> };

const UserSession = ({ userSession }: { userSession: boolean }) => {
  const setUserSession = useSetRecoilState(atomUserSession);
  const currentSession = useRecoilValue(atomLabelModalOpen(undefined));

  useEffect(() => {
    setUserSession(userSession);
    currentSession;
  }, [currentSession, setUserSession, userSession]);

  return null;
};

describe('LabelList', () => {
  const renderWithLabelList = <T,>({ session, userSession, node }: Props<T>) => {
    const options = { session: session, node: node };
    return renderWithRecoilRootAndSession(
      <>
        <Suspense fallback={null}>
          <LabelList />
        </Suspense>
        <UserSession userSession={userSession} />
      </>,
      options,
    );
  };

  it('should render LabelList component properly', async () => {
    const { container } = renderWithLabelList({ session: null, userSession: false });

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      const labelName = screen.queryByText(/Labels/i);
      expect(labelName).toBeInTheDocument();
    });
    await waitFor(() => {
      const labelNameFake = screen.queryByText(/Labelss/i);
      expect(labelNameFake).not.toBeInTheDocument();
    });
    await waitFor(() => {
      const labelList = screen.queryByText(/Personal/i);
      expect(labelList).toBeInTheDocument();
    });
    await waitFor(() => {
      const labelListFake = screen.queryByText(/Personals/i);
      expect(labelListFake).not.toBeInTheDocument();
    });
  });
});
