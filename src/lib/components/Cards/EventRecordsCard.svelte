<script lang="ts">
	import type { Tables } from '$lib/types/db.types';
	import WatchlistBtn from '../Watchlist/WatchlistBtn.svelte';

	export let eventRecords: Tables<'sgEventsUpcoming'>[] | null;
	export let latestRecord: Tables<'sgEventsUpcoming'>;
	let awaiting = eventRecords === null ? true : false;
	let eventAgg: Partial<Tables<'sgEventsUpcoming'>> | undefined = {
		averagePrice: 0,
		eventScore: 0,
		eventPopularity: 0,
		highestPrice: 0
	};

	//TODO: add options for the type of aggregation i.e. vs. itself or vs. state / event type etc.
	if (!awaiting) {
		eventAgg = eventRecords?.reduce(
			(res, currRecord, idx, { length }) => {
				if (idx === length - 1) {
					return {
						averagePrice: currRecord.averagePrice ?? 0 / length,
						eventScore: currRecord.eventScore ?? 0 / length,
						eventPopularity: currRecord.eventPopularity ?? 0 / length,
						highestPrice: currRecord.highestPrice ?? 0 / length
					};
				} else {
					return {
						averagePrice: currRecord.averagePrice ?? 0,
						eventScore: currRecord.eventScore ?? 0,
						eventPopularity: currRecord.eventPopularity ?? 0,
						highestPrice: currRecord.highestPrice ?? 0
					};
				}
			},
			{ averagePrice: 0, eventScore: 0, eventPopularity: 0, highestPrice: 0 }
		);
	}
</script>

<article class="card p-4 m-6 w-96">
	<div class="h-36 w-80 {awaiting ? 'animate-pulse' : ''}">
		<slot name="chart" />
	</div>
	<div
		class="flex p-2 h-12 place-items-center justify-between border-b border-surface-300-600-token"
	>
		<div
			data-tooltip={latestRecord.title}
			class="w-2/4 relative content-none hover:before:content-[attr(data-tooltip)] hover:before:absolute before:-translate-y-full hover:before:whitespace-nowrap hover:before:bg-surface-50-900-token hover:before:p-2 hover:before:font-bold"
		>
			<h1 class="truncate">
				{latestRecord.title}
			</h1>
		</div>
		<WatchlistBtn dbId={latestRecord.id} eventId={latestRecord.eventId} />
	</div>
	<div class="m-2">
		<div class="grid grid-cols-2 gap-4 justify-between place-items-center h-full">
			<div class="flex flex-col">
				<p class="capitalize">{latestRecord.eventType.replaceAll('_', ' ')}</p>
				<p>State: {latestRecord.state}</p>
				<p>Date: {latestRecord.eventDate}</p>
				<p>Since: {latestRecord.announceDate}</p>
			</div>
			<div class="flex flex-col h-full place-content-start">
				<span class="flex gap-2"
					><p class="whitespace-nowrap">Score: {latestRecord.eventScore.toFixed(3)}</p>
					{#if !awaiting}
						{@const scoreDiff =
							((latestRecord.eventScore - eventAgg.eventScore) / latestRecord.eventScore) * 100}
						<p class={scoreDiff > 0 ? 'text-green-500' : 'text-red-500'}>{scoreDiff.toFixed(0)}%</p>
					{/if}
				</span>
				<span class="flex gap-2">
					<p class="whitespace-normal">Pop: {latestRecord.eventPopularity.toFixed(3)}</p>
					{#if !awaiting}
						{@const popularityDiff =
							((latestRecord.eventPopularity - eventAgg.eventPopularity) /
								latestRecord.eventPopularity) *
							100}
						<p class={popularityDiff > 0 ? 'text-green-500' : 'text-red-500'}>
							{popularityDiff.toFixed(0)}%
						</p>
					{/if}
				</span>
				<span class="flex gap-2">
					<p class="whitespace-normal">Price: {latestRecord.averagePrice.toFixed(0)}</p>
					{#if !awaiting}
						{@const priceDiff =
							((latestRecord.averagePrice - eventAgg.averagePrice) / latestRecord.averagePrice) *
							100}
						<p class={priceDiff > 0 ? 'text-green-500' : 'text-red-500'}>{priceDiff.toFixed(0)}%</p>
					{/if}
				</span>
				<span class="flex gap-2">
					<p class="whitespace-normal">Price: {latestRecord.highestPrice.toFixed(0)}</p>
					{#if !awaiting}
						{@const highestPriceDiff =
							((latestRecord.highestPrice - eventAgg.highestPrice) / latestRecord.highestPrice) *
							100}
						<p class={highestPriceDiff > 0 ? 'text-green-500' : 'text-red-500'}>
							{highestPriceDiff.toFixed(0)}%
						</p>
					{/if}
				</span>
			</div>
		</div>
	</div>
</article>
