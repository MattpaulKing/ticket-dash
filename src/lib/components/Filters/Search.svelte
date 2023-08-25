<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { toTitleCase } from '$lib/utilities/utils';
	import FzfInputChip from './FzfInputChip.svelte';
	import {
		titleSearchStore,
		eventTypeStore,
		eventsRangeStore,
		stateStore,
		eventStore,
		filterStore
	} from '$lib/components/Filters/filterStore';
	import DropdownFilterOptions from './DropdownFilterOptions.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import FilterIcon from '$lib/icons/FilterIcon.svelte';

	export let ogFilterOptions;
	let filtersVisible = false;

	let stateSearch = '';

	const filterOptions = {
		distincttitles: ogFilterOptions[0],
		distinctEventTypes: ogFilterOptions[1].map((eventType: string) => ({
			label: toTitleCase(eventType, '_'),
			value: eventType
		})),
		distinctStates: ogFilterOptions[2].filter((opt: string) => opt?.includes(stateSearch)),
		minMaxDates: ogFilterOptions[3]
	};
	let inputChip = '';
	/*
	function onEventTypeSelection(event: Event): void {
		inputChip = event.detail.label;
		dispatch('add', {
			event,
			chipIndex: $eventTypeStore.length - 1,
			chipValue: event.detail.label
		});
	}
  */

	//TODO slim down input chip fork and implement ability to send selection event to it from the autocomplete
	//add the same functionality to state filter
</script>

<div class="flex h-10 gap-4">
	{#if filtersVisible}
		<div class="flex h-10 gap-4" transition:slide={{ axis: 'x' }}>
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
					<FzfInputChip
						bind:input={inputChip}
						bind:value={$eventTypeStore}
						name="chips"
						fzfwhitelist={ogFilterOptions[1]}
					/>
					<Autocomplete
						class="h-44 overflow-y-auto"
						tabindex="-1"
						bind:input={inputChip}
						options={filterOptions.distinctEventTypes}
					/>
				</div></DropdownFilterOptions
			>
			<DropdownFilterOptions label="Events Range">
				<div slot="input" class="flex flex-col card p-4">
					<p class="ml-2">From</p>
					<input class="input" title="Events From" type="date" bind:value={$eventsRangeStore[0]} />
					<p class="ml-2 mt-4">To</p>
					<input class="input" type="date" bind:value={$eventsRangeStore[1]} />
				</div>
			</DropdownFilterOptions>
			<DropdownFilterOptions label="State">
				<div slot="input" class="flex flex-col card p-4">
					<input
						class="input mb-2"
						type="search"
						placeholder="Search..."
						bind:value={stateSearch}
					/>
					<select class="select w-48" multiple bind:value={$stateStore}>
						{#each filterOptions.distinctStates as state}
							<option value={state}>{state}</option>
						{/each}
					</select>
				</div>
			</DropdownFilterOptions>
		</div>
	{/if}
	<div class="border-l border-surface-700-200-token" />
	<button
		class="btn btn-base h-8 variant-filled-secondary place-self-center"
		on:click={() => (filtersVisible = !filtersVisible)}><FilterIcon /></button
	>
</div>
