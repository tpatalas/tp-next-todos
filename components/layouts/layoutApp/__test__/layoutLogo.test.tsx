import { renderWithRecoilRoot } from '@states/utils';
import { screen } from '@testing-library/react';
import { LayoutLogo } from '../layoutLogo';

describe('LayoutLogo', () => {
  renderWithRecoilRoot(<LayoutLogo />);

  it('should render the logo', () => {
    const logoComponent = screen.getByText(/I am a LOGO/i);
    expect(logoComponent).toBeInTheDocument();
  });
});
