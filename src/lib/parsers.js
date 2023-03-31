// @ts-nocheck
import { complement, curry, defaultTo, dropLast, fromPairs, head, isNil, map, mergeAll, nth, pipe, split, toLower, when, zip } from "ramda";

export const parseTopLine = pipe(
    split(', '),
    map(pipe(
        split(': '),
        nth(1),
        when(complement(isNil), split(/ |\(/)),
    )),
    // eslint-disable-next-line no-unused-vars
    ([[words], [points], [panagrams, _, perfectPanagrams]]) => ({
        words,
        points,
        panagrams,
        perfectPanagrams
    }),
    map(pipe(Number, defaultTo(0))),
);

const parseLetterRow = curry((headers, [letter, ...counts]) => [pipe(head, toLower)(letter), fromPairs(dropLast(1, zip(headers, counts))), ]); 

export const parseBingo = pipe(
    split('\n'),
    dropLast(1),
    map(split('\t')),
    ([headers, ...letterRows]) =>  map(parseLetterRow(headers), letterRows),
    dropLast(1),
    fromPairs,
)

export const parseTwoLetterList = pipe(
    split('\n'),
    map(pipe(
        split(' '),
        map(pipe(
            split('-'),
            ([letters, number]) => ([toLower(letters), Number(number)])
        )),
        fromPairs 
    )),
    mergeAll,
)