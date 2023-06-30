import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import 'fake-indexeddb/auto';
import { LayoutHome } from '..';
import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: () => {
      return <title>mocked-title</title>;
    },
  };
});

describe('LayoutHome', () => {
  const renderWithLayoutHome = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutHome>
          <></>
        </LayoutHome>
      </>,
      options,
    );
  };

  it('should render the title tag', () => {
    const { container } = renderWithLayoutHome();
    const titleTag = document.title;

    expect(container).toBeInTheDocument();
    expect(titleTag).toBe('mocked-title');
  });

  it('should mount the homeNavigation component', () => {
    renderWithLayoutHome();
    const homeNavigationTestId = screen.getByTestId('homeNavigation');

    expect(homeNavigationTestId).toBeInTheDocument();
  });

  it('should mount the layoutFooter component', () => {
    renderWithLayoutHome();
    const layoutFooterTestId = screen.getByTestId('layoutFooter');

    expect(layoutFooterTestId).toBeInTheDocument();
  });

  it('should mount the footer component', () => {
    renderWithLayoutHome();
    const footerText = screen.getByLabelText('Footer');

    expect(footerText).toBeInTheDocument();
  });

  it('should not have className "overflow-hidden" when the "home" is the pathname', async () => {
    mockRouter.push('/');
    renderWithLayoutHome();

    const bodyElement = document.body;

    expect(mockRouter).toMatchObject({ pathname: '/' });
    expect(bodyElement).not.toHaveClass('overflow-hidden');
  });
});
