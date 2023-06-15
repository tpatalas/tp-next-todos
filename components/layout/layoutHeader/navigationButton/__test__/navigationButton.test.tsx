import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RecoilState } from 'recoil';
import { NavigationButton } from '..';
import { atomLayoutNavigationOpen } from '@layout/layout.states';

describe('NavigationButton', () => {
  const renderWithNavigationButton = <T,>({ node }: { node?: RecoilState<T> }) => {
    const options = { session: null, node };
    return renderWithRecoilRootAndSession(<NavigationButton />, options);
  };

  it('should render the screen reader only text of NavigationButton', () => {
    const { container } = renderWithNavigationButton({});
    const screenReaderText = screen.getByText('Open sidebar');

    expect(container).toBeInTheDocument();
    expect(screenReaderText).toBeInTheDocument();
  });

  it('should update atomLayoutNavigationOpen state upon clicking the button', async () => {
    const path = 'app';
    const { container } = renderWithNavigationButton({ node: atomLayoutNavigationOpen(path) });
    const screenReaderText = screen.getByText('Open sidebar');

    expect(container).toBeInTheDocument();
    expect(screenReaderText).toBeInTheDocument();

    await waitFor(() => {
      const inactiveState = screen.queryByText('inactive');
      expect(inactiveState).toBeInTheDocument();
    });

    fireEvent.click(screenReaderText);

    await waitFor(() => {
      const inactiveState = screen.queryByText('active');
      expect(inactiveState).toBeInTheDocument();
    });
  });
});
