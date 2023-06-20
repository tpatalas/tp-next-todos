import { TypesLayout } from '@layout/layout.types';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutFooter } from '..';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { screen, waitFor } from '@testing-library/react';

type Props = Pick<TypesLayout, 'path'> & { isSidebarOpen: boolean };

const SidebarOpenEffect = ({ isSidebarOpen, path }: Props) => {
  const setSidebarOpen = useSetRecoilState(atomLayoutNavigationOpen(path));

  useEffect(() => {
    setSidebarOpen(isSidebarOpen ?? false);
  }, [isSidebarOpen, setSidebarOpen]);

  return null;
};

const testTextPresence = async ({ text, isTextPresent }: { text: string; isTextPresent: boolean }) => {
  await waitFor(() => {
    const element = screen.queryByText(text);
    if (isTextPresent) return expect(element).toBeInTheDocument();
    expect(element).not.toBeInTheDocument();
  });
};

const appText = 'Create todo';
const homeText = 'Contact';

describe('LayoutFooter', () => {
  const renderWithLayoutFooter = ({ isSidebarOpen, path }: Props) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutFooter path={path}>LayoutFooter-text</LayoutFooter>
        <SidebarOpenEffect
          path={path}
          isSidebarOpen={isSidebarOpen}
        />
      </>,
      options,
    );
  };

  it('should render the correct text when the path equals to app and sidebar is open', async () => {
    renderWithLayoutFooter({ isSidebarOpen: true, path: 'app' });

    await testTextPresence({ text: appText, isTextPresent: true });
    await testTextPresence({ text: homeText, isTextPresent: false });
  });

  it('should not render the text when the path equals to app and sidebar is not open', async () => {
    renderWithLayoutFooter({ isSidebarOpen: false, path: 'app' });

    await testTextPresence({ text: appText, isTextPresent: false });
    await testTextPresence({ text: homeText, isTextPresent: false });
  });

  it('should render the correct text when the path equals to home', async () => {
    renderWithLayoutFooter({ isSidebarOpen: true, path: 'home' });

    await testTextPresence({ text: appText, isTextPresent: false });
    await testTextPresence({ text: homeText, isTextPresent: true });
  });

  it('should not render the text when the path equals to home and sidebar is not open', async () => {
    renderWithLayoutFooter({ isSidebarOpen: false, path: 'home' });

    await testTextPresence({ text: appText, isTextPresent: false });
    await testTextPresence({ text: homeText, isTextPresent: false });
  });
});
