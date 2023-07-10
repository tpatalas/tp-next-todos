import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { HomeContent } from '..';
import { screen } from '@testing-library/react';
import { contentTextOverload, contentTextSpotlight } from '@components/section/section.consts';
import { ReactNode } from 'react';

jest.mock('@ui/transitions/smoothTransition', () => ({
  SmoothTransition: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('HomeContent', () => {
  const renderWithHomeContent = () => {
    return renderWithRecoilRootAndSession(<HomeContent />);
  };

  it('should render the content texts of child components', () => {
    const { container } = renderWithHomeContent();
    const spotlightTitleText = screen.getByText(contentTextSpotlight.title);
    const spotlightSubTitleText = screen.getByText(contentTextSpotlight.subTitle);
    const spotlightContentText = screen.getByText(contentTextSpotlight.content);

    const overloadTitleText = screen.getByText(contentTextOverload.title);
    const overloadSubTitleText = screen.getByText(contentTextOverload.subTitle);
    const overloadContentText = screen.getByText(contentTextOverload.content);

    expect(container).toBeInTheDocument();
    expect(spotlightTitleText).toBeInTheDocument();
    expect(spotlightSubTitleText).toBeInTheDocument();
    expect(spotlightContentText).toBeInTheDocument();
    expect(overloadTitleText).toBeInTheDocument();
    expect(overloadSubTitleText).toBeInTheDocument();
    expect(overloadContentText).toBeInTheDocument();
  });
});
