import { IDB_STORE, STORAGE_KEY } from '@data/dataTypesConst';
import { clear, count } from '@lib/dataConnections/indexedDB';
import { useCallback, useEffect, useState } from 'react';

export const ClientStoragesResetEffect = () => {
  const [isConfirmMessage, setIsConfirmMessage] = useState(false);
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

    const confirmMessage =
      'Client storage has been deleted or upgraded. The page will now reload to ensure data consistency.';

    const shouldReload = isClientStorageEmpty && !isConfirmMessage && window.confirm(confirmMessage);

    if (shouldReload) {
      resetClientStores();
      setIsConfirmMessage(true);
    }
  }, [isConfirmMessage, resetClientStores]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      showMessageBeforeReload();
    }, 2000);
    window.addEventListener('focus', showMessageBeforeReload);
    return () => {
      window.removeEventListener('focus', showMessageBeforeReload);
      clearTimeout(timeId);
    };
  }, [resetClientStores, showMessageBeforeReload]);

  return null;
};
