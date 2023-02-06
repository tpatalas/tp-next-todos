import { LayoutHeader } from '@layouts/layoutApp/layout/layoutHeader';
import { renderWithRecoilRoot } from '@states/utils';
import { screen } from '@testing-library/react';

describe('LayoutHeader', () => {
  renderWithRecoilRoot(<LayoutHeader />);

  it('should render the sidebarButton', () => {
    const sidebarButton = screen.getByText(/Open sidebar/i);
    expect(sidebarButton).toBeInTheDocument();
  });
});
