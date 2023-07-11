import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { HomeHeader } from '..';
import { screen } from '@testing-library/react';
import { homeHeaderText } from '@components/section/section.consts';
import { ReactNode } from 'react';

jest.mock('@ui/transitions/smoothTransition', () => ({
  SmoothTransition: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('HomeHeader', () => {
  const renderWithHomeHeader = () => {
    return renderWithRecoilRootAndSession(<HomeHeader />);
  };

  it('should render the homeHeader content texts properly', () => {
    const { container } = renderWithHomeHeader();
    const titleText = screen.getByText(homeHeaderText.title);
    const subTitleText = screen.getByText(homeHeaderText.subTitle);
    const content = screen.getByText(homeHeaderText.content);

    expect(container).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
