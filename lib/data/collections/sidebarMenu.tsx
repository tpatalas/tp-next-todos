import { PATHNAME } from '@constAssertions/data';
import {
  ICON_HOME,
  ICON_HOME_FILL,
  ICON_FLAG,
  ICON_FLAG_FILL,
  ICON_LABEL_IMPORTANT,
  ICON_LABEL_IMPORTANT_FILL,
  ICON_LIST,
  ICON_DONE_ALL,
} from '@data/materialSymbols';
import { TypesSidebarMenu } from '@lib/types';

export const DATA_SIDEBAR_MENU: TypesSidebarMenu[] = [
  {
    name: "Today's Focus",
    tooltip: "Today's Focus",
    icon: ICON_HOME,
    iconActive: ICON_HOME_FILL,
    iconColor: 'fill-blue-600',
    path: PATHNAME['app'],
  },
  {
    name: 'Urgent',
    tooltip: 'Urgent todos',
    icon: ICON_FLAG,
    iconActive: ICON_FLAG_FILL,
    iconColor: 'fill-red-600',
    path: PATHNAME['urgent'],
  },
  {
    name: 'Important',
    tooltip: 'Important todos',
    icon: ICON_LABEL_IMPORTANT,
    iconActive: ICON_LABEL_IMPORTANT_FILL,
    iconColor: 'fill-yellow-500',
    path: PATHNAME['important'],
  },
  {
    name: 'Show All',
    tooltip: 'Show all incomplete todos',
    icon: ICON_LIST,
    iconActive: ICON_LIST,
    iconColor: 'fill-purple-600',
    path: PATHNAME['showAll'],
  },
  {
    name: 'Completed',
    tooltip: 'Completed todos',
    icon: ICON_DONE_ALL,
    iconActive: ICON_DONE_ALL,
    iconColor: 'fill-green-600',
    path: PATHNAME['completed'],
  },
];
