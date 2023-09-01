<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import EventTable from '$lib/components/EventTable.svelte';
	import EventMeanLineChart from '$lib/components/charts/EventMeanLineChart.svelte';
	import { indexOfFirstUppercase } from '$lib/utilities/utils';
	import { fade } from 'svelte/transition';

	export let data;
	const yAxisKeys = ['averagePrice', 'highestPrice', 'lowestPrice', 'listingCount'];
	let yAxisSelected = 'averagePrice';
	const eventStateDifferences = {
		popularity:
			(data.latestRecord.eventPopularity / data.stateAggregate.averagePopularity - 1) * 100,
		score: (data.latestRecord.eventScore / data.stateAggregate.averageScore - 1) * 100,
		averagePrice: (data.latestRecord.averagePrice / data.stateAggregate.averagePrice - 1) * 100
	};

	let isWatched = data.watchlistRecord?.eventId ? true : false;
	const handleWatchlist = () => {
		isWatched = !isWatched;
	};
	//TODO: make the card a component
</script>

<h1 class="text-2xl mb-6">{data.latestRecord.title}</h1>
<div class="flex flex-col gap-6">
	<div class="grid grid-cols-[1fr_3fr] gap-6">
		<div class="card flex flex-col p-4 h-fit">
			<div class="grid grid-cols-[70%_1fr]">
				<div class="flex flex-col leading-snug w-full">
					<h1 class="flex">Event Stats</h1>
					<h1>vs.</h1>
					<h1 class="text-tertiary-500">
						{data.latestRecord.state}
						Average
					</h1>
				</div>
				<div class="grid grid-cols-1 grid-rows-1 h-8 w-[6.3rem]">
					{#key isWatched}
						<div class="h-8 col-span-1 row-span-1 w-[6.3rem]">
							<form
								method="POST"
								action={isWatched ? 'watchlist/remove' : 'watchlist/add'}
								use:enhance
							>
								<input type="hidden" name="sgEventsId" value={data.latestRecord.id} />
								<button
									class="btn btn-sm {isWatched
										? 'variant-filled-primary'
										: 'variant-filled-secondary'} "
									transition:fade={{ duration: 300 }}
									on:click={handleWatchlist}>{isWatched ? '- ' : '+'} Watchlist</button
								>
							</form>
						</div>
					{/key}
				</div>
			</div>
			<div class="flex gap-4">
				<h2 class="text-lg capitalize">{data.latestRecord.eventType}</h2>
				<p>{data.latestRecord.eventDate}</p>
			</div>
			<div class="flex place-items-baseline gap-3">
				<h3 class="text-lg font-regular">Popularity:</h3>
				<p>{data.latestRecord.eventPopularity}</p>
				{#if eventStateDifferences.popularity > 0}
					<p class="text-sm text-green-500">
						+{eventStateDifferences.popularity.toFixed(1)}%
					</p>
				{:else}
					<p class="text-sm text-red-500">
						{eventStateDifferences.popularity.toFixed(1)}%
					</p>
				{/if}
			</div>

			<div class="flex place-items-baseline gap-3">
				<h3 class="text-lg font-regular">Score:</h3>
				<p>{data.latestRecord.eventScore}</p>
				{#if eventStateDifferences.score > 0}
					<p class="text-sm text-green-500">+{eventStateDifferences.score.toFixed(1)}%</p>
				{:else}
					<p class="text-sm text-red-500">{eventStateDifferences.score.toFixed(1)}%</p>
				{/if}
			</div>
			<div class="flex place-items-baseline gap-3">
				<h3 class="text-lg font-regular">Mean Price:</h3>
				<p>{data.latestRecord.averagePrice}</p>
				{#if eventStateDifferences.averagePrice > 0}
					<p class="text-sm text-green-500">+{eventStateDifferences.averagePrice.toFixed(1)}%</p>
				{:else}
					<p class="text-sm text-red-500">{eventStateDifferences.averagePrice.toFixed(1)}%</p>
				{/if}
			</div>
			<div class="flex place-items-baseline gap-3">
				<h3 class="text-lg font-regular">Price Range:</h3>
				<p>{data.latestRecord.lowestPrice} - {data.latestRecord.highestPrice}</p>
			</div>
			<div class="flex place-items-baseline gap-3">
				<h3 class="text-lg font-regular">Record Count:</h3>
				{#await data.streamed.eventRecords}
					loading...
				{:then events}
					<p>{events.data?.length}</p>
				{/await}
			</div>
		</div>
		<div class="card w-full p-4">
			<div class="flex h-14">
				<h1 class=" font-3xl mt-4 ml-4">Event Prices by Created Date</h1>
				<form class="z-10 ml-auto p-4">
					<select class="select w-40" bind:value={yAxisSelected}>
						{#each yAxisKeys as selector}
							<option class="capitalize" value={selector}>
								{selector.slice(0, indexOfFirstUppercase(selector))}
							</option>
						{/each}
					</select>
				</form>
			</div>
			{#await Promise.all( [data.streamed.eventRecords, data.streamed.eventTypeAggs, data.streamed.stateAggs] )}
				loading
			{:then streamedData}
				{#key yAxisSelected}
					<div id="legend-container" />
					<EventMeanLineChart
						events={streamedData[0].data}
						eventAggs={streamedData[1].data}
						stateAggs={streamedData[2].data}
						axisKeys={{ x: 'created_at', y: yAxisSelected }}
					/>
				{/key}
			{/await}
		</div>
	</div>
</div>
<div class="col-span-5 mt-6">
	{#await data.streamed.stateEvents}
		loading...
	{:then events}
		<div class="mt-4 w-full">
			<EventTable events={events.data} />
		</div>
	{/await}
</div>
