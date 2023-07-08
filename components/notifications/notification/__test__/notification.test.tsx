import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { Notification } from '..';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MockNotificationState } from './__mock__/mockNotificationState';
import { NOTIFICATION } from '@constAssertions/ui';
import { DATA_NOTIFICATION } from '@collections/notification';

jest.useFakeTimers();

describe('Notification', () => {
  const renderWithNotification = (isNotificationOpen: boolean, notificationID?: NOTIFICATION) => {
    return renderWithRecoilRootAndSession(
      <>
        <Notification />
        <MockNotificationState
          isNotificationOpen={isNotificationOpen}
          notificationID={notificationID}
        />
      </>,
    );
  };

  it('should not render the notification when notification open state is set to false', async () => {
    const { container } = renderWithNotification(false);

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      const notificationIconTestid = screen.queryByTestId('svgIcon-testid');
      expect(notificationIconTestid).not.toBeInTheDocument();
    });
  });

  it('should render the notification message and description with the proper notification ID', async () => {
    await Promise.all(
      DATA_NOTIFICATION.map(async (item) => {
        renderWithNotification(true, item._id);
        const notificationMessageText = await screen.findByText(item.message);

        expect(notificationMessageText).toBeInTheDocument();
      }),
    );
  });

  it('should render the notification when notification open state is set to true', async () => {
    renderWithNotification(true);

    await waitFor(() => {
      const notificationIconTestid = screen.queryAllByTestId('svgIcon-testid')[0];
      expect(notificationIconTestid).toBeInTheDocument();
    });
  });

  it('should close the notification when notification iconButton is clicked', async () => {
    renderWithNotification(true);
    const iconButtonTestId = await screen.findByTestId('globalButton-testid');

    await waitFor(() => {
      const notificationIconTestid = screen.queryAllByTestId('svgIcon-testid')[0];
      expect(notificationIconTestid).toBeInTheDocument();
    });
    expect(iconButtonTestId).toBeInTheDocument();

    fireEvent.click(iconButtonTestId);

    expect(iconButtonTestId).not.toBeInTheDocument();
  });

  it('should close the notification after 5 seconds', async () => {
    renderWithNotification(true);

    await waitFor(() => {
      const iconButtonTestId = screen.queryByTestId('globalButton-testid');
      expect(iconButtonTestId).toBeInTheDocument();
    });

    jest.advanceTimersByTime(6000);

    await waitFor(() => {
      const iconButtonTestId = screen.queryByTestId('globalButton-testid');
      expect(iconButtonTestId).not.toBeInTheDocument();
    });
  });
});
