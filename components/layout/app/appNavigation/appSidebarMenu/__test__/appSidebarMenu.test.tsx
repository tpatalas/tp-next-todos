import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { AppSidebarMenu } from '..';
import { DATA_SIDEBAR_MENU } from '@collections/sidebarMenu';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';

describe('AppSidebarMenu', () => {
  const renderWithAppSidebarMenu = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <AppSidebarMenu />
        <UserSessionEffect />
      </>,
      options,
    );
  };

  it('should render the text of the sidebar menu', () => {
    const { container } = renderWithAppSidebarMenu();
    const expectTextPresence = () =>
      DATA_SIDEBAR_MENU.forEach((item) => {
        const textPresence = screen.getByText(item.name);
        expect(textPresence).toBeInTheDocument();
      });

    expectTextPresence();
    expect(container).toBeInTheDocument();
  });

  it('should render the correct number of todos called TodosCount based on the pathname', async () => {
    mockRouter.push('/app');
    renderWithAppSidebarMenu();
    const defaultTodosCountOnTodaysFocus = '7'; // initial default todosCount is 7 when user is not session and router is equals to /app

    expect(mockRouter).toMatchObject({ pathname: '/app' });

    await waitFor(() => {
      const todosCountApp = screen.queryByText(defaultTodosCountOnTodaysFocus);
      expect(todosCountApp).toBeInTheDocument();
    });
  });

  it('should route to the correct path when one of the sidebar is clicked', () => {
    mockRouter.push('/app');
    renderWithAppSidebarMenu();

    const urgentButton = screen.getByText('Urgent');

    expect(mockRouter).toMatchObject({ pathname: '/app' });

    fireEvent.click(urgentButton);

    expect(mockRouter).toMatchObject({ pathname: '/app/urgent' });
  });
});
