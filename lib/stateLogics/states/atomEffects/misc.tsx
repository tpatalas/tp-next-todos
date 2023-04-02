import { BREAKPOINT } from "@constAssertions/ui";
import { mediaQueryEffect, networkStatusEffect } from "@effects/atomEffects/atomEffects";
import { atomFamily, atom } from "recoil";

// Media Queries
export const atomEffectMediaQuery = atomFamily<boolean, BREAKPOINT>({
  key: 'atomMediaQuery',
  default: false,
  effects: (breakpoint) => [mediaQueryEffect({ breakpoint: breakpoint })],
});

// Network
export const atomEffectNetworkStatus = atom({
  key: 'atomNetworkStatusEffect',
  default: true,
  effects: [networkStatusEffect],
});

