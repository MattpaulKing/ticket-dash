<script lang="ts">
	import { toTitleCase, getComparisonAveragePrice } from '$lib/utilities/utils';
	export let events;
	events = events.sort((a, b) => getComparisonAveragePrice(b) - getComparisonAveragePrice(a));
	//TODO
	// replace the skull with imgs
	// add a section for similar events
	//  a. include same type of event
	//  b. +- some popularity
	//  c. +- some score
	//  d. can be closed events
</script>

<dl class="list-dl max-h-80 overflow-y-auto">
	{#each events as event}
		<a href="/event-details/{event.eventId}">
			<li
				class="border-b border-surface-500/50 flex place-items-center space-x-4 space-y-4 hover:bg-surface-500/20"
			>
				<span class="ml-2 flex flex-col badge bg-surface-500 h-fit">💀</span>
				<span class="flex flex-col">
					<span class="flex w-full">
						<h1>{event.title} - {toTitleCase(event.eventType, '_')}</h1>
					</span>
					<span class="flex w-full space-x-2 place-items-center">
						<div class="flex gap-1 h-min">
							<p class="text-surface-400">Mean Price:</p>
							<p>{event.medianPrice}</p>
						</div>
						{#if getComparisonAveragePrice(event) > 0}
							<p class="text-xs text-primary-500">
								+{getComparisonAveragePrice(event).toFixed(2)}%
							</p>
						{:else}
							<p class="text-xs text-red-500">
								{getComparisonAveragePrice(event).toFixed(2)}%
							</p>
						{/if}
					</span>
				</span>
			</li>
		</a>
	{/each}
</dl>
