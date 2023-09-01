<script lang="ts">
	import WatchlistBtn from './Watchlist/WatchlistBtn.svelte';
	export let title: string;
	export let dbId: number;
	export let eventId: number;
</script>

<div class="flex p-2 justify-between border-b border-surface-300-600-token">
	<h1
		class="w-3/5 truncate peer hover:overflow-visible hover:w-full hover:whitespace-normal transition-all duration-300 ease-in delay-200"
	>
		{title}
	</h1>
	<div class="ml-4 peer-hover:opacity-0 peer-hover:w-0 peer-hover:h-0 transition-all duration-0">
		<WatchlistBtn {dbId} {eventId} />
	</div>
</div>
