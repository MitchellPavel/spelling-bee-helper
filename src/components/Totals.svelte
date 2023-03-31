<script>
    import { scores, totals } from "../lib/stores";
</script>

<p>
    Words: {$totals.words - $scores.words}
    Points: {$totals.points - $scores.points}
    Panagrams: {$totals.panagrams - $scores.panagrams}
    {#if $totals.perfectPanagrams !== 0 }
        ({$totals.perfectPanagrams - $scores.perfectPanagrams} perfect)
    {/if}
</p>
