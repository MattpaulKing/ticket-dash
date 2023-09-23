<script lang="ts">
	import { stateAggStore } from '$lib/stores/stateAggStore';
	import { typeAggStore } from '$lib/stores/typeAggStore';
	import type { Tables } from '$lib/types/db.types';
	import { totalAggregate } from '$lib/utilities/totalAggregate';
	import { setContext } from 'svelte';
	import WatchlistBtn from '$lib/components/Watchlist/WatchlistBtn.svelte';

	export let eventRecords: Tables<'sgEventsUpcoming'>[] | null = null;
	export let latestRecord: Tables<'sgEventsUpcoming'>;
	export let comparisonType: 'eventType' | 'state' | 'self' = 'eventType';
	export let awaiting: boolean;
	let eventAgg: Partial<Tables<'sgEventsUpcoming'>> | undefined = {
		averagePrice: 0,
		eventScore: 0,
		eventPopularity: 0,
		highestPrice: 0
	};

	if (!awaiting) {
		if (comparisonType === 'eventType') {
			eventAgg = totalAggregate([...$typeAggStore]);
		} else if (comparisonType === 'state') {
			eventAgg = totalAggregate([...$stateAggStore]);
		} else if (comparisonType === 'self' && eventRecords !== null) {
			eventAgg = totalAggregate(eventRecords);
		}
	}
	setContext('chartData', eventRecords);
</script>

<article class="card p-4 my-6 max-w-md">
	<div class="h-36 w-80 {awaiting ? 'animate-pulse' : ''}">
		<slot name="chart" />
	</div>
	<div
		class="flex p-2 h-12 place-items-center justify-between border-b border-surface-300-600-token"
	>
		<div
			data-tooltip={latestRecord.title}
			class="w-52 relative content-none hover:before:content-[attr(data-tooltip)] hover:before:absolute before:-translate-y-full hover:before:whitespace-nowrap hover:before:bg-surface-50-900-token hover:before:p-2 hover:before:font-bold"
		>
			<h1 class="truncate">
				{latestRecord.title}
			</h1>
		</div>
		<WatchlistBtn dbId={latestRecord.id} eventId={latestRecord.eventId} />
	</div>
	<div class="m-2">
		<div class="grid grid-cols-[40%_60%] gap-2 justify-between place-items-center h-full">
			<div class="flex flex-col">
				<p class="capitalize">{latestRecord.eventType.replaceAll('_', ' ')}</p>
				<span class="flex gap-1"
					><p class="text-sm place-self-end">State:</p>
					<p>{latestRecord.state}</p>
				</span>
				<span class="flex gap-1"
					><p class="text-sm place-self-end">Date:</p>
					<p>{latestRecord.eventDate}</p>
				</span>
				<span class="flex gap-1"
					><p class="text-sm place-self-end">Since:</p>
					<p>{latestRecord.announceDate}</p>
				</span>
			</div>
			<div class="flex flex-col h-full place-content-start">
				<span class="flex gap-2"
					><p class="whitespace-nowrap">Score: {latestRecord.eventScore?.toFixed(3)}</p>
					{#if !awaiting}
						{@const scoreDiff =
							((latestRecord.eventScore - eventAgg.eventScore) / latestRecord.eventScore) * 100}
						<p class={scoreDiff >= -0.9 ? 'text-green-500' : 'text-red-500'}>
							{scoreDiff?.toFixed(0)}%
						</p>
					{/if}
				</span>
				<span class="flex gap-2">
					<p class="whitespace-normal">Pop: {latestRecord.eventPopularity?.toFixed(3)}</p>
					{#if !awaiting}
						{@const popularityDiff =
							((latestRecord.eventPopularity - eventAgg.eventPopularity) /
								latestRecord.eventPopularity) *
							100}
						<p class={popularityDiff > 0 ? 'text-green-500' : 'text-red-500'}>
							{popularityDiff?.toFixed(0)}%
						</p>
					{/if}
				</span>
				<span class="flex gap-2">
					<p class="whitespace-normal">Price: {latestRecord.averagePrice?.toFixed(0)}</p>
					{#if !awaiting}
						{@const priceDiff =
							((latestRecord.averagePrice - eventAgg.averagePrice) / latestRecord.averagePrice) *
							100}
						<p class={priceDiff > 0 ? 'text-green-500' : 'text-red-500'}>
							{priceDiff?.toFixed(0)}%
						</p>
					{/if}
				</span>
				<span class="flex gap-2">
					<p class="whitespace-nowrap">High: {latestRecord.highestPrice?.toFixed(0)}</p>
					{#if !awaiting}
						{@const highestPriceDiff =
							((latestRecord.highestPrice - eventAgg.highestPrice) / latestRecord.highestPrice) *
							100}
						<p class={highestPriceDiff > 0 ? 'text-green-500' : 'text-red-500'}>
							{highestPriceDiff?.toFixed(0)}%
						</p>
					{/if}
				</span>
			</div>
		</div>
	</div>
</article>
