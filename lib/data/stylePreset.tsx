import { classNames } from '@states/utils';

/**
 * Button
 */
// Base
export const STYLE_BUTTON_BASE =
  'transition-all inline-flex items-center justify-center rounded-lg border leading-4 shadow-lg shadow-blue-100 hover:shadow-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
export const STYLE_BUTTON_SIZE_NORMAL = 'py-[0.6rem] px-6 text-sm';
export const STYLE_BUTTON_SIZE_LARGE = 'py-[0.6rem] px-14 text-sm';
export const STYLE_BUTTON_SIZE_FULL = 'py-[0.7rem] px-14 text-base';
// color
export const STYLE_BUTTON_COLOR_BLUE =
  'border-transparent bg-blue-600 text-white hover:enabled:bg-blue-700 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70';
export const STYLE_BUTTON_COLOR_WHITE =
  'border-gray-300 bg-white text-gray-600 hover:enabled:bg-gray-100 hover:enabled:text-gray-800 focus-visible:ring-blue-500 disabled:opacity-70';
export const STYLE_BUTTON_COLOR_RED =
  'border-transparent bg-red-600 text-white hover:enabled:bg-red-700 focus-visible:ring-red-500 disabled:opacity-70';
export const STYLE_BUTTON_COLOR_GRAY =
  'border-transparent bg-gray-200 text-black hover:enabled:bg-gray-300 focus-visible:ring-gray-500 disabled:opacity-70';
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
export const STYLE_BUTTON_LARGE_BLUE = classNames(STYLE_BUTTON_BASE, STYLE_BUTTON_SIZE_LARGE, STYLE_BUTTON_COLOR_BLUE);
export const STYLE_BUTTON_FULL_BLUE = classNames(STYLE_BUTTON_BASE, STYLE_BUTTON_SIZE_FULL, STYLE_BUTTON_COLOR_BLUE);
// red
export const STYLE_BUTTON_NORMAL_RED = classNames(STYLE_BUTTON_BASE, STYLE_BUTTON_SIZE_NORMAL, STYLE_BUTTON_COLOR_RED);
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
export const STYLE_HOVER_ENABLED_SLATE_DARK = 'enabled:hover:bg-slate-900 enabled:hover:bg-opacity-10';
export const STYLE_HOVER_ENABLED_SLATE_LIGHT = 'enabled:hover:bg-slate-600 enabled:hover:bg-opacity-10';
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
  'bg-pink-400 shadow-pink-400/50',
  'bg-amber-400 shadow-amber-400/50',
  'bg-green-400 shadow-green-400/50',
  'bg-teal-400 shadow-teal-400/50',
  'bg-red-400 shadow-red-400/50',
  'bg-cyan-400 shadow-cyan-400/50',
  'bg-blue-400 shadow-blue-400/50',
  'bg-indigo-400 shadow-indigo-400/50',
  'bg-rose-400 shadow-rose-400/50',
];
