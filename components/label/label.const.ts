import { ICON_LABEL, ICON_LABEL_FILL, ICON_NEW_LABEL } from '@data/materialSymbols';
import { TypesOptionsButton } from '@lib/types/options';

export const optionsLabelButtonAddMore: TypesOptionsButton = {
  path: ICON_NEW_LABEL,
  tooltip: 'Add new label',
  padding: 'p-2',
  color: 'hover:enabled:bg-fill-700',
};

export const optionsLabelRouteMatched: TypesOptionsButton = {
  path: ICON_LABEL_FILL,
  className: 'h-5 w-5 fill-yellow-500',
};
export const optionsLabelRouteUnmatched: TypesOptionsButton = {
  path: ICON_LABEL,
  className: 'h-5 w-5 fill-gray-500 group-hover:fill-yellow-500 ',
};
