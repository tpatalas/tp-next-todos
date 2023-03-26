import { fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { renderWithRecoilRoot } from '@stateLogics/utils';
import { Logo } from '@layouts/layout/logo';

describe('Logo', () => {
  renderWithRecoilRoot(<Logo />);

  let logoComponent: HTMLElement;

  it('should render the logo', async () => {
    logoComponent = await screen.findByText('Logo');
    expect(logoComponent).toBeInTheDocument();
  });

  it('should route to the base URL', async () => {
    mockRouter.push('/');
    fireEvent.click(logoComponent);
    expect(mockRouter).toMatchObject({ asPath: '/', pathname: '/' });
  });
});
