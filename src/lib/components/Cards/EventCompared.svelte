<script lang="ts">
	import { toTitleCase } from '$lib/utilities/utils';
	export let events;
	//TODO replace the skull with imgs
</script>

<dl class="list-dl max-h-80 overflow-y-auto">
	{#each events as event}
		<li
			class="flex place-items-center space-x-4 space-y-4 hover:bg-primary-800 hover:bg-opacity-30"
		>
			<span class="badge bg-primary-500 h-fit">💀</span>
			<a href="/event-details/{event.eventId}">
				<span class="flex">
					{event.title} - {toTitleCase(event.eventType, '_')}
				</span>
				<span class="flex space-x-2 place-items-baseline">
					<p>
						{event.medianPrice}
					</p>
					<p class="text-xs">
						{(
							((event.medianPrice - event.comparisonAveragePrice) / event.comparisonAveragePrice) *
							100
						).toFixed(2)}%
					</p>
				</span>
			</a>
		</li>
		<hr />
	{/each}
</dl>

