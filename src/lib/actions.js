// @ts-nocheck
import { add, append, dec, evolve, head, identity, inc, length, lensPath, lensProp, over, subtract, take, toLower, without, __ } from "ramda";
import { calcPoints, isPanagram, isPerfectPanagram } from "./spellingBeeUtils";
import { bingo, scores, twoLetterList, words } from "./stores";

export const addWord = (wordInput) => {
    const word = toLower(wordInput);
    words.update(append(word));
    const points = calcPoints(word);
    const firstLetter = head(word);
    const twoLetters = take(2, word);
    scores.update(evolve({
        words: inc,
        points: add(points),
        panagrams: isPanagram(word) ? inc : identity,
        perfectPanagrams: isPerfectPanagram(word) ? inc : identity,
    }));
    twoLetterList.update(over(lensProp(twoLetters), dec));
    bingo.update(over(lensPath([firstLetter, length(word)]), dec));
}

export const removeWord = (wordToRemove) => {
    words.update(without([wordToRemove]));
    const points = calcPoints(wordToRemove);
    const firstLetter = head(wordToRemove);
    const twoLetters = take(2, wordToRemove);
    scores.update(evolve({
        words: dec,
        points: subtract(__, points),
        panagrams: isPanagram(wordToRemove) ? dec : identity,
        perfectPanagrams: isPerfectPanagram(wordToRemove) ? dec : identity,
    }))
    twoLetterList.update(over(lensProp(twoLetters), inc));
    bingo.update(over(lensPath([firstLetter, length(wordToRemove)]), inc));
}

