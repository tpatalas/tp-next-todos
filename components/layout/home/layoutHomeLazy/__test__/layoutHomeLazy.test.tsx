import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutHomeLazy } from '..';
import { useRecoilValue } from 'recoil';
import { atomLayoutNavigationOpen, atomLayoutType } from '@layout/layout.states';
import { screen } from '@testing-library/react';
import { atomHtmlTitleTag } from '@states/misc';

const StateEffect = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  const htmlTitleTag = useRecoilValue(atomHtmlTitleTag);
  const layoutNavigationOpen = useRecoilValue(atomLayoutNavigationOpen('home'));

  return (
    <>
      <div>LayoutType: {layoutType}</div>
      <div>HtmlTitleTag: {htmlTitleTag}</div>
      <div>LayoutNavigation: {layoutNavigationOpen ? 'True' : 'false'}</div>
    </>
  );
};

describe('LayoutHomeLazy', () => {
  const renderWithLayoutHomeLazy = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutHomeLazy path='home' />
        <StateEffect />
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
