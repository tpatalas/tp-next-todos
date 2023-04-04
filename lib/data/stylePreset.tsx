import { classNames } from '@stateLogics/utils';

/**
 * Button
 */
// Base
export const STYLE_BUTTON_BASE =
  'transition-all inline-flex items-center justify-center tracking-wide rounded-lg py-[0.66rem] border leading-4 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
export const STYLE_BUTTON_SIZE_NORMAL = 'px-4 text-base';
export const STYLE_BUTTON_SIZE_LARGE = 'px-14 text-base';
export const STYLE_BUTTON_SIZE_FULL = 'px-14 text-base';
// color
export const STYLE_BUTTON_COLOR_BLUE =
  'border-transparent bg-blue-600 text-white hover:enabled:shadow-blue-300 hover:enabled:bg-blue-700 shadow-blue-100 hover:shadow-blue-200 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70';
export const STYLE_BUTTON_COLOR_BLACK =
  'border-transparent bg-gray-800 text-white hover:enabled:shadow-gray-400 shadow-gray-100 hover:shadow-gray-200 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-70';
export const STYLE_BUTTON_COLOR_WHITE =
  'border-gray-300 bg-slate-50 text-gray-600 hover:enabled:bg-gray-100 shadow-slate-100 hover:shadow-slate-200 hover:enabled:text-gray-800 focus-visible:ring-blue-500 disabled:opacity-70';
export const STYLE_BUTTON_COLOR_RED =
  'border-transparent bg-red-600 text-white hover:enabled:shadow-red-300 hover:enabled:bg-red-700 shadow-red-100 hover:shadow-red-200 focus-visible:ring-red-500 disabled:opacity-70';
export const STYLE_BUTTON_COLOR_GRAY =
  'border-transparent bg-gray-200 text-black hover:enabled:shadow-gray-300 hover:enabled:bg-gray-300 shadow-gray-100 hover:shadow-gray-200 focus-visible:ring-gray-500 disabled:opacity-70';
// Composition
// white
export const STYLE_BUTTON_NORMAL_WHITE = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_NORMAL,
  STYLE_BUTTON_COLOR_WHITE,
);
// blue
export const STYLE_BUTTON_NORMAL_BLUE = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_NORMAL,
  STYLE_BUTTON_COLOR_BLUE,
);
export const STYLE_BUTTON_LARGE_BLUE = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_LARGE,
  STYLE_BUTTON_COLOR_BLUE,
);
export const STYLE_BUTTON_FULL_BLUE = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_FULL,
  STYLE_BUTTON_COLOR_BLUE,
);
//black
export const STYLE_BUTTON_NORMAL_BLACK = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_NORMAL,
  STYLE_BUTTON_COLOR_BLACK,
);
export const STYLE_BUTTON_FULL_BLACK = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_FULL,
  STYLE_BUTTON_COLOR_BLACK,
);

// red
export const STYLE_BUTTON_NORMAL_RED = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_NORMAL,
  STYLE_BUTTON_COLOR_RED,
);
// gray
export const STYLE_BUTTON_NORMAL_GRAY = classNames(
  STYLE_BUTTON_BASE,
  STYLE_BUTTON_SIZE_NORMAL,
  STYLE_BUTTON_COLOR_GRAY,
);

// misc
export const STYLE_BUTTON_ICON =
  'border-transparent bg-transparent text-gray-500 hover:enabled:bg-gray-700 hover:enabled:bg-opacity-10 hover:enabled:text-gray-700 focus-visible:ring-blue-500 ';
export const STYLE_BUTTON_NO_RING = 'focus:outline-none focus:ring-0 focus:ring-offset-0';
export const STYLE_BUTTON_KEY_ONLY_RING =
  'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

/**
 * Hover Effect
 **/
export const STYLE_HOVER_SLATE_DARK = 'hover:bg-slate-900 hover:bg-opacity-10';
export const STYLE_HOVER_SLATE_LIGHT = 'hover:bg-slate-600 hover:bg-opacity-10';
export const STYLE_HOVER_ENABLED_SLATE_DARK =
  'enabled:hover:bg-slate-900 enabled:hover:bg-opacity-10';
export const STYLE_HOVER_ENABLED_SLATE_LIGHT =
  'enabled:hover:bg-slate-600 enabled:hover:bg-opacity-10';
/**
 * Calendar
 */
export const STYLE_CALENDAR_COL_START = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

/**
 * Color palette
 **/
// background color
export const STYLE_COLORS = [
  'text-pink-700 ring-pink-700',
  'text-amber-700 ring-amber-700',
  'text-green-700 ring-green-700',
  'text-teal-700 ring-teal-700',
  'text-red-700 ring-red-700',
  'text-cyan-700 ring-cyan-700',
  'text-blue-700 ring-blue-700',
  'text-indigo-700 ring-indigo-700',
  'text-purple-700 ring-purple-700',
  'text-rose-700 ring-rose-700',
];
