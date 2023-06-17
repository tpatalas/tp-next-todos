import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { Logo } from '..';

describe('Logo', () => {
  const renderWithLogo = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(<Logo />, options);
  };

  it('should render default logo', () => {
    const { container } = renderWithLogo();
    const svgLogo = screen.getByTestId('MainWhite-testid');

    expect(container).toBeInTheDocument();
    expect(svgLogo).toBeInTheDocument();
  });

  it('should route to the root when svgLogo is clicked', async () => {
    const route = '/features';
    mockRouter.push(route);
    renderWithLogo();
    const svgLogo = screen.getByTestId('MainWhite-testid');

    expect(mockRouter).toMatchObject({ pathname: route });
    expect(svgLogo).toBeInTheDocument();

    fireEvent.click(svgLogo);

    expect(mockRouter).not.toMatchObject({ pathname: route });
    expect(mockRouter).toMatchObject({ pathname: '/' });
  });

  it('should not render the offline network status', async () => {
    renderWithLogo();

    await waitFor(() => {
      const networkIcon = screen.queryByTestId('svgIcon-testid');
      expect(networkIcon).not.toBeInTheDocument();
    });
  });
});
