import { OBJECT_ID, PATHNAME, PATHNAME_IMAGE, SVG_LOGO } from '@constAssertions/data';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { IDB, IDB_STORE, IDB_VERSION } from '@constAssertions/storage';
import {
  NOTIFICATION,
  DURATION,
  GRADIENT_TYPE,
  GRADIENT_POSITION,
  VIEWBOX,
  POSITION_X,
  POSITION_Y,
  BREAKPOINT,
} from '@constAssertions/ui';
import { Placement } from '@popperjs/core';
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
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
type CollectTypesArrayObject = Todos & TypesTodo & Labels & TypesLabel & Settings & TypesGlobals & TypesMongoDB;

// GlobalTypes
export interface TypesGlobals {
  itemIds: TodoIds | LabelIds;
  data: unknown;
  matchingId: OBJECT_ID;
}

export interface TypesMongoDB {
  notEqual: { $ne: boolean };
  greaterThan: { $gt: number };
}

// Todos
export interface Todos extends TodosEditors, TodoIds {
  createdDate: Date;
  dueDate: Date | null;
  completedDate: Date | null;
  labelItem: Labels[];
  title_id?: OBJECT_ID;
  user_id?: OBJECT_ID;
}

export interface TodoIds {
  _id?: OBJECT_ID;
  completed?: boolean;
  priorityLevel?: PRIORITY_LEVEL | null;
  priorityRankScore?: number;
  completedDate?: Date | null;
  deleted?: boolean | TypesMongoDB['notEqual'];
  update?: number | TypesMongoDB['greaterThan'];
}

export interface TodosEditors {
  title: string;
  note: string;
}

export interface TypesTodo {
  todoItem: Todos;
  todo: TodoIds;
  index: number;
}

// Labels
export interface Labels extends LabelIds {
  parent_id?: OBJECT_ID;
  title_id?: OBJECT_ID[];
  user_id?: OBJECT_ID;
  name: string;
  color?: string;
}

export interface LabelIds {
  _id?: OBJECT_ID;
  deleted?: boolean | TypesMongoDB['notEqual'];
  update?: number | TypesMongoDB['greaterThan'];
}

export interface TypesLabel {
  label: Labels;
  selectedQueryLabels: Labels[];
}
// Users
export interface Users extends UsersIds {
  email: string;
  password: string;
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
  TypesComboboxAttributes &
  TypesDropdownAttributes &
  TypesModals &
  TypesElement &
  TypesEffects &
  TypesStyleAttributes &
  TypesRefs;

export interface TypesRouter {
  path: string;
  pathname: PATHNAME;
  isPrefetchingOnHover: boolean;
}

export interface TypesIndexedDB {
  storeName: TypesIDB['store'];
  dbVersion: number;
}

export interface TypesWindow {
  mediaQueryValue: number;
}

export interface TypesReactChildren {
  children: ReactNode;
  checkBox: Types['children'];
  footerButtons: Types['children'];
  headerButtons: Types['children'];
  headerIcons: Types['children'];
  nestedModal: Types['children'];
}
export interface TypesRefs {
  initialFocus: RefObject<HTMLElement | null>;
  divFocus: RefObject<HTMLDivElement>;
  scrollRef: RefObject<HTMLDivElement>;
}

export interface TypesUi {
  confirmTooltip: string | ReactElement;
  cancelTooltip: string | ReactElement;
  message: string;
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
  enterDuration: DURATION;
  leaveDuration: DURATION;
  isPortal: boolean;
  gradientType: GRADIENT_TYPE;
  gradientPosition: GRADIENT_POSITION;
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
  menuItemsWidth: string;
  checkedColor: string;
  checkBoxColor: string;
  borderRadius: string;
  margin: string;
  space: string;
  text: string;
  menuWidth: string;
  menuHeight: string;
  display: string;
  width: string;
  container: string;
  hoverBg: string;
  hoverRing: string;
  transition: string;
  zIndex: string;
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
  viewBox: VIEWBOX;
  isAriaHidden: boolean;
}

export interface TypesComboboxAttributes {
  selected: unknown[];
  hasComboBoxBoardStyle: boolean;
  comboBoxInputButton: Types['children'];
}

export interface TypesDropdownAttributes {
  hasDropdownBoardStyle: boolean;
  open: boolean;
  menuContentOnClose: Types['children'];
  menuButtonContent: Types['children'];
  menuButtonIcon: Types['children'];
  referenceElement: HTMLDivElement | null;
}

export interface TypesInputAttributes {
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputType: 'email' | 'password' | 'text';
  autoComplete: string;
  placeholder: string;
  required: boolean;
  isPasswordShown: boolean;
  inputValue: string | number | readonly string[];
  isError: boolean;
  isSignIn: boolean;
  defaultMessage: string;
  errorMessage: string;
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
  onBlur: FocusEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
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
  shouldKeepOpeningOnClick: boolean;
}

export interface TypesEffects {
  // All Effect
  shouldGet: boolean;
  isSessionSetEnabled: boolean;
  isSessionResetEnabled: boolean;
  // Refetch Effect
  queryKey: string;
  queryFunction<T>(): Promise<{ data: T }>;
  depQueryFunction<T>(): Promise<{ data: T }>;
  storeName: IDB_STORE;
  isIndexedDBEnabled: boolean;
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
  depQueryFunction,
  isIndexedDBEnabled,
  storeName,
  isRefetchingOnMutation,
  refetchDelayOnMutation,
  isRefetchingOnFocus,
  isRefetchingOnBlur,
  refetchInterval,
}: Partial<
  Pick<
    Types,
    | 'isIndexedDBEnabled'
    | 'isRefetchingOnMutation'
    | 'refetchDelayOnMutation'
    | 'isRefetchingOnFocus'
    | 'isRefetchingOnBlur'
    | 'refetchInterval'
    | 'depQueryFunction'
  >
> &
  Pick<Types, 'queryFunction' | 'queryKey' | 'storeName'>) => AtomEffect<T>;

export type TypesSessionStorageEffect = <T>({
  queryKey,
  shouldGet,
  isSessionSetEnabled,
  isSessionResetEnabled,
}: Pick<Types, 'queryKey'> &
  Partial<Pick<Types, 'shouldGet' | 'isSessionResetEnabled' | 'isSessionSetEnabled'>>) => AtomEffect<T | boolean>;

export type TypesMediaQueryEffect = <T>({
  breakpoint,
  isStateUnderBreakpoint,
  isStateOverBreakpoint,
}: Pick<Types, 'breakpoint'> & Partial<Pick<Types, 'isStateUnderBreakpoint' | 'isStateOverBreakpoint'>>) => AtomEffect<
  T | boolean
>;

export type TypesAtomEffect<T> = AtomEffect<T>;
export type TypesAtomEffectWithParam<T, P> = (key: P) => AtomEffect<T>;
