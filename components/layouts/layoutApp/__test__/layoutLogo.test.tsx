import { fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { LayoutLogo } from '../layoutLogo';
import { renderWithRecoilRoot } from '@stateLogics/utils';

describe('LayoutLogo', () => {
  renderWithRecoilRoot(<LayoutLogo />);

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
