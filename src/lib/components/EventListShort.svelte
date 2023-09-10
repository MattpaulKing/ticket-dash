<script lang="ts">
	import type { Tables } from '$lib/types/db.types';
	export let events: Tables<'sgEventsUpcoming'>[];
</script>

<dl class="card list-dl h-[75vh] w-full overflow-y-scroll overflow-x-hidden">
	{#each events as event}
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
