import { PATHNAME, PATHNAME_IMAGE, SVG_LOGO } from '@constAssertions/data';
import { IDB, IDB_STORE, IDB_VERSION } from '@constAssertions/storage';
import { NOTIFICATION } from '@constAssertions/ui';
import { ReactElement } from 'react';
import { Types } from '..';

export type CollectTypesData = TypesIndexedDB;

export interface TypesIndexedDB {
  storeName: TypesIDB['store'];
  dbVersion: number;
}

export interface TypesNotification {
  _id: NOTIFICATION;
  message: string;
  description?: string;
  iconPath: Types['path'];
  iconPresetStyle: string;
}

export interface TypesIDB {
  dbName: IDB;
  store: IDB_STORE;
  currentVersion: IDB_VERSION;
}

export interface TypesSidebarMenu {
  name: string;
  tooltip: string;
  icon: string;
  iconActive: string;
  iconColor: string;
  path: PATHNAME;
}
export interface TypesPathnameImage {
  path: PATHNAME_IMAGE;
  alt: string;
  title: string;
  description: string;
}

export interface TypesSvgLogo {
  name: SVG_LOGO;
  className: Types['className'];
  viewBox: string;
  path: ReactElement;
}

export interface TypesNextAuthError {
  _id: string;
  message: string;
}
