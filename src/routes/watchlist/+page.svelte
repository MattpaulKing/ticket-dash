<script lang="ts">
	import EventRecordsCard from '$lib/components/Cards/EventRecordsCard.svelte';
	import type { Tables } from '$lib/types/db.types.js';

	export let data;
	const watchlistRecords: Tables<'sgEventsUpcoming'>[][] = data.watchlistRecords;

	//TODO: Make this a realtime connection
</script>

<div>
	<h1>Watchlist</h1>
	<div class="flex" />
	{#each data.watchlistRecords as eventRecords}
		<EventRecordsCard awaiting={false} latestRecord={eventRecords[0]} {eventRecords} />
	{/each}
</div>
