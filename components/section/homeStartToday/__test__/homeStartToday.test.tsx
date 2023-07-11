import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { HomeStartToday } from '..';
import { screen } from '@testing-library/react';
import { homeStartTodayText } from '@components/section/section.consts';
import { ReactNode } from 'react';

jest.mock('@ui/transitions/smoothTransition', () => ({
  SmoothTransition: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('HomeStartToday', () => {
  const renderWithHomeStartToday = () => renderWithRecoilRootAndSession(<HomeStartToday />);

  it('should render the content texts properly', () => {
    const { container } = renderWithHomeStartToday();
    const titleText = screen.getByText(homeStartTodayText.title + homeStartTodayText.subTitle);
    const contentText = screen.getByText(homeStartTodayText.content);

    expect(container).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });

  it('should render child component SignInButton correctly', () => {
    renderWithHomeStartToday();
    const signInButtonText = screen.getByText('Get started');

    expect(signInButtonText).toBeInTheDocument();
  });

  it('should render gradient element correctly', () => {
    renderWithHomeStartToday();
    const gradientElementTestId = screen.getByTestId('gradient-testid');

    expect(gradientElementTestId).toBeInTheDocument();
  });
});
