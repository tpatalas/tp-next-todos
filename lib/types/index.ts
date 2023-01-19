import {
  BREAKPOINT,
  IDB,
  IDB_STORE,
  NOTIFICATION,
  OBJECT_ID,
  POSITION_X,
  POSITION_Y,
  PRIORITY_LEVEL,
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
export type Types = CollectTypesEditor & CollectTypesArrayObject & CollectTypesMISC;

/**
 * Types Editor
 */
type CollectTypesEditor = TypesEditor;

export interface TypesEditor {
  titleName: string;
  isAutoFocus: boolean;
  placeholder: string;
  initialValue: Descendant[];
  changeHandler: (value: Descendant[]) => void;
  editor: ReactEditor;
}

/**
 * Types Array Object
 */
type CollectTypesArrayObject = Todos & TypesTodo & Labels & TypesLabel & Settings & TypesGlobals;

// GlobalTypes
export interface TypesGlobals {
  itemIds: TodoIds | LabelIds;
}

// Todos
export interface Todos extends TodosEditors, TodoIds {
  createdDate: Date;
  dueDate: Date | null;
  completedDate: Date | null;
}

export interface TodoIds {
  _id?: OBJECT_ID;
  isCompleted?: boolean;
  priorityLevel?: PRIORITY_LEVEL | null;
  priorityRankScore?: number;
  completedDate?: Date | null;
}

export interface TodosEditors {
  title: string;
  note: string;
}

export interface TypesTodo {
  todoItem: Todos;
  todo: TodoIds;
  index: number;
  completedFromToday: number;
  model: SCHEMA_TODO;
}

// Labels
export interface Labels extends LabelIds {
  parent_id?: OBJECT_ID;
  title_id?: OBJECT_ID[];
  name: string;
}

export interface LabelIds {
  _id?: OBJECT_ID;
}

export interface TypesLabel {
  label: Labels;
}
// Users
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
 * Non-Collectable Types
 */

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
  TypesRouter &
  TypesReactChildren &
  TypesUi &
  TypesLoadings &
  TypesTooltipAttributes &
  TypesSvgIconAttributes &
  TypesInputAttributes &
  TypesModals &
  TypesElement &
  TypesEffects &
  TypesStyleAttributes;

export interface TypesRouter {
  pathName: string;
  isPrefetchingOnHover: boolean;
}

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
  nestedModal: Types['children'];
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
  isInitiallyVisible: boolean;
  hasDivider: boolean;
  menuItemId: string | null;
  priorityImportant: string;
  priorityUrgent: string;
  priorityNormal: string;
  isConditionalRendering: boolean;
}

export interface TypesLoadings {
  loadingSkeleton: Types['children'];
  repeatingCount: number;
  delay: number;
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
  space: string;
  text: string;
  menuWidth: string;
  display: string;
  width: string;
  containerWidth: string;
  hoverBg: string;
}

export interface TypesTooltipAttributes {
  tooltip: string | ReactElement | null;
  kbd: string;
  delayShow: number;
  trigger: TriggerType | TriggerType[] | null;
  offset: [number, number];
  placement: Placement;
  isVisible: boolean;
  isCloseOnTriggerHidden: boolean;
}

export interface TypesSvgIconAttributes {
  path: string;
  height: string | number;
  width: string | number;
  viewBox: string;
  isAriaHidden: boolean;
}

export interface TypesInputAttributes {
  isChecked: boolean;
  onChange: (value: unknown) => void;
}

export interface TypesModals {
  onClickConfirm: Types['onClick'];
  onClickCancel: Types['onClick'];
  deletingItem: string;
}

export interface TypesElement {
  name: string;
  type: 'button' | 'submit' | 'reset' | 'checkbox';
  onClick: MouseEventHandler<HTMLElement>;
  onMouseOver: MouseEventHandler<HTMLElement>;
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onDoubleClick: MouseEventHandler<HTMLElement>;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  positionX: POSITION_X;
  positionY: POSITION_Y;
  minimizedModalPadding: string;
  isNoValidate: boolean;
  isAriaHidden: boolean;
  isDisabled: boolean;
  isDisabledCloseOnClick: boolean;
}
export interface TypesEffects {
  // Refetch Effect
  queryKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFunction(): Promise<any>;
  storeName: IDB_STORE;
  isIndexedDbEnabled: boolean;
  isRefetchingOnMutation: boolean;
  isRefetchingOnFocus: boolean;
  isRefetchingOnBlur: boolean;
  refetchDelayOnMutation: number;
  refetchInterval: number;
  // MediaQuery Effect
  breakpoint: BREAKPOINT;
  isStateUnderBreakpoint: boolean;
  isStateOverBreakpoint: boolean;
}
/**
 * Types Atom Effects - Recoil
 * none-collectable Types
 */

export type TypesRefetchEffect = <T>({
  queryKey,
  queryFunction,
  isIndexedDbEnabled,
  storeName,
  isRefetchingOnMutation,
  refetchDelayOnMutation,
  isRefetchingOnFocus,
  isRefetchingOnBlur,
  refetchInterval,
}: Partial<
  Pick<
    Types,
    | 'isIndexedDbEnabled'
    | 'isRefetchingOnMutation'
    | 'refetchDelayOnMutation'
    | 'isRefetchingOnFocus'
    | 'isRefetchingOnBlur'
    | 'refetchInterval'
  >
> &
  Pick<Types, 'queryFunction' | 'queryKey' | 'storeName'>) => AtomEffect<T>;

export type TypesMediaQueryEffect = <T>({
  breakpoint,
  isStateUnderBreakpoint,
  isStateOverBreakpoint,
}: Pick<Types, 'breakpoint'> &
  Partial<Pick<Types, 'isStateUnderBreakpoint' | 'isStateOverBreakpoint'>>) => AtomEffect<
  T | boolean
>;

export type TypesAtomEffect<T> = AtomEffect<T>;
export type TypesAtomEffectWithParam<T, P> = (key: P) => AtomEffect<T>;
