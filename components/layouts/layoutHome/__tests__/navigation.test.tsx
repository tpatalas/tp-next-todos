import { renderWithRecoilRoot } from '@lib/utils';
import { atomNetworkStatusEffect } from '@states/atoms';
import { fireEvent, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import { snapshot_UNSTABLE } from 'recoil';
import Navigation from '../navigation';

const online = snapshot_UNSTABLE((state) => {
  return state.getLoadable(atomNetworkStatusEffect).getValue();
});

jest.mock('@components/notifications/networkStatus', () => ({
  NetworkStatus: jest.fn(({ children }) => online && <div data-testid='NetworkStatus'>{children}</div>),
}));

describe('Navigation', () => {
  beforeEach(() => renderWithRecoilRoot(<Navigation />));

  it('should route to Home page onClick', () => {
    const divComponent = screen.getByText(/I am a LOGO/);
    fireEvent.click(divComponent);
    expect(singletonRouter).toMatchObject({
      asPath: '/',
    });
  });

  it('should network offline state does not render component', () => {
    const componentOnOffline = screen.queryByText(/You are offline/i);
    expect(componentOnOffline).not.toBeInTheDocument();
  });

  it('should network online state reserve when It is online', () => {
    expect(online).toBeTruthy();
  });

  it('should network offline render the offline component, only rendering on offline', () => {
    const componentOnOffline = screen.getByTestId(/NetworkStatus/i);
    expect(componentOnOffline).toBeInTheDocument();
  });
});
