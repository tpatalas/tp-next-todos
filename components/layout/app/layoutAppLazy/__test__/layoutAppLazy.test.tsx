import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutAppLazy } from '..';
import { screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MockStateEffect, PropsMockStateEffect } from './mockStateEffect';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';
import { atomLabelModalOpen, atomTodoModalOpen } from '@states/modals';

describe('LayoutAppLazy', () => {
  const renderWithLayoutAppLazy = <T,>({
    mediaQueryState,
    notificationId,
    isTodoModalOpen,
    isMinimizedTodoModalOpen,
    isLabelModalOpen,
    node,
  }: PropsMockStateEffect<T>) => {
    const options = { session: null, node: node };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutAppLazy path='app' />
        <MockStateEffect
          mediaQueryState={mediaQueryState}
          notificationId={notificationId}
          isTodoModalOpen={isTodoModalOpen}
          isMinimizedTodoModalOpen={isMinimizedTodoModalOpen}
          isLabelModalOpen={isLabelModalOpen}
        />
        <UserSessionEffect />
      </>,
      options,
    );
  };

  it('should set the atomLayoutType correctly when path is app', () => {
    const { container } = renderWithLayoutAppLazy({});
    const layoutTypeText = screen.getByText('Layout Type: app');

    expect(container).toBeInTheDocument();
    expect(layoutTypeText).toBeInTheDocument();
  });

  it('should render the correct htmlTitleTag text when route equals to urgent', () => {
    mockRouter.push('/app/urgent');
    renderWithLayoutAppLazy({});
    const htmlTitleTagText = screen.getByText('Html Title Tag: Priority | Urgent');

    expect(mockRouter).toMatchObject({ pathname: '/app/urgent' });
    expect(htmlTitleTagText).toBeInTheDocument();
  });

  it('should navigation close (or false) when layout type equals to app and breakpoint is above medium', () => {
    renderWithLayoutAppLazy({ mediaQueryState: false });
    const navigationOpenTextFalse = screen.getByText('Navigation state: false');

    expect(navigationOpenTextFalse).toBeInTheDocument();
  });

  it('should navigation open (or true) when layout type equals to app and breakpoint is not above medium', () => {
    renderWithLayoutAppLazy({ mediaQueryState: true });
    const navigationOpenTextFalse = screen.getByText('Navigation state: true');

    expect(navigationOpenTextFalse).toBeInTheDocument();
  });

  it('should have the class "overflow-hidden" on the body element when layoutType is app', () => {
    renderWithLayoutAppLazy({});
    const bodyElement = document.body;

    expect(bodyElement).toHaveClass('overflow-hidden');
  });

  it('should show the notification message when notification is open', () => {
    renderWithLayoutAppLazy({ notificationId: 'updatedTodo' });
    const notificationText = screen.getByText('Todo updated');

    expect(notificationText).toBeInTheDocument();
  });

  it('should render the correct modal text when todoModal is open', async () => {
    renderWithLayoutAppLazy({ isTodoModalOpen: true, node: atomTodoModalOpen(undefined) });

    await waitFor(() => {
      const todoModalText = screen.queryByText('active');
      expect(todoModalText).toBeInTheDocument();
    });
  });

  it('should render the minimized modal text when minimizedTodoModal is open', async () => {
    renderWithLayoutAppLazy({ isMinimizedTodoModalOpen: true });

    await waitFor(() => {
      const minimizedModalTitleText = screen.queryByText('test-title');
      expect(minimizedModalTitleText).toBeInTheDocument();
    });
  });

  it('should render the labelModal content when labelModal is open', async () => {
    renderWithLayoutAppLazy({ isLabelModalOpen: true, node: atomLabelModalOpen('201') });

    await waitFor(() => {
      const labelModalText = screen.queryByText('active');
      expect(labelModalText).toBeInTheDocument();
    });
  });
});
