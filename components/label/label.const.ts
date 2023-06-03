import { PATH_APP } from '@constAssertions/data';
import {
  ICON_DELETE,
  ICON_EDIT_NOTE,
  ICON_LABEL,
  ICON_LABEL_FILL,
  ICON_MORE_VERT,
  ICON_NEW_LABEL,
} from '@data/materialSymbols';
import {
  TypesOptionsButton,
  TypesOptionsDropdown,
  TypesOptionsPrefetchRouterButton,
} from '@lib/types/options';
import { classNames, paths } from '@stateLogics/utils';
import { TypesLabel } from './label.types';
import { STYLE_HOVER_ENABLED_SLATE_DARK } from '@data/stylePreset';
import { TypesStyleAttributes } from '@lib/types';

/**
 * LabelList
 * */
export const optionsLabelButtonAddMore: TypesOptionsButton = {
  path: ICON_NEW_LABEL,
  tooltip: 'Add new label',
  padding: 'p-2',
  color: 'hover:enabled:bg-fill-700',
};

/**
 * LabelItem
 * */
export const optionsLabelItemRouteMatched: TypesOptionsButton = {
  path: ICON_LABEL_FILL,
  className: 'h-5 w-5 fill-yellow-500',
};
export const optionsLabelItemRouteUnmatched: TypesOptionsButton = {
  path: ICON_LABEL,
  className: 'h-5 w-5 fill-gray-500 group-hover:fill-yellow-500 ',
};

export const optionsLabelItemPrefetchButton = (
  label: TypesLabel['label'],
): TypesOptionsPrefetchRouterButton => {
  return {
    tooltip: label.name,
    path: paths(PATH_APP['label'] + '/', label._id),
    className: classNames('w-full focus:outline-none focus:ring-0 focus:ring-offset-0'),
  };
};

export const optionsLabelItemDropdown = (matchedSlug: boolean) => {
  return {
    isInitiallyVisible: false,
    hoverBg: matchedSlug ? 'hover:bg-blue-900 hover:bg-opacity-[0.07]' : STYLE_HOVER_ENABLED_SLATE_DARK,
  };
};

/**
 * LabelItem Dropdown
 * */

export const optionsLabelItemDropdownEditLabel: TypesOptionsDropdown = {
  shouldKeepOpeningOnClick: false,
  path: ICON_EDIT_NOTE,
  tooltip: 'Edit',
};

export const optionsLabelItemDropdownDelete: TypesOptionsDropdown = {
  shouldKeepOpeningOnClick: false,
  path: ICON_DELETE,
  tooltip: 'Delete',
};

export const optionsDropdownLabelItem = (hoverBg?: TypesStyleAttributes['hoverBg']): TypesOptionsDropdown => {
  return {
    tooltip: 'Menu',
    path: ICON_MORE_VERT,
    padding: 'p-[0.3rem]',
    color: 'fill-gray-500 group-hover:fill-gray-700',
    isPortal: true,
    isInitiallyVisible: false,
    hoverBg: hoverBg,
  };
};
