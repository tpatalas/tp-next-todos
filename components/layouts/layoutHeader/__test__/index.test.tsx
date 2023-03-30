import { renderWithRecoilRoot } from '@stateLogics/utils';
import { screen } from '@testing-library/react';
import { LayoutHeader } from '..';

describe('LayoutHeader', () => {
  renderWithRecoilRoot(<LayoutHeader layoutType='app' />);

  it('should render the sidebarButton', () => {
    const sidebarButton = screen.getByText(/Open sidebar/i);
    expect(sidebarButton).toBeInTheDocument();
  });
});
