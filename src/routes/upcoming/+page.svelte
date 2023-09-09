<script lang="ts">
	import EventTable from '$lib/components/EventTable.svelte';
	import { Line } from 'svelte-chartjs';
	export let data;

	//TODO: add aggs for state / times / event types
</script>

<div class="flex flex-col gap-6">
	<div class="flex gap-6">
		<dl class="card list-dl max-h-80 w-72 overflow-y-scroll overflow-x-hidden">
			{#each data.lastWeekEvents as event}
				<li
					class="grid grid-cols-1 btn hover:variant-soft-surface rounded-none border-surface-300-600-token border-b"
				>
					<div
						data-tooltip={event.title}
						class="w-full relative content-none hover:after:content-[attr(data-tooltip)] hover:after:absolute after:-translate-y-full hover:after:bg-surface-50-900-token hover:after:p-2 hover:after:font-bold hover:after:w-60 hover:after:whitespace-normal"
					>
						<dt class="text-left truncate font-bold">
							{event.title}
						</dt>
					</div>
					<dd class="grid grid-cols-2 w-full">
						<span class="flex place-self-start"
							><p class="text-surface-600-300-token">Mean:</p>
							<p class="ml-1">{event.averagePrice}</p></span
						>
						<span class="flex place-self-start"
							><p class="text-surface-600-300-token">Highest:</p>
							<p class="ml-1">{event.highestPrice}</p></span
						>
						<span class="flex place-self-start"
							><p class="text-surface-600-300-token">Score:</p>
							<p class="ml-1">{event.eventScore.toFixed(3)}</p></span
						>
						<span class="flex place-self-start"
							><p class="text-surface-600-300-token">Pop:</p>
							<p class="ml-1">{event.eventPopularity.toFixed(3)}</p></span
						>
					</dd>
				</li>
			{/each}
		</dl>
	</div>
	<div class="flex">
		<Line />
	</div>

	{#await data.streamed.announcedLastThreeDays then announcedLastThreeDays}
		<EventTable events={announcedLastThreeDays.data} />
	{/await}
</div>
