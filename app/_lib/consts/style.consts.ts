/*
 * gradient-wave-effect
 **/

import { mergeClasses } from '../utils/misc.utils';

// Gradient Base
export const STYLE_BLUR_GRADIENT_BASE = 'from-pink-600 from-10% via-purple-600 via-20% to-blue-600 to-90%';
const STYLE_BLUR_GRADIENT_ZR = mergeClasses(STYLE_BLUR_GRADIENT_BASE, 'blur-0');
const STYLE_BLUR_GRADIENT_SM = mergeClasses(STYLE_BLUR_GRADIENT_BASE, 'blur-sm');
const STYLE_BLUR_GRADIENT_MD = mergeClasses(STYLE_BLUR_GRADIENT_BASE, 'blur-md');
const STYLE_BLUR_GRADIENT_LG = mergeClasses(STYLE_BLUR_GRADIENT_BASE, 'blur-lg');
// Right
export const STYLE_BLUR_GRADIENT_R_ZR = mergeClasses(STYLE_BLUR_GRADIENT_ZR, 'bg-gradient-to-r');
export const STYLE_BLUR_GRADIENT_R_SM = mergeClasses(STYLE_BLUR_GRADIENT_SM, 'bg-gradient-to-r');
export const STYLE_BLUR_GRADIENT_R_MD = mergeClasses(STYLE_BLUR_GRADIENT_MD, 'bg-gradient-to-r');
export const STYLE_BLUR_GRADIENT_R_LG = mergeClasses(STYLE_BLUR_GRADIENT_LG, 'bg-gradient-to-r');
// Bottom
export const STYLE_BLUR_GRADIENT_B_ZR = mergeClasses(STYLE_BLUR_GRADIENT_ZR, 'bg-gradient-to-b');
export const STYLE_BLUR_GRADIENT_B_SM = mergeClasses(STYLE_BLUR_GRADIENT_SM, 'bg-gradient-to-b');
export const STYLE_BLUR_GRADIENT_B_MD = mergeClasses(STYLE_BLUR_GRADIENT_MD, 'bg-gradient-to-b');
export const STYLE_BLUR_GRADIENT_B_LG = mergeClasses(STYLE_BLUR_GRADIENT_LG, 'bg-gradient-to-b');

/**
 * Hover Effect
 **/
export const STYLE_HOVER_SLATE_DARK = 'hover:bg-slate-900 hover:bg-opacity-10';
export const STYLE_HOVER_SLATE_LIGHT = 'hover:bg-slate-600 hover:bg-opacity-10';
export const STYLE_HOVER_ENABLED_SLATE_DARK = 'enabled:hover:bg-slate-900 enabled:hover:bg-opacity-10';
export const STYLE_HOVER_ENABLED_SLATE_LIGHT = 'enabled:hover:bg-slate-600 enabled:hover:bg-opacity-10';

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
