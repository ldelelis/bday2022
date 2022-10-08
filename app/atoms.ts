import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => localStorage);
storage.delayInit = true;

export const handItemCurrent = atomWithStorage("handItem", 0, storage);
export const clothCurrent = atomWithStorage("cloth", 0, storage);
export const eyeCurrent = atomWithStorage("eye", 0, storage);
export const hatCurrent = atomWithStorage("hat", 0, storage);
export const hornCurrent = atomWithStorage("horn", 0, storage);
export const moustacheCurrent = atomWithStorage("moustache", 0, storage);
