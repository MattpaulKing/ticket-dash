<script lang="ts">
	import { watchlistStore } from '$lib/components/Watchlist/watchlistStore';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let dbId: number;
	export let eventId: number;

	let isWatched = $watchlistStore.find((watchlistEventId) => watchlistEventId === eventId)
		? true
		: false;

	const handleWatchlist = () => {
		isWatched = !isWatched;
	};
</script>

<div class="grid grid-cols-1 grid-rows-1 h-8 w-[6.3rem]">
	{#key isWatched}
		<div class="h-8 col-span-1 row-span-1 w-[6.3rem]">
			<form method="POST" action={isWatched ? '?/remove' : '?/add'} use:enhance>
				<input type="hidden" name="dbId" value={dbId} />
				<input type="hidden" name="eventId" value={eventId} />
				<button
					class="btn btn-sm {isWatched ? 'variant-filled-primary' : 'variant-filled-secondary'} "
					transition:fade={{ duration: 300 }}
					on:click={handleWatchlist}>{isWatched ? '- ' : '+'} Watchlist</button
				>
			</form>
		</div>
	{/key}
</div>
