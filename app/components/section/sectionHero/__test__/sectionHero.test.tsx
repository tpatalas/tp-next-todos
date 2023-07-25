import { sectionHeroContents } from '@/section/section.consts';
import { render, screen } from '@testing-library/react';
import { SectionHero } from '..';
import { ReactNode } from 'react';

jest.mock('@/transition/smoothTransitionWithDivRef', () => ({
  SmoothTransitionWithDivRef: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <div data-testid='mockImage-testid' />,
}));

describe('SectionHero', () => {
  const renderWithSectionHero = () => render(<SectionHero />);

  it('should render the text contents', async () => {
    const { container } = renderWithSectionHero();
    const titleText = await screen.findByText(sectionHeroContents.title);
    const subTitleText = await screen.findByText(sectionHeroContents.subTitle);
    const contentText = await screen.findByText(sectionHeroContents.content);

    expect(container).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });

  it('should render the signInButton and link button', async () => {
    renderWithSectionHero();
    const signInButton = await screen.findByText('Get started');
    const linkButton = await screen.findByText('Learn more');

    expect(signInButton).toBeInTheDocument();
    expect(linkButton).toBeInTheDocument();
  });

  it('should render the gradient element and mockImage', async () => {
    renderWithSectionHero();
    const gradientElement = await screen.findByTestId('gradient-testid');
    const mockImage = await screen.findByTestId('mockImage-testid');

    expect(gradientElement).toBeInTheDocument();
    expect(mockImage).toBeInTheDocument();
  });
});
