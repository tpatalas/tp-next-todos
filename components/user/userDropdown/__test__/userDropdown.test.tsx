import { PATH_IMAGE_APP } from '@constAssertions/data';
import { cloudflareLoader } from '@stateLogics/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockedImageUrl } from '__mock__/next';
import { mockedUserSession } from '__mock__/next-auth';
import { Session } from 'next-auth';
import 'whatwg-fetch';
import { UserDropdown } from '..';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';

describe('UserDropdown', () => {
  const renderWithSession = (session: Session | null) => {
    return renderWithRecoilRootAndSession(<UserDropdown />, { session: session });
  };

  const mockedSession = mockedUserSession({ userImage: true }) as Session;

  const renderWithQueryElement = (session: Session | null) => {
    const { container } = renderWithSession(session);
    const userSession = session;
    const userAvatarImageAlt = screen.getByAltText('User avatar');
    const userAvatarImage = { src: mockedSession.user.image as string, width: 64, quality: 90 };
    const optimizedUserImage = mockedImageUrl(userAvatarImage);
    const dropdownButton = screen.getByRole('button', { name: /open user menu/i });

    return { userSession, container, dropdownButton, userAvatarImageAlt, optimizedUserImage };
  };

  it('should render elements correctly when dropdown is not open while in session', () => {
    const { container } = renderWithQueryElement(mockedSession);

    const menu = screen.getByText(/Open user menu/i);
    const settings = screen.queryByText(/Settings/i);
    const signOut = screen.queryByText(/Sign out/i);

    expect(container).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
    expect(signOut).not.toBeInTheDocument();
    expect(settings).not.toBeInTheDocument();
  });

  it('should render elements correctly when dropdown is open while in session', async () => {
    const { container, dropdownButton } = renderWithQueryElement(mockedSession);

    fireEvent.click(dropdownButton);

    expect(container).toBeInTheDocument();
    await waitFor(() => {
      const settings = screen.getByText(/Settings/i);
      expect(settings).toBeInTheDocument();
    });
    await waitFor(() => {
      const signOut = screen.getByText(/Sign out/i);
      expect(signOut).toBeInTheDocument();
    });
  });

  it('should render the user image correctly whether button is clicked or not while in session', async () => {
    const { container, dropdownButton, userAvatarImageAlt, optimizedUserImage } =
      renderWithQueryElement(mockedSession);

    expect(container).toBeInTheDocument();
    expect(userAvatarImageAlt).toBeInTheDocument();
    expect(userAvatarImageAlt.getAttribute('src')).toEqual(optimizedUserImage);
    expect(userAvatarImageAlt.getAttribute('data-loader')).toBeNull();

    fireEvent.click(dropdownButton);

    await waitFor(() => {
      expect(userAvatarImageAlt).toBeInTheDocument();
    });
  });

  it('should render default image when user image it available while in session', () => {
    const mockedSessionWithoutUserImage = mockedUserSession({ userImage: null });
    const { container, userAvatarImageAlt, optimizedUserImage } = renderWithQueryElement(
      mockedSessionWithoutUserImage,
    );

    const defaultUserImage = { src: PATH_IMAGE_APP['avatar'], width: 64, quality: 90 };
    const optimizedDefaultImageUrl = cloudflareLoader(defaultUserImage);

    expect(container).toBeInTheDocument();
    expect(userAvatarImageAlt).toBeInTheDocument();
    expect(userAvatarImageAlt.getAttribute('src')).not.toEqual(optimizedUserImage);
    expect(userAvatarImageAlt.getAttribute('src')).toEqual(optimizedDefaultImageUrl);
  });

  it('should buttonSignOut not be found when signOut button is clicked', async () => {
    const { container, dropdownButton } = renderWithQueryElement(mockedSession);

    fireEvent.click(dropdownButton);
    const buttonSignOut = await screen.findByText(/Sign out/i);

    expect(container).toBeInTheDocument();
    expect(buttonSignOut).toBeInTheDocument();

    fireEvent.click(buttonSignOut);
    expect(buttonSignOut).not.toBeInTheDocument();
  });

  it('should return userSession null when session is null', () => {
    const { container, userSession } = renderWithQueryElement(null);

    expect(container).toBeInTheDocument();
    expect(userSession).toBeNull();
  });
});
