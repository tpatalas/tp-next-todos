import { renderWithRecoilRoot } from '@lib/utils';
import { fireEvent, screen } from '@testing-library/react';
import { FooterSidebar } from '../footerSidebar';

jest.mock('@components/layouts/layoutApp/layoutLogo', () => ({
  LayoutLogo: () => <div data-testid='layoutLogo' />,
}));

jest.mock('@buttons/iconButton', () => ({
  IconButton: () => <button data-testid='iconButton' />,
}));

describe('FooterSidebar', () => {
  renderWithRecoilRoot(<FooterSidebar />);

  it('should show layoutLogo and iconButton components when sidebar is open', () => {
    const logoComponent = screen.getByTestId('layoutLogo');
    const iconButtonComponent = screen.getByTestId('iconButton');
    expect(logoComponent).toBeInTheDocument();
    expect(iconButtonComponent).toBeInTheDocument();
  });

  it('should hide layoutLogo components when iconButton is clicked', () => {
    const logoComponent = screen.queryByTestId('layoutLogo');
    const iconButtonComponent = screen.queryByTestId('iconButton');

    if (iconButtonComponent) {
      fireEvent.click(iconButtonComponent);
    }
    expect(logoComponent).not.toBeInTheDocument();
  });
});
