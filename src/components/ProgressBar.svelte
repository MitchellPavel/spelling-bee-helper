<script>
    import { max } from "ramda";

    export let complete;
    export let total;
    $: percentage = complete/total * 100;
</script>


<div class="flexbox">
    <div class="container">
        <div class="progress" style:width={`${max(percentage, 2)}%`} />
    </div>
    <h3>{Math.round(percentage)}%</h3>
</div>

<style>
    div {
        border-radius: 0.8em;
    }
    h3 {
        margin: 0;
    }
    .flexbox{
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .container {
        width: 23em;
        height: 2em;
        padding: 0.3em;
        background-color: #3B3B3B;
    }
    .progress {
        height: 2em;
        background-color: #F7DA21;
    }
</style>