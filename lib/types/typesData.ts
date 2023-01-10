import { Types, TypesElement, TypesStyleAttributes, TypesSvgIconAttributes } from '.';

export type TypesDataDivContainer = Partial<Pick<Types, 'className' | 'tabIndex'>>;

export type TypesDataSvg = Partial<
  Pick<TypesSvgIconAttributes, 'height' | 'width' | 'viewBox' | 'path' | 'ariaHidden'> &
    Pick<Types, 'className'>
>;

export type TypesDataButton = Partial<
  Pick<
    Types,
    | 'className'
    | 'disabled'
    | 'path'
    | 'name'
    | 'tooltip'
    | 'offset'
    | 'kbd'
    | 'condition'
    | 'placement'
  > & {
    type: Extract<TypesElement['type'], 'button' | 'submit' | 'reset'>;
  } & Pick<
      TypesStyleAttributes,
      'padding' | 'margin' | 'display' | 'width' | 'size' | 'color' | 'containerWidth' | 'hoverBg'
    >
>;

export type TypesDataPriority = Partial<
  Pick<Types, 'initialVisible' | 'priorityImportant' | 'priorityNormal' | 'priorityUrgent'> &
    Pick<TypesStyleAttributes, 'margin' | 'display' | 'width' | 'containerWidth' | 'padding'>
> &
  Pick<Types, 'priorityLevel'>;

export type TypesDataDropdown = Partial<
  Pick<Types, 'placement' | 'tooltip' | 'kbd' | 'divider' | 'path' | 'initialVisible'> &
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
    >
>;

export type TypesDataMinimizedModalTransition = Partial<
  Pick<Types, 'positionX' | 'positionY' | 'minimizedModalPadding'>
>;

export type TypesDataLoadingState = Partial<Pick<Types, 'delay'>> &
  Pick<Types, 'loadingSkeleton' | 'repeatingCount' | 'margin' | 'space'>;
