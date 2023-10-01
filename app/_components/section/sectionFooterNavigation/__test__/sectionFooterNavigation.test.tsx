import { render, screen, waitFor } from '@testing-library/react';
import { SectionFooterNavigation } from '..';
import { DATA_FOOTER_NAVIGATION, DATA_FOOTER_SOCIAL } from '../sectionFooterNavigation.data';

jest.mock('@/_components/layout/logo', () => ({
  Logo: () => <div>Logo</div>,
}));

describe('SectionFooterNavigation', () => {
  const renderWithSectionFooterNavigation = () => render(<SectionFooterNavigation />);

  it('should render the child components properly', () => {
    renderWithSectionFooterNavigation();

    const dividerXComponent = screen.getByTestId('dividerX-testid');
    const logoComponent = screen.getByText('Logo');

    DATA_FOOTER_NAVIGATION.forEach(async (item) => {
      await waitFor(() => {
        const itemName = screen.getByText(item.name);
        expect(itemName).toBeInTheDocument();
      });
    });

    DATA_FOOTER_SOCIAL.forEach(async (item) => {
      await waitFor(() => {
        const itemId = screen.getByText(item._id);
        expect(itemId).toBeInTheDocument();
      });
    });

    expect(dividerXComponent).toBeInTheDocument();
    expect(logoComponent).toBeInTheDocument();
  });
});
