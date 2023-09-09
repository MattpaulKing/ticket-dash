<script lang="ts">
	import EventsCompared from '$lib/components/Cards/EventsCompared.svelte';
	import EventTable from '$lib/components/EventTable.svelte';
	import { eventTypeAggStore } from '$lib/stores/eventTypeAggStore.js';
	import { toTitleCase } from '$lib/utilities/utils.js';
	import { slide } from 'svelte/transition';
	export let data;
</script>

<div class="flex flex-col gap-6">
	<!--
		{#await data.streamed.announcedLastThreeDays}
			<div class="card p-4 text-token">
				<h1 class="text-xl font-bold">Just Announced</h1>
				<p class="leading-4 text-opacity-50">Last Three Days</p>
				<hr class="my-3" />
				loading . . .
			</div>
		{:then announcedLastThreeDays}
			<div class="card p-4 text-token" in:slide>
				<h1 class="text-xl font-bold">Just Announced</h1>
				<p class="leading-4 text-opacity-50">Last Three Days</p>
				<hr class="my-3" />
				<EventsCompared events={announcedLastThreeDays.data} />
			</div>
		{:catch error}
			{error}
		{/await}
    -->

	<dl class="card list-dl max-h-80 w-72 overflow-y-auto overflow-x-hidden">
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
						><p class="text-surface-400">Mean:</p>
						<p class="ml-1">{event.averagePrice}</p></span
					>
					<span class="flex place-self-start"
						><p class="text-surface-400">Highest:</p>
						<p class="ml-1">{event.highestPrice}</p></span
					>
					<span class="flex place-self-start"
						><p class="text-surface-400">Score:</p>
						<p class="ml-1">{event.eventScore.toFixed(3)}</p></span
					>
					<span class="flex place-self-start"
						><p class="text-surface-400">Pop:</p>
						<p class="ml-1">{event.eventPopularity.toFixed(3)}</p></span
					>
				</dd>
			</li>
		{/each}
	</dl>

	{#await data.streamed.announcedLastThreeDays then announcedLastThreeDays}
		<EventTable events={announcedLastThreeDays.data} />
	{/await}
</div>
