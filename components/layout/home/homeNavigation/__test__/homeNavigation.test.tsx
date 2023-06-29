import { TypesLayout } from '@layout/layout.types';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { HomeNavigation } from '..';

describe('HomeNavigation', () => {
  const renderWithHomeNavigation = (path: TypesLayout['path']) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(<HomeNavigation path={path} />, options);
  };

  const TEXTS = [
    { name: 'features', text: 'Features', path: '/features' },
    { name: 'implementations', text: 'Implementations', path: '/implementations' },
    { name: 'pricing', text: 'Pricing', path: '/pricing' },
    { name: 'signIn', text: 'Sign in', path: '/auth' },
    { name: 'tryDemo', text: 'Try Demo', path: '/demo' },
  ];

  it('should render the home navigation text', () => {
    const { container } = renderWithHomeNavigation('home');

    expect(container).toBeInTheDocument();

    TEXTS.forEach((item) => {
      const textElement = screen.getByText(item.text);
      expect(textElement).toBeInTheDocument();
    });
  });

  it('should route to the correct pathname when the link button is clicked', () => {
    mockRouter.push('/');
    renderWithHomeNavigation('home');

    expect(mockRouter).toMatchObject({ pathname: '/' });

    TEXTS.forEach(async (item) => {
      if (item.name === 'signIn') return; // due to the nature of next-auth signIn with next-router-mock does not work in test environment. Also next-auth is expected to be well tested already.
      const textElement = screen.getByText(item.text);
      fireEvent.click(textElement);
      await waitFor(() => {
        expect(mockRouter).toMatchObject({ pathname: item.path });
      });
    });
  });

  it('should use the correct classNames when layoutType equals to "home"', () => {
    renderWithHomeNavigation('home');
    const navElement = screen.getByTestId('homeNavigation');
    expect(navElement).toHaveClass(
      'flex-col bg-slate-50 max-ml:space-y-4 max-ml:rounded-b-xl max-ml:px-5 max-ml:pb-8 max-ml:pt-[6rem] ml:flex ml:flex-row ml:items-center ml:space-x-3 ml:bg-transparent ml:pr-0 lg:pr-3',
    );
  });

  it('should use the correct classNames when layoutType equals to "app"', () => {
    renderWithHomeNavigation('app');
    const navElement = screen.getByTestId('homeNavigation');
    expect(navElement).toHaveClass('flex-row items-center space-x-10 pr-3 sm:pr-8');
  });
});
