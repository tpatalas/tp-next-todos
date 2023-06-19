import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { atomDisableScroll } from '@states/misc';
import { screen } from '@testing-library/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { FooterBody } from '..';

jest.mock('@ui/gradients/globalVerticalGradient', () => ({
  GlobalVerticalGradient: () => <div>Top Gradient</div>,
}));

type Props = {
  isSidebarOpen?: boolean;
  isScrollDisabled?: boolean;
};

const MockStateEffect = ({ isSidebarOpen, isScrollDisabled }: Props) => {
  const setSideBarOpen = useSetRecoilState(atomLayoutNavigationOpen('app'));
  const setScrollBar = useSetRecoilState(atomDisableScroll);

  useEffect(() => {
    setSideBarOpen(isSidebarOpen ?? false);
    isScrollDisabled ? setScrollBar(isScrollDisabled) : null;
  }, [isScrollDisabled, isSidebarOpen, setScrollBar, setSideBarOpen]);

  return null;
};

describe('FooterBody', () => {
  const renderWithFooterBody = ({ isSidebarOpen, isScrollDisabled }: Props) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <FooterBody>
          <></>
        </FooterBody>
        <MockStateEffect
          isSidebarOpen={isSidebarOpen}
          isScrollDisabled={isScrollDisabled}
        />
      </>,
      options,
    );
  };

  it('should render the mocked GlobalVerticalGradient component based on the given props', () => {
    const { container } = renderWithFooterBody({});
    const gradientTop = screen.getAllByText(/Top Gradient/);

    expect(container).toBeInTheDocument();
    gradientTop.map((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should render correct CSS when sidebar is open and scroll is disabled', async () => {
    renderWithFooterBody({ isSidebarOpen: true, isScrollDisabled: true });
    const sidebarElement = screen.getByTestId('sidebarOpen');
    const scrollDisabled = screen.getByTestId('scrollDisabled');

    expect(sidebarElement).toHaveClass('md:ml-[266px]');
    expect(scrollDisabled).toHaveClass('overflow-y-hidden');
  });

  it('should render correct CSS when sidebar is close and scroll is not disabled', async () => {
    renderWithFooterBody({ isSidebarOpen: false, isScrollDisabled: false });
    const sidebarElement = screen.getByTestId('sidebarOpen');
    const scrollDisabled = screen.getByTestId('scrollDisabled');

    expect(sidebarElement).toHaveClass('md:ml-3');
    expect(scrollDisabled).toHaveClass('overflow-y-auto');
  });
});
