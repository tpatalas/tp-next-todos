import { TypesLayout } from '@layout/layout.types';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { SidebarNavigationWrapper } from '..';
import { screen } from '@testing-library/react';

type Props = Pick<TypesLayout, 'path'>;

const appClassName =
  'left-0 top-0 w-72 bg-slate-50 pl-2 pr-0 pt-3 md:top-[4.6rem] md:flex md:w-full md:max-w-[16.5rem] md:flex-col md:bg-transparent md:pl-2 md:pr-0 md:pt-0';
const homeClassName = 'top-[0rem] w-full';

describe('SidebarNavigationWrapper', () => {
  const renderWithSidebarNavigationWrapper = ({ path }: Props) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <SidebarNavigationWrapper path={path}>
        <></>
      </SidebarNavigationWrapper>,
      options,
    );
  };

  it('should render the css correctly when path is on the app', () => {
    const { container } = renderWithSidebarNavigationWrapper({ path: 'app' });
    const divElement = screen.getByTestId('sidebarNavigationWrapper');

    expect(container).toBeInTheDocument();
    expect(divElement).toHaveClass(appClassName);
    expect(divElement).not.toHaveClass(homeClassName);
  });

  it('should render the css correctly when path is on the home', () => {
    const { container } = renderWithSidebarNavigationWrapper({ path: 'home' });
    const divElement = screen.getByTestId('sidebarNavigationWrapper');

    expect(container).toBeInTheDocument();
    expect(divElement).not.toHaveClass(appClassName);
    expect(divElement).toHaveClass(homeClassName);
  });
});
