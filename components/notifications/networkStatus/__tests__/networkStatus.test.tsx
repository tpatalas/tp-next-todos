import { screen } from '@testing-library/react';
import { snapshot_UNSTABLE } from 'recoil';
import { atomEffectNetworkStatus } from '@states/atomEffects/misc';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { NetworkStatus } from '..';

describe('NetworkStatus', () => {
  beforeEach(() => renderWithRecoilRootAndSession(<NetworkStatus />));

  it('should not render offline component when online', () => {
    const online = snapshot_UNSTABLE().getLoadable(atomEffectNetworkStatus).valueOrThrow();
    const offlineComponent = screen.queryByText(/You are offline!/i);
    expect(online).toBe(true);
    expect(offlineComponent).not.toBeInTheDocument();
  });
});
