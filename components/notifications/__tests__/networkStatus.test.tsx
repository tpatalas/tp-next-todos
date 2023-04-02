import { screen } from '@testing-library/react';
import { snapshot_UNSTABLE } from 'recoil';
import { NetworkStatus } from '../networkStatus';
import { renderWithRecoilRoot } from '@stateLogics/utils';
import { atomEffectNetworkStatus } from '@states/atomEffects/misc';

describe('NetworkStatus', () => {
  beforeEach(() => renderWithRecoilRoot(<NetworkStatus />));

  it('should not render offline component when online', () => {
    const online = snapshot_UNSTABLE().getLoadable(atomEffectNetworkStatus).valueOrThrow();
    const offlineComponent = screen.queryByText(/You are offline!/i);
    expect(online).toBe(true);
    expect(offlineComponent).not.toBeInTheDocument();
  });
});
