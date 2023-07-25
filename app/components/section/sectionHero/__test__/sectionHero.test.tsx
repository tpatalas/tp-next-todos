import { sectionHeroContents } from '@/section/section.consts';
import { render, screen } from '@testing-library/react';
import { SectionHero } from '..';
import { ReactNode } from 'react';
import { getResolvedComponent } from '@/lib/utils/test.utils';

jest.mock('@/transition/smoothTransitionWithDivRef', () => ({
  SmoothTransitionWithDivRef: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <div data-testid='mockImage-testid' />,
}));

describe('SectionHero', () => {
  const renderAsyncComponent = async () => {
    const ResolvedSectionHero = await getResolvedComponent(SectionHero);
    render(<ResolvedSectionHero />);
  };

  it('should render the text contents', async () => {
    await renderAsyncComponent();

    const titleText = await screen.findByText(sectionHeroContents.title);
    const subTitleText = await screen.findByText(sectionHeroContents.subTitle);
    const contentText = await screen.findByText(sectionHeroContents.content);

    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });

  it('should render the signInButton and link button', async () => {
    await renderAsyncComponent();

    const signInButton = await screen.findByText('Get started');
    const linkButton = await screen.findByText('Learn more');

    expect(signInButton).toBeInTheDocument();
    expect(linkButton).toBeInTheDocument();
  });

  it('should render the gradient element and mockImage', async () => {
    await renderAsyncComponent();

    const gradientElement = await screen.findByTestId('gradient-testid');
    const mockImage = await screen.findByTestId('mockImage-testid');

    expect(gradientElement).toBeInTheDocument();
    expect(mockImage).toBeInTheDocument();
  });
});
