import { render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { SectionHeader } from '..';
import { sectionHeaderContents } from '@/section/section.consts';

jest.mock('@/transition/smoothTransitionWithDivRef', () => ({
  SmoothTransitionWithDivRef: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('SectionHeader', () => {
  const renderWithSectionHeader = () => render(<SectionHeader />);

  it('should render the gradient pole testid', () => {
    const { container } = renderWithSectionHeader();
    const gradientPoleTestId = screen.getByTestId('gradientPole-testid');

    expect(container).toBeInTheDocument();
    expect(gradientPoleTestId).toBeInTheDocument();
  });

  it('should render the text contents properly', async () => {
    renderWithSectionHeader();

    Object.values(sectionHeaderContents).forEach(async (value) => {
      await waitFor(() => {
        const text = screen.queryByText(value);
        expect(text).toBeInTheDocument();
      });
    });
  });
});
