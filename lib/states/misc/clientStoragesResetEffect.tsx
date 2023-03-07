import { IDB, IDB_STORE, STORAGE_KEY } from '@data/dataTypesConst';
import { clear, count } from '@lib/dataConnections/indexedDB';
import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo } from 'react';

export const ClientStoragesResetEffect = () => {
  const { data: session } = useSession();
  const localKeys = useMemo(() => [STORAGE_KEY['todoIds'], STORAGE_KEY['labels']], []);
  const idbStores = useMemo(() => [IDB_STORE['todoItems'], IDB_STORE['idMaps'], IDB_STORE['users']], []);

  const clientStorageChecker = useCallback(async () => {
    const counts = await Promise.all(idbStores.map((storeName) => count(storeName)));
    const hasIDBStores = counts.every((count) => count > 0);
    const hasUpdateKeys = localKeys.every((key) => localStorage.getItem(key));

    return !hasUpdateKeys || !hasIDBStores;
  }, [idbStores, localKeys]);

  const showMessageBeforeReload = useCallback(async () => {
    const isClientStorageEmpty = await clientStorageChecker();

    const resetClientStores = async () => {
      if (isClientStorageEmpty) {
        await Promise.all(idbStores.map((storeName: IDB_STORE) => clear(storeName)));
        await Promise.all(localKeys.map((key: STORAGE_KEY) => localStorage.removeItem(key)));
      }
    };

    const confirmMessage =
      'Client storage has been cleared or upgraded. To ensure data consistency, the data will be regenerated.';

    if (!isClientStorageEmpty) return;
    const confirm = window.confirm(confirmMessage);
    if (confirm) {
      resetClientStores();
      window.location.reload();
      return;
    }
  }, [clientStorageChecker, idbStores, localKeys]);

  const clearClientData = useCallback(async () => {
    const allIDBs = await window.indexedDB.databases();
    if (session) return;
    await Promise.all(allIDBs.map((idb) => idb && deleteDB(idb.name as IDB)));
    await Promise.all(localKeys.map((key: STORAGE_KEY) => localStorage.removeItem(key)));
    return;
  }, [localKeys, session]);

  useEffect(() => {
    clearClientData();
    window.addEventListener('beforeunload', showMessageBeforeReload);
    return () => {
      window.removeEventListener('beforeunload', showMessageBeforeReload);
    };
  }, [clearClientData, clientStorageChecker, session, showMessageBeforeReload]);

  return null;
};
