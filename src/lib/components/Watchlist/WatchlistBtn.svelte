<script lang="ts">
	import { watchlistStore } from '$lib/components/Watchlist/watchlistStore';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let dbId: number;
	export let eventId: number;

	let isWatched = $watchlistStore.includes(eventId);

	const handleWatchlist = (eventId: number) => {
		if (!isWatched) {
			$watchlistStore.push(eventId);
			isWatched = true;
		} else {
			$watchlistStore = $watchlistStore.filter((watchlistId) => watchlistId != eventId);
			isWatched = false;
		}
		return null;
	};
</script>

<!--HACK: grid gets around the button flying off position -->
<div class="grid grid-cols-1 grid-rows-1 h-8 w-[6.3rem]">
	{#key isWatched}
		<div class="h-8 col-span-1 row-span-1 w-[6.3rem]">
			<form
				method="POST"
				action={isWatched ? '/?/remove' : '/?/add'}
				use:enhance={() => {
					return async ({ update }) => {
						//console.log(update);
					};
				}}
			>
				<input type="hidden" name="dbId" value={dbId} />
				<input type="hidden" name="eventId" value={eventId} />
				<button
					class="btn btn-sm {isWatched ? 'variant-filled-primary' : 'variant-filled-secondary'} "
					transition:fade={{ duration: 300 }}
					on:click={handleWatchlist(eventId)}>{isWatched ? '- ' : '+'} Watchlist</button
				>
			</form>
		</div>
	{/key}
</div>
