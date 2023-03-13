import {
  TypesIDB,
  TypesNextAuthError,
  TypesNotification,
  TypesPathnameImage,
  TypesSidebarMenu,
  TypesSvgLogo,
} from 'lib/types';
import { IDB, IDB_STORE, IDB_VERSION, NOTIFICATION, PATHNAME, SVG_LOGO } from './dataTypesConst';
import {
  ICON_DELETE,
  ICON_DONE_ALL,
  ICON_ERROR,
  ICON_EVENT_AVAILABLE,
  ICON_EVENT_BUSY,
  ICON_FLAG,
  ICON_FLAG_FILL,
  ICON_HOME,
  ICON_HOME_FILL,
  ICON_INFO,
  ICON_LABEL_IMPORTANT,
  ICON_LABEL_IMPORTANT_FILL,
  ICON_LIST,
  ICON_TASK_ALT,
} from './materialSymbols';

export const DATA_NOTIFICATION: TypesNotification[] = [
  {
    _id: NOTIFICATION['completeTodo'],
    message: 'Todo completed',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['unCompleteTodo'],
    message: 'Todo uncompleted',
    iconPath: ICON_INFO,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['deleteTodo'],
    message: 'Todo deleted',
    iconPath: ICON_DELETE,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['createdTodo'],
    message: 'Successfully created todo',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-green-500',
  },
  {
    _id: NOTIFICATION['updatedTodo'],
    message: 'Todo updated',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['updatedDueDate'],
    message: 'Due date updated',
    iconPath: ICON_EVENT_AVAILABLE,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['removedDueDate'],
    message: 'Due date removed',
    iconPath: ICON_EVENT_BUSY,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['actionUndone'],
    message: 'Action undone',
    iconPath: ICON_INFO,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['offline'],
    message: 'You are offline',
    description: 'Check your internet connection.',
    iconPath: ICON_ERROR,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['createdLabel'],
    message: 'Successfully created label',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-green-500',
  },
  {
    _id: NOTIFICATION['updatedLabel'],
    message: 'label updated',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['deleteLabel'],
    message: 'Label deleted',
    iconPath: ICON_DELETE,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
];

export const DATA_IDB: TypesIDB[] = [
  {
    dbName: IDB['todo'],
    store: IDB_STORE['todoItems'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['idMap'],
    store: IDB_STORE['idMaps'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['user'],
    store: IDB_STORE['users'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['setting'],
    store: IDB_STORE['settings'],
    currentVersion: IDB_VERSION['current'],
  },
];

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

export const DATA_PATHNAME_IMAGE: TypesPathnameImage[] = [
  {
    path: 'focus.webp',
    alt: 'Placeholder image of focus',
    title: "Todos for today's focus",
    description:
      "Today's focus auto-selects important todos based on your priorities and capacity. Stay motivated and achieve your daily goals with increased productivity.",
  },
  {
    path: 'urgent.webp',
    alt: 'Placeholder image of urgent',
    title: 'Your urgent todos',
    description: 'Prioritize time-sensitive todos that require immediate attention.',
  },
  {
    path: 'important.webp',
    alt: 'Placeholder image of important',
    title: 'Your important todos',
    description: 'Identify todos that are crucial to your long-term goals and success.',
  },
  {
    path: 'showall.webp',
    alt: 'Placeholder image of showall',
    title: 'All uncompleted todos',
    description:
      'This is a complete list of all your todos, including those that have not yet been completed. Keep track of your progress here.',
  },
  {
    path: 'completed.webp',
    alt: 'Placeholder image of completed',
    title: 'Your completed todos',
    description: 'While there are no completed todos yet, every step counts towards achieving your goals.',
  },
  {
    path: 'label.webp',
    alt: 'Placeholder image of label',
    title: 'Your labeled todos',
    description: 'Organize your todos by using labels to keep track of your progress and priorities.',
  },
];

export const DATA_SVG_LOGO: TypesSvgLogo[] = [
  {
    name: SVG_LOGO['google'],
    viewBox: '0 0 32 32',
    className:
      'flex w-full flex-row items-center justify-center rounded-lg border border-slate-100 p-2 shadow-md shadow-slate-300 text-slate-800 transition-all hover:shadow-lg',
    path: (
      <>
        <path
          fill='#00ac47'
          d='M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16'
        />
        <path
          fill='#4285f4'
          d='M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16'
        />
        <path
          fill='#ffba00'
          d='M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z'
        />
        <polygon
          fill='#2ab2db'
          points='8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374'
        />
        <path
          fill='#ea4435'
          d='M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z'
        />
        <polygon
          fill='#2ab2db'
          points='8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626'
        />
        <path
          fill='#4285f4'
          d='M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z'
        />
      </>
    ),
  },
  {
    name: SVG_LOGO['github'],
    className:
      'flex w-full flex-row items-center justify-center rounded-lg border border-slate-800 p-2 bg-gray-800 shadow-lg shadow-slate-500 hover:shadow-slate-600 transition-all text-white',
    viewBox: '0 0 24 24',
    path: (
      <>
        <path
          id='Path'
          fill='#ffffff'
          stroke='none'
          d='M 12 2.2467 C 7.095412 2.246902 2.914784 5.803928 2.129133 10.645183 C 1.343482 15.486437 4.184698 20.182985 8.83752 21.73419 C 9.33752 21.821711 9.52502 21.521721 9.52502 21.25919 C 9.52502 21.0217 9.51251 20.23419 9.51251 19.3967 C 7 19.85919 6.35 18.784229 6.15 18.221729 C 5.928076 17.674654 5.576275 17.189846 5.125 16.8092 C 4.775 16.6217 4.275 16.159201 5.11249 16.146721 C 5.761497 16.217144 6.335357 16.599705 6.65 17.17169 C 6.926231 17.667921 7.388598 18.033815 7.935032 18.188601 C 8.481467 18.343386 9.067038 18.274334 9.56248 17.996691 C 9.605771 17.488312 9.832339 17.012993 10.2 16.659229 C 7.975 16.409229 5.65 15.54669 5.65 11.72173 C 5.635948 10.727876 6.002686 9.766307 6.675 9.03423 C 6.369282 8.170449 6.405053 7.222513 6.775 6.38423 C 6.775 6.38423 7.61247 6.121719 9.525 7.409229 C 11.161288 6.959204 12.888712 6.959204 14.525 7.409229 C 16.437481 6.10923 17.275 6.38423 17.275 6.38423 C 17.644997 7.222502 17.680769 8.170457 17.375 9.03423 C 18.049339 9.765055 18.416397 10.727462 18.4 11.72173 C 18.4 15.5592 16.062481 16.409229 13.8375 16.659229 C 14.320393 17.148668 14.56673 17.823814 14.5125 18.50923 C 14.5125 19.84675 14.49999 20.921709 14.49999 21.25923 C 14.49999 21.52174 14.68749 21.83423 15.18749 21.73423 C 19.831736 20.170498 22.659912 15.473108 21.868879 10.636937 C 21.077848 5.800766 16.900436 2.24925 12 2.2467 Z'
        />
      </>
    ),
  },
];

export const DATA_NEXTAUTH_ERROR: TypesNextAuthError[] = [
  {
    _id: 'default',
    message: 'Unable to sign in.',
  },
  {
    _id: 'signin',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthsignin',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthcallback',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthcreateaccount',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'emailcreateaccount',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'callback',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthaccountnotlinked',
    message: 'To confirm your identity, sign in with the same account you used originally.',
  },
  {
    _id: 'emailsignin',
    message: 'The e-mail could not be sent.',
  },
  {
    _id: 'credentialssignin',
    message: 'Sign in failed. Check the details you provided are correct.',
  },
  {
    _id: 'sessionrequired',
    message: 'Please sign in to access this page.',
  },
];
