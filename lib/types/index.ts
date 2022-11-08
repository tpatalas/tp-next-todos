import {
  CONDITION,
  IDB,
  NOTIFICATION,
  OBJECT_ID,
  POSITION_X,
  POSITION_Y,
  PRIORITY_LEVEL,
  IDB_STORE,
  SCHEMA_TODO,
} from '@lib/data/stateObjects';
import { Placement } from '@popperjs/core';
import {
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import { TriggerType } from 'react-popper-tooltip';
import { AtomEffect } from 'recoil';
import { Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

/**
 * Global Collection Types
 */
export type Types = CollectTypesEditor &
  CollectTypesArrayObject &
  CollectTypesMISC &
  CollectTypesDataQuery;

/**
 * Recoil Observer
 */

/**
 * Types Editor
 */
type CollectTypesEditor = TypesEditor;

export interface TypesEditor {
  titleName: string;
  autoFocus: boolean;
  placeholder: string;
  initialValue: Descendant[];
  changeHandler: (value: Descendant[]) => void;
  editor: ReactEditor;
}

/**
 * Types Array Object
 */
type CollectTypesArrayObject = Todos & TypesTodo & Settings;

//* Todos
export interface Todos extends TodosEditors, TodosIds {
  createdDate: Date;
  dueDate: Date | null;
  completedDate: Date | null;
  completed: boolean;
  priorityLevel: PRIORITY_LEVEL | null;
  priorityRankScore: number;
}

export interface TodosIds {
  _id?: OBJECT_ID;
}

export interface TodosEditors {
  title: string;
  note: string;
}

export interface TypesTodo {
  todoItem: Todos;
  todo: TodosIds;
  index: number;
  completedFromToday: number;
  model: SCHEMA_TODO;
}

//* Users
export interface Users extends UsersIds {
  email: 'string';
}

export interface UsersIds {
  _id?: OBJECT_ID;
}

//* Users Settings
export interface Settings extends SettingsIds {
  createdDate: Date;
  taskCapacityPerDay: number;
  userId?: OBJECT_ID;
}

export interface SettingsIds {
  _id?: OBJECT_ID;
}

/**
 * Data Query Types
 */
type CollectTypesDataQuery = TypesQuery;

//* Query
export interface TypesQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
/**
 * Types Data
 * Non-Collectable Types
 */

export interface TypesNotification {
  _id: NOTIFICATION;
  message: string;
  description?: string;
  iconPath: Types['path'];
  iconPresetStyle: string;
}

export interface TypesIDB {
  name: IDB;
  store: IDB_STORE;
}

/**
 * Types MISC.
 */
type CollectTypesMISC = TypesIndexedDB &
  TypesWindow &
  TypesReactChildren &
  TypesUi &
  TypesTooltipAttributes &
  TypesSvgIconAttributes &
  TypesInputAttributes &
  TypesModals &
  TypesElement &
  TypesEffects &
  TypesStyleAttributes;

export interface TypesIndexedDB {
  storeName: TypesIDB['store'];
  dbVersion: number;
}

export interface TypesWindow {
  mediaQueryValue: number;
  divFocus: RefObject<HTMLDivElement>;
}

export interface TypesReactChildren {
  children: ReactNode;
  checkBox: Types['children'];
  footerButtons: Types['children'];
  headerButtons: Types['children'];
  headerIcons: Types['children'];
  headerContents: Types['children'];
}

export interface TypesUi {
  confirmTooltip: string | ReactElement;
  cancelTooltip: string | ReactElement;
  message: string;
  initialFocus: MutableRefObject<HTMLElement | null>;
  buttonStyle: string;
  show: boolean;
  onClose: (value: boolean) => void;
  isDialogOverlay: boolean;
  tooltipItem: Element;
  iconBgColor: string;
  itemTitle: string;
  initialVisible: boolean;
  divider: boolean;
  menuItemId: string | null;
  priorityImportant: string;
  priorityUrgent: string;
  priorityNormal: string;
  condition: CONDITION;
}

export interface TypesStyleAttributes {
  group: string;
  className: string;
  color: string;
  size: string;
  padding: string;
  contentWidth: string;
  checkedColor: string;
  checkBoxColor: string;
  borderRadius: string;
  margin: string;
  text: string;
  menuWidth: string;
  display: string;
  width: string;
  containerWidth: string;
}

export interface TypesTooltipAttributes {
  tooltip: string | ReactElement | null;
  kbd: string;
  delayShow: number;
  trigger: TriggerType | TriggerType[] | null;
  offset: [number, number];
  placement: Placement;
  onVisible: boolean;
  closeOnTriggerHidden: boolean;
}

export interface TypesSvgIconAttributes {
  path: string;
  height: string | number;
  width: string | number;
  viewBox: string;
  ariaHidden: boolean;
}

export interface TypesInputAttributes {
  checked: boolean;
  onChange: (value: unknown) => void;
}

export interface TypesModals {
  onClickConfirm: Types['onClick'];
  onClickCancel: Types['onClick'];
}

export interface TypesElement {
  name: string;
  type: 'button' | 'submit' | 'reset' | 'checkbox';
  onClick: MouseEventHandler<HTMLElement>;
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onDoubleClick: MouseEventHandler<HTMLElement>;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  positionX: POSITION_X;
  positionY: POSITION_Y;
  minimizedModalPadding: string;
  noValidate: boolean;
  ariaHidden: boolean;
  disabled: boolean;
  disableCloseOnClick: boolean;
}
export interface TypesEffects {
  queryKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFunction(): Promise<any>;
  // queryFunction<T>(): Promise<T>;
  storeName: IDB_STORE;
  enableIndexedDb: boolean;
  queryWithoutSuspense: boolean;
  refetchOnMutation: boolean;
  refetchOnFocus: boolean;
  refetchOnBlur: boolean;
  refetchDelayOnMutation: number;
  refetchInterval: number;
}
/**
 * Types Atom Effects - Recoil
 * none-collectable Types
 */

export type TypesRefetchEffect = <T>({
  queryKey,
  queryFunction,
  enableIndexedDb,
  storeName,
  refetchOnMutation,
  refetchDelayOnMutation,
  refetchOnFocus,
  refetchOnBlur,
  refetchInterval,
}: Partial<
  Pick<
    Types,
    | 'enableIndexedDb'
    | 'refetchOnMutation'
    | 'refetchDelayOnMutation'
    | 'refetchOnFocus'
    | 'refetchOnBlur'
    | 'refetchInterval'
  >
> &
  Pick<Types, 'queryFunction' | 'queryKey' | 'storeName'>) => AtomEffect<T>;

export type TypesAtomEffect<T> = AtomEffect<T>;
export type TypesAtomEffectWithParam<T, P> = (key: P) => AtomEffect<T>;
