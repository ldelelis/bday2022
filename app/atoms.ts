import { atomWithStorage } from "jotai/utils";

export const DEFAULT_COLOR = "#c084fc";

export const handItemCurrent = atomWithStorage("handItem", null);
export const clothCurrent = atomWithStorage("cloth", null);
export const eyeCurrent = atomWithStorage("eye", 0);
export const hatCurrent = atomWithStorage("hat", null);
export const hornCurrent = atomWithStorage("horn", 0);
export const moustacheCurrent = atomWithStorage("moustache", null);
export const frameCurrent = atomWithStorage("frame", null);
export const hatBackCurrent = atomWithStorage("hatBack", null);

export const baseColorCurrent = atomWithStorage("baseColor", DEFAULT_COLOR);
export const backgroundColorCurrent = atomWithStorage(
  "backgroundColor",
  "#ffffff"
);
