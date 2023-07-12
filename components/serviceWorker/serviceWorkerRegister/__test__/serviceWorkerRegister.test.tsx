import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { ServiceWorkerRegister } from '..';
import { mockServiceWorkerRegister } from './__mock__/mockServiceWorkerRegister';
import { serviceWorkerPath } from '@serviceWorker/serviceWorker.consts';

describe('ServiceWorkerRegister', () => {
  const renderWithServiceWorkerRegister = () => renderWithRecoilRootAndSession(<ServiceWorkerRegister />);

  it('should register the service worker on mount', () => {
    const mockServiceWorker = mockServiceWorkerRegister();
    const { container } = renderWithServiceWorkerRegister();

    expect(container).toBeInTheDocument();
    expect(mockServiceWorker).toHaveBeenCalledWith(serviceWorkerPath);
  });
});
