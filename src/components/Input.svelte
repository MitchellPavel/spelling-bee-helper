<script>
  import { any, anyPass, drop, gt, isEmpty, isNil, length, pipe, split, tap, toLower, trim, when } from 'ramda';
  import { parseBingo, parseTopLine, parseTwoLetterList } from '../lib/parsers';
  import { bingo, letters, totals, twoLetterList } from '../lib/stores';

    let textInput;
    const d = new Date();
    const padZeroes = (num) => num.toString().padStart(2, '0');
    const href = `https://www.nytimes.com/${d.getFullYear()}/${padZeroes(d.getMonth() + 1)}/${padZeroes(d.getDate())}/crosswords/spelling-bee-forum.html#:~:text=Spelling%20Bee%20Grid,Further%20Reading`

    // TODO: better error display
    const displayParsingError = (parsingError) => {
        window.alert(parsingError);
    }

    const handleInput = () => {
        let parsingError = '';
        const [letterLine, topLine, bingoText, twoLetterListText] = pipe(
            trim,
            split('\n\n'),
            drop(1),
            when(
                anyPass([isEmpty, any(isNil), any(isEmpty), pipe(length, gt(4))]),
                tap(() => { parsingError = 'Incomplete input, make sure you copied all of the highlighted text'; }),
            )
        )(textInput);
        if (parsingError) {
            displayParsingError(parsingError);
        } else {
            letters.set(pipe(toLower, split(' '))(letterLine));
            totals.set(parseTopLine(topLine));
            bingo.set(parseBingo(bingoText));
            twoLetterList.set(parseTwoLetterList(twoLetterListText));
        }
    }

</script>

<div>
    <p>Follow <a {href} target="_blank" rel="noreferrer noopener">this link to today's puzzle hints</a> and copy all of the highlighted text into the text area below to get started.</p>
    <textarea rows="25" cols="65" bind:value={textInput}/>
    <button on:click={handleInput}>Go</button>
</div>

<style>
    button {
        display: block;
    }
    div {
        width: min-content
    }
</style>
