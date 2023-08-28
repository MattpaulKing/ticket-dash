<script lang="ts">
	import EventTable from '$lib/components/EventTable.svelte';
	import { filterStore } from '$lib/components/Filters/filterStore';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { indexOfFirstUppercase } from '$lib/utilities/utils.js';
	export let data;

	const yAxisKeys = ['averagePrice', 'highestPrice', 'lowestPrice', 'listingCount'];
	let yAxisSelected = 'averagePrice';

	const aggData = data.eventTypeTotalAggs[0];
</script>

<div>
	<h1 class="h1">Event Types</h1>
	<div
		class="container grid grid-cols-5 grid-rows-1 mt-8 gap-6 h-full w-full mx-auto justify-center items-center"
	>
		<div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-6 h-full">
			{#key $filterStore.eventType}
				<KpiCard
					chartData={data.eventTypeAggs}
					axisKeys={{ x: 'created_at', y: 'averagePrice' }}
					{aggData}
					titleAccessor={'eventType'}
					kpiAccessor={'averagePrice'}
				/>
			{/key}
		</div>
		<div class="col-span-3 card p-4 h-full">
			<div class="flex h-14">
				<h1 class=" font-3xl mt-4 ml-4">Average Price by Created Date</h1>
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
			<div id="legend-container" />
			<!--
			{#key $filterStore.eventType}
				{#key yAxisSelected}
					<MeanLineChart
						groupedEvents={data.splitMonthlyEventAggs}
						axisKeys={{ x: 'created_at', y: yAxisSelected }}
					/>
				{/key}
			{/key}
      -->
		</div>
	</div>
	<!--
	<div class="col-span-5 mt-6">
		{#await data.streamed.events}
			loading...
		{:then events}
			<div class="mt-4">
				<EventTable events={events.data} />
			</div>
		{/await}
	</div>
  -->
</div>
