import { atomWithStorage } from "jotai/utils";

export const DEFAULT_COLOR = "#c084fc";

export const handItemCurrent = atomWithStorage("handItem", 0);
export const clothCurrent = atomWithStorage("cloth", 0);
export const eyeCurrent = atomWithStorage("eye", 0);
export const hatCurrent = atomWithStorage("hat", 0);
export const hornCurrent = atomWithStorage("horn", 0);
export const moustacheCurrent = atomWithStorage("moustache", 0);

export const baseColorCurrent = atomWithStorage("baseColor", DEFAULT_COLOR);
export const backgroundColorCurrent = atomWithStorage(
  "backgroundColor",
  "#ffffff"
);
