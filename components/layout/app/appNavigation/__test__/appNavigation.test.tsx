import 'fake-indexeddb/auto';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { AppNavigation } from '..';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';
import { RecoilState } from 'recoil';
import { atomLayoutNavigationOpen } from '@layout/layout.states';
import mockRouter from 'next-router-mock';
import { atomTodoModalOpen } from '@states/modals';

describe('AppNavigation', () => {
  const renderWithAppNavigation = <T,>(node?: RecoilState<T>) => {
    const options = { session: null, node: node };
    return renderWithRecoilRootAndSession(
      <>
        <AppNavigation />
        <UserSessionEffect />
      </>,
      options,
    );
  };

  it('should render the child components correctly', async () => {
    const { container } = renderWithAppNavigation();
    const logoTestId = screen.getByTestId('MainWhite-testid');
    const sidebarButtonTestId = screen.getByTestId('sidebarButton-testid');
    const createTodoButtonText = screen.getByText('Create todo');
    const appSidebarMenuText = screen.getByText('Urgent');

    expect(container).toBeInTheDocument();
    expect(logoTestId).toBeInTheDocument();
    expect(sidebarButtonTestId).toBeInTheDocument();
    expect(createTodoButtonText).toBeInTheDocument();
    expect(appSidebarMenuText).toBeInTheDocument();

    await waitFor(() => {
      const offSessionLabelText = screen.queryByText('Personal');
      expect(offSessionLabelText).toBeInTheDocument();
    });
  });

  it('should clicking the sidebarButton will hide/show the "Create todo" text', async () => {
    renderWithAppNavigation(atomLayoutNavigationOpen('app'));
    const sidebarButtonTestId = screen.getByTestId('sidebarButton-testid');

    expect(sidebarButtonTestId).toBeInTheDocument();

    await waitFor(() => {
      const navigationOpenInactive = screen.queryByText('inactive');
      expect(navigationOpenInactive).toBeInTheDocument();
    });

    fireEvent.click(sidebarButtonTestId);

    await waitFor(() => {
      const navigationOpenActive = screen.queryByText('active');
      expect(navigationOpenActive).toBeInTheDocument();
    });
  });

  it('should route to the home when click the logo button while session is null', async () => {
    mockRouter.push('/app');
    renderWithAppNavigation();
    const logoTestId = await screen.findByTestId('MainWhite-testid');

    expect(mockRouter).toMatchObject({ pathname: '/app' });
    expect(logoTestId).toBeInTheDocument();

    fireEvent.click(logoTestId);

    expect(mockRouter).toMatchObject({ pathname: '/' });
  });

  it('should set the true on "atomTodoModalOpen" and button gets disabled when "Create todo" button is clicked', async () => {
    renderWithAppNavigation(atomTodoModalOpen(undefined));
    const createTodoButton = await screen.findByRole('button', { name: /Create todo/i });

    expect(createTodoButton).toBeInTheDocument();
    expect(createTodoButton).not.toBeDisabled();
    await waitFor(() => {
      const todoModalInactive = screen.queryByText('inactive');
      expect(todoModalInactive).toBeInTheDocument();
    });

    fireEvent.click(createTodoButton);

    expect(createTodoButton).toBeDisabled();
    await waitFor(() => {
      const todoModalActive = screen.queryByText('active');
      expect(todoModalActive).toBeInTheDocument();
    });
  });
});
