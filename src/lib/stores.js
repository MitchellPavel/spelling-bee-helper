import { writable } from "svelte/store";

export const words = writable([]);
export const scores = writable({
    words: 0,
    points: 0,
    panagrams: 0,
    perfectPanagrams: 0,
});
export const letters = writable([]);
export const totals = writable();
export const bingo = writable();
export const twoLetterList = writable();
