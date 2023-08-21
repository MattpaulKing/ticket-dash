<script lang="ts">
	import { toTitleCase } from '$lib/utilities/utils';
	export let event;
	export let typeOfComparison: string;
	const comparisonDifferences = {
		popularity: (event.eventPopularity / event.comparisonPopularity - 1) * 100,
		score: (event.eventScore / event.comparisonScore - 1) * 100,
		averagePrice: (event.averagePrice ?? 0 / event.comparisonAveragePrice - 1) * 100
	};
	//TODO insert conditional logic for type of comparison -->
</script>

<div class="grid grid-cols-2 grid-rows-2">
	<div class="card p-4 w-96">
		<h1 class="mb-4 inline-flex">
			Event Stats vs.
			<p class="text-tertiary-500 mx-2">{toTitleCase(event[typeOfComparison], '_')}</p>
			Average
		</h1>
		<h2>{toTitleCase(event.title)}</h2>
		<div class="flex gap-4">
			<h2 class="text-lg capitalize">{toTitleCase(event.eventType, '_')}</h2>
			<p>{event.eventDate}</p>
		</div>
		<div class="flex gap-4">
			<p>Location: {event.city}</p>
			<p>{event.state}</p>
		</div>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Popularity:</h3>
			<p>{event.eventPopularity.toFixed(3)}</p>
			{#if comparisonDifferences.popularity > 0}
				<p class="text-sm text-green-500">
					+{comparisonDifferences.popularity.toFixed(1)}%
				</p>
			{:else}
				<p class="text-sm text-red-500">
					{comparisonDifferences.popularity.toFixed(1)}%
				</p>
			{/if}
		</div>

		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Score:</h3>
			<p>{event.eventScore.toFixed(3)}</p>
			{#if comparisonDifferences.score > 0}
				<p class="text-sm text-green-500">+{comparisonDifferences.score.toFixed(1)}%</p>
			{:else}
				<p class="text-sm text-red-500">{comparisonDifferences.score.toFixed(1)}%</p>
			{/if}
		</div>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Mean Price:</h3>
			<p>{event.averagePrice ? event.averagePrice.toFixed(2) : 0}</p>
			{#if comparisonDifferences.averagePrice > 0}
				<p class="text-sm text-green-500">+{comparisonDifferences.averagePrice.toFixed(1)}%</p>
			{:else}
				<p class="text-sm text-red-500">{comparisonDifferences.averagePrice.toFixed(1)}%</p>
			{/if}
		</div>
		<div class="flex place-items-baseline gap-3">
			<h3 class="text-lg font-regular">Price Range:</h3>
			<p>
				{event.lowestPrice ? event.lowestPrice.toFixed(2) : 0} - {event.highestPrice
					? event.highestPrice.toFixed(2)
					: 0}
			</p>
		</div>
	</div>
</div>
