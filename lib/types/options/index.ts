import { Types } from '..';
import { TypesSvgIconAttributes, TypesElement, TypesStyleAttributes } from '../bases/ui';

export type TypesOptionsSvg = Partial<
  Pick<TypesSvgIconAttributes, 'height' | 'width' | 'viewBox' | 'path' | 'isAriaHidden'> &
    Pick<Types, 'className'>
>;

export type TypesOptionsButton = Partial<
  Pick<
    Types,
    | 'className'
    | 'isDisabled'
    | 'path'
    | 'name'
    | 'tooltip'
    | 'offset'
    | 'kbd'
    | 'placement'
    | 'signInButtonName'
    | 'ariaLabel'
  > & {
    type: Extract<TypesElement['type'], 'button' | 'submit' | 'reset'>;
  } & Pick<
      TypesStyleAttributes,
      | 'padding'
      | 'margin'
      | 'display'
      | 'width'
      | 'size'
      | 'color'
      | 'container'
      | 'hoverBg'
      | 'borderRadius'
    >
>;

export type TypesOptionsPseudoButton = Partial<
  Pick<Types, 'className' | 'path' | 'name' | 'tooltip' | 'offset' | 'kbd' | 'placement'> &
    Pick<
      TypesStyleAttributes,
      'padding' | 'margin' | 'display' | 'width' | 'size' | 'color' | 'container' | 'hoverBg'
    >
>;

export type TypesOptionsPriority = Partial<
  Pick<Types, 'isInitiallyVisible' | 'priorityImportant' | 'priorityNormal' | 'priorityUrgent'> &
    Pick<
      TypesStyleAttributes,
      | 'margin'
      | 'display'
      | 'width'
      | 'container'
      | 'padding'
      | 'size'
      | 'color'
      | 'borderRadius'
      | 'hoverBg'
    >
> &
  Pick<Types, 'priorityLevel'>;

export type TypesOptionsBackdrop = Partial<
  Pick<Types, 'isPortal' | 'enterDuration' | 'leaveDuration'> &
    Pick<TypesStyleAttributes, 'color' | 'zIndex'>
>;

export type TypesOptionsDropdown = Partial<
  Pick<
    Types,
    | 'placement'
    | 'tooltip'
    | 'kbd'
    | 'hasDivider'
    | 'path'
    | 'isInitiallyVisible'
    | 'hasDropdownBoardStyle'
    | 'isPortal'
    | 'shouldKeepOpeningOnClick'
    | 'isDisabled'
    | 'show'
  > &
    Pick<
      TypesStyleAttributes,
      | 'group'
      | 'padding'
      | 'borderRadius'
      | 'menuWidth'
      | 'menuHeight'
      | 'size'
      | 'color'
      | 'text'
      | 'menuItemsWidth'
      | 'hoverBg'
      | 'hoverRing'
      | 'transition'
      | 'container'
    >
>;

export type TypesOptionsMinimizedModalTransition = Partial<
  Pick<Types, 'positionX' | 'positionY' | 'minimizedModalPadding'>
>;

export type TypesOptionsLoadingState = Partial<Pick<Types, 'delay'>> &
  Pick<Types, 'loadingSkeleton' | 'repeatingCount' | 'margin' | 'space'>;

export type TypesOptionsFloatingLabelInput = Partial<
  Pick<
    Types,
    | 'isError'
    | 'tooltip'
    | 'kbd'
    | 'inputType'
    | 'autoComplete'
    | 'placeholder'
    | 'required'
    | 'padding'
    | 'isPasswordShown'
    | 'name'
  >
>;

export type TypesOptionsAuthErrorMessage = Partial<
  Pick<Types, 'isError' | 'isSignIn' | 'defaultMessage' | 'errorMessage'>
>;

export type TypesOptionsPrefetchRouterButton = Pick<Types, 'path'> &
  Partial<
    Pick<
      Types,
      | 'isDisabled'
      | 'className'
      | 'isPrefetchingOnHover'
      | 'tooltip'
      | 'kbd'
      | 'offset'
      | 'placement'
      | 'container'
    >
  >;
