import { atom } from "jotai";

export const widthAtom = atom(200);
export const useTableAtom = atom(false);
export const inputAtom = atom("");
export const outputAtom = atom("");
export const errorsAtom = atom<string[]>([]);
