<script>
    import { __, any, complement, identity, includes, join, length, lensIndex, over, pipe, sortBy, split, toLower, toUpper, hasPath, path, pathOr, head, take } from "ramda";
    import { addWord, removeWord } from "../lib/actions";
    import { isPanagram } from "../lib/spellingBeeUtils";
    import { bingo, letters, twoLetterList, words } from "../lib/stores";
    import { fade, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    let wordInput
    let errorMsg
    let timeoutId;

    const capitalCase = pipe(toLower, over(lensIndex(0), toUpper), join(''));

    const inBingo = (word) =>  {
      const bingoValue = path([head(word), length(word)], $bingo);
      return bingoValue && bingoValue !== '-' && bingoValue > 0;
    }
    
    const inTwoLetterList = (word) => {
      const twoLetters = take(2, word);
      return $twoLetterList[twoLetters] > 0;
    };

    const validateWord = (word) => {
        if (length(word) < 4) {
          return 'Too short';
        }
        if (includes(word, $words)) {
            return 'Already found';
        }
        if (any(complement(includes(__, $letters)), split('', word))) {
            return 'Bad letters';
        }
        if (!inBingo(word)) {
            return 'Not in Bingo';
        }
        if (!inTwoLetterList(word)) {
            return 'Not in two letter list';
        }
    };

    const displayError = (error) => {
      errorMsg = error;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        errorMsg = '';
      }, 3000);
    };

    const handleSubmit = () => {
        const error = validateWord(toLower(wordInput));
        if (error) {
            displayError(error);
        } else {
            addWord(wordInput);
        }
        wordInput = '';
    }
</script>

<div>
    <h2>Words</h2>
    <form on:submit|preventDefault={handleSubmit}>
        <input id="word-input" autocomplete="off" bind:value={wordInput} />
        {#if errorMsg}
          <small
              in:fly={{ x: -20, delay: 100 }}
              out:fade={{ duration: 100 }}
          >
            {errorMsg}
          </small>
        {/if}
    </form>
    <ul>
        {#each sortBy(identity, $words) as word (word)}
            <li
              class:panagram={isPanagram(word)}
              in:fly={{ x: -20, delay: 100 }}
              out:fade={{ duration: 100 }}
              animate:flip={{ duration: 100}}
            >
                {capitalCase(word)} ({length(word)})
                <button on:click={() => removeWord(toLower(word))}>x</button>
            </li>
        {/each}
    </ul>
</div>

<style>
  div {
    width: 100%;
  }
  form {
    display: flex;
    gap: 1em;
    align-items: flex-end;
  }
  input {
    padding: 0.3em 0.2em;
  }
  button {
    background: none;
    padding: 0 0.6em;
    visibility: hidden;
  }
  li:hover button {
    visibility: visible;
  }
  li.panagram {
    font-weight: bold;
  }
  li {
    width: fit-content;
  }
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 29em;
    align-content: flex-start;
    align-items: flex-start;
    column-gap: 1em;
  }
  small {
    color: #F7DA21;
  }
</style>