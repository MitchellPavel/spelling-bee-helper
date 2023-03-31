<script>
    import Input from './components/Input.svelte';
    import Totals from './components/Totals.svelte';
    import Bingo from './components/Bingo.svelte';
    import TwoLetterList from './components/TwoLetterList.svelte';
    import Words from './components/Words.svelte';
    import ProgressBar from './components/ProgressBar.svelte';

    import { bingo, scores, totals, twoLetterList } from './lib/stores';

</script>

<h1>Spelling Bee Helper</h1>
<p>Created by <a href="https://www.mitch-pavel.com/" target="_blank" rel="noreferrer noopener">Mitch Pavel</a></p>
{#if $totals && $bingo && $twoLetterList}
    <Totals />
    <ProgressBar total={$totals.points} complete={$scores.points} />
    <main>
        <div class="flexbox">
            <Bingo />
            <TwoLetterList />
        </div>
        <Words />
    </main> 
{:else}
    <Input />
{/if}

<style>
    main {
        height: 36em;
        display: flex;
        gap: 2em;
        width: 100%;
    }
    .flexbox {
        display: flex;
        flex-direction: column;
    }
    p {
        margin-top: 0;
        font-size: 0.75em;
    }
</style>