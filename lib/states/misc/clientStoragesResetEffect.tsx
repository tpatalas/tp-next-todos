import { IDB_STORE, STORAGE_KEY } from '@data/dataTypesConst';
import { clear, count } from '@lib/dataConnections/indexedDB';
import { useCallback, useEffect } from 'react';

export const ClientStoragesResetEffect = () => {
  const clientStorageChecker = async () => {
    const todosLocalStorage = localStorage.getItem(STORAGE_KEY['todoIds']);
    const labelsLocalStorage = localStorage.getItem(STORAGE_KEY['labels']);
    const localStorageLastUpdate = todosLocalStorage || labelsLocalStorage;
    const indexedDBTodosCount = await count(IDB_STORE['todoItems']);
    const indexedDBLabelsCount = await count(IDB_STORE['idMaps']);

    return !localStorageLastUpdate || !indexedDBTodosCount || !indexedDBLabelsCount;
  };

  const resetClientStores = useCallback(async () => {
    const isClientStorageEmpty = await clientStorageChecker();

    if (isClientStorageEmpty) {
      await clear(IDB_STORE['todoItems']);
      await clear(IDB_STORE['idMaps']);
      localStorage.removeItem(STORAGE_KEY['todoIds']);
      localStorage.removeItem(STORAGE_KEY['labels']);
      window.location.reload();
    }
  }, []);

  const showMessageBeforeReload = useCallback(async () => {
    const isClientStorageEmpty = await clientStorageChecker();

    const confirmMessage = 'Client storage deletion detected. The page will be fully loaded.';
    const shouldReload = isClientStorageEmpty && window.confirm(confirmMessage);

    shouldReload && resetClientStores();
  }, [resetClientStores]);

  useEffect(() => {
    window.addEventListener('focus', showMessageBeforeReload);
    return () => {
      window.removeEventListener('focus', showMessageBeforeReload);
    };
  }, [resetClientStores, showMessageBeforeReload]);

  return null;
};
