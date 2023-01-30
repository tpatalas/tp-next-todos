import { renderWithRecoilRoot } from '@states/utils';
import { fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { LayoutLogo } from '../layoutLogo';

describe('LayoutLogo', () => {
  renderWithRecoilRoot(<LayoutLogo />);

  let logoComponent: HTMLElement;

  it('should render the logo', async () => {
    logoComponent = await screen.findByText(/I am a LOGO/i);
    expect(logoComponent).toBeInTheDocument();
  });

  it('should route to the base URL', async () => {
    mockRouter.push('/');
    fireEvent.click(logoComponent);
    expect(mockRouter).toMatchObject({ asPath: '/', pathname: '/' });
  });
});
