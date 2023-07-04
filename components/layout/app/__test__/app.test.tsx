import { screen, waitFor } from '@testing-library/react';
import 'fake-indexeddb/auto';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutApp } from '..';
import mockRouter from 'next-router-mock';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: () => {
      return <title>mocked-title</title>;
    },
  };
});

describe('LayoutApp', () => {
  const renderWithLayoutApp = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <LayoutApp>
        <></>
      </LayoutApp>,
      options,
    );
  };

  it('should render the correct title on the document head', async () => {
    const { container } = renderWithLayoutApp();
    const titleTag = document.title;

    expect(container).toBeInTheDocument();
    await waitFor(() => expect(titleTag).toBe('mocked-title'));
  });

  it('should render the child components', async () => {
    mockRouter.push('/app');
    renderWithLayoutApp();
    const searchBarText = screen.getByText('Search');
    const logoTestId = screen.getAllByTestId('MainWhite-testid')[0];
    const signInButtonText = await screen.findByText('Sign in');
    const layoutFooterTestId = screen.getByTestId('layoutFooter');
    const sidebarOpenTestId = screen.getByTestId('sidebarOpen');
    const bodyElement = document.body;

    expect(searchBarText).toBeInTheDocument();
    expect(logoTestId).toBeInTheDocument();
    expect(signInButtonText).toBeInTheDocument();
    expect(layoutFooterTestId).toBeInTheDocument();
    expect(sidebarOpenTestId).toBeInTheDocument();
    expect(bodyElement).toHaveClass('overflow-hidden');
  });
});
