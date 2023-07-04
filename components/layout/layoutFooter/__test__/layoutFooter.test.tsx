import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutFooter } from '..';
import { screen, waitFor } from '@testing-library/react';
import { PropsSidebarOpenEffect, MockSidebarOpenEffect } from './__mock__/mockSidebarOpenEffect';

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
  const renderWithLayoutFooter = ({ isSidebarOpen, path }: PropsSidebarOpenEffect) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutFooter path={path}>LayoutFooter-text</LayoutFooter>
        <MockSidebarOpenEffect
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
