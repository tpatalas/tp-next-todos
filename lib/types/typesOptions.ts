import { Types, TypesElement, TypesStyleAttributes, TypesSvgIconAttributes } from '.';

export type TypesOptionsSvg = Partial<
  Pick<TypesSvgIconAttributes, 'height' | 'width' | 'viewBox' | 'path' | 'isAriaHidden'> & Pick<Types, 'className'>
>;

export type TypesOptionsButton = Partial<
  Pick<Types, 'className' | 'isDisabled' | 'path' | 'name' | 'tooltip' | 'offset' | 'kbd' | 'placement'> & {
    type: Extract<TypesElement['type'], 'button' | 'submit' | 'reset'>;
  } & Pick<
      TypesStyleAttributes,
      'padding' | 'margin' | 'display' | 'width' | 'size' | 'color' | 'container' | 'hoverBg' | 'borderRadius'
    >
>;

export type TypesOptionsPseudoButton = Partial<
  Pick<Types, 'className' | 'path' | 'name' | 'tooltip' | 'offset' | 'kbd' | 'placement'> &
    Pick<TypesStyleAttributes, 'padding' | 'margin' | 'display' | 'width' | 'size' | 'color' | 'container' | 'hoverBg'>
>;

export type TypesOptionsPriority = Partial<
  Pick<Types, 'isInitiallyVisible' | 'priorityImportant' | 'priorityNormal' | 'priorityUrgent'> &
    Pick<TypesStyleAttributes, 'margin' | 'display' | 'width' | 'container' | 'padding' | 'size' | 'color'>
> &
  Pick<Types, 'priorityLevel'>;

export type TypesOptionsBackdrop = Partial<
  Pick<Types, 'isPortal' | 'enterDuration' | 'leaveDuration' | 'as'> & Pick<TypesStyleAttributes, 'color' | 'zIndex'>
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
    | 'isDisabledCloseOnClick'
    | 'isDisabled'
  > &
    Pick<
      TypesStyleAttributes,
      | 'group'
      | 'padding'
      | 'borderRadius'
      | 'menuWidth'
      | 'size'
      | 'color'
      | 'text'
      | 'contentWidth'
      | 'hoverBg'
      | 'container'
    >
>;

export type TypesOptionsMinimizedModalTransition = Partial<
  Pick<Types, 'positionX' | 'positionY' | 'minimizedModalPadding'>
>;

export type TypesOptionsLoadingState = Partial<Pick<Types, 'delay'>> &
  Pick<Types, 'loadingSkeleton' | 'repeatingCount' | 'margin' | 'space'>;
