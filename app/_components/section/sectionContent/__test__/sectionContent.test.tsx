import { render, screen, waitFor } from '@testing-library/react';
import { SectionContent } from '..';
import { sectionContentTextContents } from '@/section/section.consts';
import { ReactNode } from 'react';

jest.mock('@/_components/next/imageWithRemotePlaceholder', () => ({
  ImageWithRemotePlaceholder: () => <div data-testid='mockImage-testid' />,
}));

jest.mock('@/transition/smoothTransitionWithDivRef', () => ({
  SmoothTransitionWithDivRef: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('SectionContent', () => {
  const renderWithSectionContent = () => render(<SectionContent />);

  it('should render the content texts of spotlight and overload', () => {
    const { container } = renderWithSectionContent();

    Object.values(sectionContentTextContents).forEach((contentObjects) => {
      Object.values(contentObjects).forEach(async (value) => {
        await waitFor(() => {
          const text = screen.queryByText(value);
          expect(text).toBeInTheDocument();
        });
      });
    });
    expect(container).toBeInTheDocument();
  });

  it('should mount the ImageWithRemotePlaceholder properly', async () => {
    renderWithSectionContent();
    await waitFor(() => {
      const imageTestId = screen.getAllByTestId('mockImage-testid');

      imageTestId.forEach((value) => {
        expect(value).toBeInTheDocument();
      });
    });
  });
});
