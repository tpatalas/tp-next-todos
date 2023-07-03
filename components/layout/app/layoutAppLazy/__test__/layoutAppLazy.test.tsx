import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutAppLazy } from '..';
import { PropsMockStateEffect, MockLayoutAppLazyEffect } from './__mock__/mockStateEffect';
import { atomTodoModalOpen, atomLabelModalOpen } from '@states/modals';
import { screen, waitFor } from '@testing-library/dom';
import mockRouter from 'next-router-mock';

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
        <MockLayoutAppLazyEffect
          mediaQueryState={mediaQueryState}
          notificationId={notificationId}
          isTodoModalOpen={isTodoModalOpen}
          isMinimizedTodoModalOpen={isMinimizedTodoModalOpen}
          isLabelModalOpen={isLabelModalOpen}
        />
      </>,
      options,
    );
  };

  it('should set the atomLayoutType correctly when path is app', async () => {
    const { container } = renderWithLayoutAppLazy({});
    expect(container).toBeInTheDocument();

    await waitFor(() => {
      const layoutTypeText = screen.queryByText('Layout Type: app');
      expect(layoutTypeText).toBeInTheDocument();
    });
  });

  it('should render the correct htmlTitleTag text when route equals to urgent', async () => {
    mockRouter.push('/app/urgent');
    renderWithLayoutAppLazy({});

    expect(mockRouter).toMatchObject({ pathname: '/app/urgent' });

    await waitFor(() => {
      const htmlTitleTagText = screen.queryByText('Html Title Tag: Priority | Urgent');
      expect(htmlTitleTagText).toBeInTheDocument();
    });
  });

  it('should navigation close (or false) when layout type equals to app and breakpoint is above medium', async () => {
    renderWithLayoutAppLazy({ mediaQueryState: false });

    await waitFor(() => {
      const navigationOpenTextFalse = screen.queryByText('Navigation state: false');
      expect(navigationOpenTextFalse).toBeInTheDocument();
    });
  });

  it('should navigation open (or true) when layout type equals to app and breakpoint is not above medium', async () => {
    renderWithLayoutAppLazy({ mediaQueryState: true });

    await waitFor(() => {
      const navigationOpenTextFalse = screen.queryByText('Navigation state: true');
      expect(navigationOpenTextFalse).toBeInTheDocument();
    });
  });

  it('should have the class "overflow-hidden" on the body element when layoutType is app', () => {
    renderWithLayoutAppLazy({});
    const bodyElement = document.body;

    expect(bodyElement).toHaveClass('overflow-hidden');
  });

  it('should show the notification message when notification is open', async () => {
    renderWithLayoutAppLazy({ notificationId: 'updatedTodo' });

    await waitFor(() => {
      const notificationText = screen.queryByText('Todo updated');
      expect(notificationText).toBeInTheDocument();
    });
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
