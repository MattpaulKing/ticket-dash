<script lang="ts">
	import EventMeanLineChart from '$lib/components/charts/EventMeanLineChart.svelte';
	import { indexOfFirstUppercase } from '$lib/utilities/utils';

	export let data;
	const latestEvent = data.eventDetails;

	//TODO fix the sizing of layout
	const yAxisKeys = ['averagePrice', 'highestPrice', 'lowestPrice', 'listingCount'];
	let yAxisSelected = 'averagePrice';
</script>

<h1 class="text-2xl mb-6">{latestEvent.title}</h1>
<div class="flex gap-6">
	<div class="card p-4 max-w-fit min-w-fit">
		<h2 class="text-lg capitalize">{latestEvent.eventType}</h2>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Popularity:</h3>
			<p>{latestEvent.eventPopularity}</p>
		</div>

		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Score:</h3>
			<p>{latestEvent.eventPopularity}</p>
		</div>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Mean Price:</h3>
			<p>{latestEvent.averagePrice}</p>
		</div>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Price Range:</h3>
			<p>{latestEvent.lowestPrice} - {latestEvent.highestPrice}</p>
		</div>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Record Count:</h3>
			{#await data.streamed.events}
				loading...
			{:then events}
				<p>{events.data.length}</p>
			{/await}
		</div>
	</div>
	<div class="card w-full">
		<div class="flex h-14">
			<h1 class=" font-3xl mt-4 ml-4">Event Prices by Date</h1>
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
		{#await data.streamed.events}
			loading...
		{:then events}
			{#key yAxisSelected}
				<EventMeanLineChart events={events.data} axisKeys={{ x: 'created_at', y: yAxisSelected }} />
			{/key}
		{:catch error}
			Error
		{/await}
	</div>
</div>
