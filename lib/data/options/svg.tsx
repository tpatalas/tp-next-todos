import {
  ICON_WARNING,
  ICON_FLAG_FILL,
  ICON_LABEL_IMPORTANT_FILL,
  ICON_EVENT_AVAILABLE_FILL,
  ICON_REPORT,
  ICON_DELETE,
} from '@data/materialSymbols';
import { TypesOptionsSvg } from '@lib/types/typesOptions';

// network status
export const optionsSvgNetworkStatus: TypesOptionsSvg = {
  path: ICON_WARNING,
  className: 'h-4 w-4 fill-red-500',
};

// priority
export const optionsSvgPriorityUrgent: TypesOptionsSvg = {
  path: ICON_FLAG_FILL,
  className: 'h-4 w-4 fill-red-600',
};

export const optionsSvgPriorityImportant: TypesOptionsSvg = {
  path: ICON_LABEL_IMPORTANT_FILL,
  className: 'h-4 w-4 fill-yellow-500',
};

// calendar
export const optionsSvgCalendarDueDate: TypesOptionsSvg = {
  path: ICON_EVENT_AVAILABLE_FILL,
  className: 'h-4 w-4 fill-blue-500',
};

// confirmModal
export const optionsSvgConfirmModalHeaderIcon: TypesOptionsSvg = {
  path: ICON_REPORT,
  className: 'h-10 w-10 fill-red-600',
};

export const optionsSvgConfirmModalDelete: TypesOptionsSvg = {
  path: ICON_DELETE,
  className: 'h-10 w-10 fill-red-600',
};
