import { renderWithRecoilRoot } from '@lib/utils';
import { atomNetworkStatusEffect } from '@states/atoms';
import { screen } from '@testing-library/react';
import { snapshot_UNSTABLE } from 'recoil';
import { NetworkStatus } from '../networkStatus';

describe('NetworkStatus', () => {
  beforeEach(() => renderWithRecoilRoot(<NetworkStatus />));

  it('should not render offline component when online', () => {
    const online = snapshot_UNSTABLE().getLoadable(atomNetworkStatusEffect).valueOrThrow();
    const offlineComponent = screen.queryByText(/You are offline!/i);
    expect(online).toBe(true);
    expect(offlineComponent).not.toBeInTheDocument();

    //offline test is done on `navigation.test.tsx`
  });
});
