import { renderWithRecoilRoot } from '@lib/utils';
import { screen, waitFor } from '@testing-library/react';
import { LayoutLogo } from '../layoutLogo';

describe('LayoutLogo', () => {
  renderWithRecoilRoot(<LayoutLogo />);
});

it('should render the logo', async () => {
  const logoComponent = screen.queryByText(/I am a LOGO/i);
  await waitFor(() => expect(logoComponent).toBeInTheDocument());
});
