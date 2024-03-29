import { render, screen } from '@testing-library/react';
import { SectionHero } from '..';
import { ReactNode } from 'react';
import { getResolvedComponent } from '@/_lib/utils/test.utils';
import { configsSignInButton } from '@/button/button.configs';
import { sectionContents } from '@/section/section.consts';

jest.mock('@/transition/smoothTransitionWithDivRef', () => ({
  SmoothTransitionWithDivRef: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/_components/next/imageWithRemotePlaceholder', () => ({
  ImageWithRemotePlaceholder: () => <div data-testid='mockImage-testid' />,
}));

jest.mock('@/_lib/utils/base64Converter.utils', () => jest.fn());

const signInButtonConfigs = configsSignInButton({ preset: 'getStarted' });

describe('SectionHero', () => {
  const renderAsyncComponent = async () => {
    const ResolvedSectionHero = await getResolvedComponent(SectionHero);
    render(<ResolvedSectionHero />);
  };

  it('should render the text contents', async () => {
    await renderAsyncComponent();

    const titleText = await screen.findByText(sectionContents.hero.title);
    const subTitleText = await screen.findByText(sectionContents.hero.subTitle);
    const contentText = await screen.findByText(sectionContents.hero.content);

    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });

  it('should render the signInButton and link button', async () => {
    await renderAsyncComponent();

    const signInButton = await screen.findByText(signInButtonConfigs.buttonName);
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
