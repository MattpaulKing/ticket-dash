<script lang="ts">
	export let data;

	//TODO create a function to sort the array in db
</script>

<div>
	<h1>Watchlist</h1>
	<div class="flex" />
	{#each data.events as event}
		<div>{event.title}</div>
	{/each}
</div>
