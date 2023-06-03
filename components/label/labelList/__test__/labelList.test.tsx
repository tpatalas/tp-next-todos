import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen, waitFor } from '@testing-library/react';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';
import { Session } from 'next-auth';
import { Suspense } from 'react';
import { RecoilState } from 'recoil';
import { LabelList } from '..';

type Props<T> = { session: Session | null; userSession: boolean; node?: RecoilState<T> };

describe('LabelList', () => {
  const renderWithLabelList = <T,>({ session, node }: Props<T>) => {
    const options = { session: session, node: node };
    return renderWithRecoilRootAndSession(
      <>
        <Suspense fallback={null}>
          <LabelList />
        </Suspense>
        <UserSessionEffect />
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
