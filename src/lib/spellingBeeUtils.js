import { add, always, both, cond, equals, length, pipe, T, uniq } from "ramda";

export const isPanagram = pipe(uniq, length, equals(7));
export const isPerfectPanagram = both(isPanagram, pipe(length, equals(7)));
export const calcPoints = cond([
    [pipe(length, equals(4)), always(1)],
    [isPanagram, pipe(length, add(7))],
    [T, length]
]);
