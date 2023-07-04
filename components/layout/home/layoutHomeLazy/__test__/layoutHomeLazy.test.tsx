import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutHomeLazy } from '..';
import { screen } from '@testing-library/react';
import { MockStateEffect } from './__mock__/mockStateEffect';

describe('LayoutHomeLazy', () => {
  const renderWithLayoutHomeLazy = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutHomeLazy path='home' />
        <MockStateEffect />
      </>,
      options,
    );
  };

  it('should render the effect components correctly', async () => {
    const { container } = renderWithLayoutHomeLazy();
    const layoutTypeText = screen.getByText('LayoutType: home');
    const htmlTitleTagText = screen.getByText('HtmlTitleTag: Todo list to automate your tasks');
    const layoutNavigationText = screen.getByText('LayoutNavigation: false');
    const bodyElement = document.body;

    expect(container).toBeInTheDocument();
    expect(layoutTypeText).toBeInTheDocument();
    expect(htmlTitleTagText).toBeInTheDocument();
    expect(layoutNavigationText).toBeInTheDocument();
    expect(bodyElement).not.toHaveClass('overflow-hidden');
  });
});
