<script lang="ts">
	import { toTitleCase } from '$lib/utilities/utils';
	import { derived, writable, type Writable } from 'svelte/store';
	import DropdownFilterOptions from './DropdownFilterOptions.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import FilterIcon from '$lib/icons/FilterIcon.svelte';
	import type { Database } from '../../../schema';

	export let filterValues;
	let filtersVisible = false;

	//TODO add input store for the eventType store to build out of
	let titleSearchStore = writable(filterValues.distinctTitles);
	let eventTypeStore = writable(filterValues.distinctTypes);
	let eventsRangeStore: Writable<[Date, Date]> = writable([
		filterValues.min_date,
		filterValues.max_date
	]);
	let stateStore = writable(filterValues.distinctStates);
	let eventStore: Database['public']['Tables']['sgEvents']['Row'][] = writable([]);

	let filterStore = derived(
		[titleSearchStore, eventTypeStore, eventsRangeStore, stateStore, eventStore],
		([$titleSearchStore, $eventTypeStore, $eventsRangeStore, $stateStore, $eventStore]) => {
			if ($eventStore) {
				return $eventStore.filter((event: Database['public']['Tables']['sgEvents']['Row']) => {
					$titleSearchStore.includes(event.title) &&
						$eventTypeStore.includes(event.eventType) &&
						$eventsRangeStore[0] <= event.eventDate &&
						$eventsRangeStore[1] >= event.eventDate &&
						$stateStore.includes(event.state);
				});
			}
		},
		eventStore
	);
</script>

<div class="flex h-10 gap-4">
	{#if filtersVisible}
		<DropdownFilterOptions label="Event Title">
			<div slot="input" class="flex flex-col card p-4">
				<p>Event Title</p>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim w-6"><SearchIcon /></div>
					<input type="search" placeholder="Search..." bind:value={$titleSearchStore} />
					<button class="variant-filled-secondary">Submit</button>
				</div>
			</div>
		</DropdownFilterOptions>
		<DropdownFilterOptions label="Event Types">
			<div slot="input" class="flex flex-col card p-4">
				<input
					class="input mb-2"
					type="search"
					placeholder="Search..."
					bind:value={$eventTypeStore}
				/>
				<select class="select w-48" multiple value={[]}>
					{#key $eventTypeStore}
						{#each $eventTypeStore as eventType}
							{#if eventType.length > 16}
								<option class="!p-1 w-full" value={eventType} title={toTitleCase(eventType, '_')}
									>{toTitleCase(eventType, '_').slice(0, 16).concat('...')}</option
								>
							{:else}
								<option class="!p-1 w-full" value={eventType}>{toTitleCase(eventType, '_')}</option>
							{/if}

							<option class="!p-0" disabled>─────────────────</option>
						{/each}
					{/key}
				</select>
			</div>
		</DropdownFilterOptions>
		<DropdownFilterOptions label="Events Range">
			<div slot="input" class="flex flex-col card p-4">
				<p class="ml-2">From</p>
				<input class="input" title="Events From" type="date" />
				<p class="ml-2 mt-4">To</p>
				<input class="input" type="date" />
			</div>
		</DropdownFilterOptions>
		<DropdownFilterOptions label="State">
			<div slot="input" class="flex flex-col card p-4">
				<input
					class="input mb-2"
					type="search"
					placeholder="Search..."
					bind:value={$eventTypeStore}
				/>
				<select class="select w-48" multiple value={[]}>
					{#each filterValues.distinctStates as state}
						<option value={state}>{state}</option>
					{/each}
				</select>
			</div>
		</DropdownFilterOptions>
	{/if}
	<button
		class="btn btn-base h-8 variant-filled-secondary place-self-center"
		on:click={() => (filtersVisible = !filtersVisible)}><FilterIcon /></button
	>
</div>
