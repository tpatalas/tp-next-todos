import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen } from '@testing-library/react';
import { FooterBody } from '..';
import { MockFooterStateEffect, PropsFooterStateEffect } from './__mock__/mockFooterStateEffect';

jest.mock('@ui/gradients/globalVerticalGradient', () => ({
  GlobalVerticalGradient: () => <div>Top Gradient</div>,
}));

describe('FooterBody', () => {
  const renderWithFooterBody = ({ isSidebarOpen, isScrollDisabled }: PropsFooterStateEffect) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <FooterBody>
          <></>
        </FooterBody>
        <MockFooterStateEffect
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
