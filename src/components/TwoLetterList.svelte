<script>
  import { equals, groupWith, pipe, reject, toPairs, toUpper } from "ramda";
    import { twoLetterList } from "../lib/stores";

  const format2LL = pipe(
    reject(equals(0)),
    toPairs,
    groupWith(([[a]], [[b]]) => equals(a, b)),
  )

</script>

<div>
  <h2>Two Letter List</h2>
  <ul>
  {#each format2LL($twoLetterList) as letterGroup}
      <li>
      {#each letterGroup as [twoLetters, count]} 
          <b>{toUpper(twoLetters)}</b>: {count}{'\t'}
      {/each}
      </li>
  {/each}
  </ul>
</div>

<style>
    div {
        width: 100%;
    }
</style>