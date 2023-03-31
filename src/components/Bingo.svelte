<script>
    import { all, either, equals, toPairs, toUpper } from "ramda";
    import { bingo } from "../lib/stores";
</script>

<div>
    <h2>Bingo</h2>
    <table>
        <thead>
            <tr>
                <th></th>
                {#each Object.keys(toPairs($bingo)[0][1]) as wordLen}
                    <th>{wordLen}</th> 
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each toPairs($bingo) as [letter, counts] (letter)}
                <tr class:completed={all(either(equals(0), equals('-')), Object.values(counts))}>
                    <td><b>{toUpper(letter)}</b></td>
                    {#each Object.values(counts) as count}
                        <td>{count || '-'}</td>
                    {/each}
                </tr>
            {/each} 
        </tbody>
    </table>
</div>

<style>
    div {
        width: 100%;
    }
    th, td {
        padding: 0.25em 0.5em;
    }
    .completed {
        opacity: 50%;
    }
</style>