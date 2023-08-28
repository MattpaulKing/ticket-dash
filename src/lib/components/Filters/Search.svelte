<script lang="ts">
	import { slide } from 'svelte/transition';
	import { toTitleCase } from '$lib/utilities/utils';
	import FzfInputChip from './FzfInputChip.svelte';
	import AllowList from './AllowList.svelte';
	import {
		titleStore,
		eventTypeStore,
		eventsRangeStore,
		stateStore,
		filterStore
	} from '$lib/components/Filters/filterStore';
	import DropdownFilterOptions from './DropdownFilterOptions.svelte';
	import FilterIcon from '$lib/icons/FilterIcon.svelte';
	import { readable } from 'svelte/store';
	import Page from '../../../routes/+page.svelte';
	export let ogFilterOptions: [string[], string[], string[], [Date, Date]];

	let filtersVisible = false;
	let titleInput = '';
	let eventTypeInput = '';
	let stateInput = '';

	const filterOptions = readable({
		distinctTitles: ogFilterOptions[0].map((title: string) => ({
			label: title,
			value: title
		})),
		distinctEventTypes: ogFilterOptions[1].map((eventType: string) => ({
			label: toTitleCase(eventType, '_'),
			value: eventType
		})),
		distinctStates: ogFilterOptions[2].map((state: string) => ({
			label: state,
			value: state
		})),
		dates: {
			min: ogFilterOptions[3][0].toISOString(),
			max: ogFilterOptions[3][1].toISOString()
		}
	});

	function handleSubmit(e) {
		console.log(e);
	}
</script>

<form class="flex h-10 gap-4" method="GET" action="?filters">
	{#if filtersVisible}
		<div class="flex h-10 gap-4" transition:slide={{ axis: 'x' }}>
			<DropdownFilterOptions label="Event Title">
				<!-- Event Title -->
				<div slot="input" class="flex flex-col card w-60 p-4">
					<FzfInputChip
						bind:input={titleInput}
						bind:value={$titleStore}
						searchCol="title"
						searchType="in"
						name="chips"
						fzfwhitelist={ogFilterOptions[0]}
					/>
					<AllowList
						bind:input={titleInput}
						options={$filterOptions.distinctTitles}
						search={titleInput}
						store={titleStore}
					/>
				</div>
			</DropdownFilterOptions>
			<DropdownFilterOptions label="Event Types">
				<!-- Event Types -->
				<div slot="input" class="flex flex-col card p-4">
					<FzfInputChip
						bind:input={eventTypeInput}
						bind:value={$eventTypeStore}
						searchCol="eventType"
						searchType="in"
						name="chips"
						fzfwhitelist={ogFilterOptions[1]}
					/>
					<AllowList
						bind:input={eventTypeInput}
						options={$filterOptions.distinctEventTypes}
						search={eventTypeInput}
						store={eventTypeStore}
					/>
				</div>
			</DropdownFilterOptions>
			<DropdownFilterOptions label="Events Range">
				<!-- Event Dates in Range -->
				<div slot="input" class="flex flex-col card p-4">
					<p class="ml-2">From</p>
					<input
						class="input"
						title="Events From"
						name="dateFrom"
						type="date"
						min={$filterOptions.dates.min}
						max={$filterOptions.dates.max}
						bind:value={$eventsRangeStore[0]}
					/>
					<p class="ml-2 mt-4">To</p>
					<input
						class="input"
						type="date"
						name="dateTo"
						min={$filterOptions.dates.min}
						max={$filterOptions.dates.max}
						bind:value={$eventsRangeStore[1]}
					/>
				</div>
			</DropdownFilterOptions>
			<DropdownFilterOptions label="State">
				<!-- States -->
				<div slot="input" class="flex flex-col card p-4">
					<FzfInputChip
						bind:input={stateInput}
						bind:value={$stateStore}
						searchCol="state"
						searchType="in"
						name="chips"
						fzfwhitelist={ogFilterOptions[2]}
					/>
					<AllowList
						bind:input={stateInput}
						options={$filterOptions.distinctStates}
						search={stateInput}
						store={stateStore}
					/>
				</div>
			</DropdownFilterOptions>
		</div>
	{/if}
	<div class="border-l border-surface-700-200-token" />
	{#if filtersVisible}
		<button
			type="submit"
			class="btn btn-base h-8 variant-filled-secondary"
			on:click|self={() => (filtersVisible = !filtersVisible)}><FilterIcon /></button
		>
	{:else}
		<button
			class="btn btn-base h-8 variant-filled-secondary"
			on:click={() => (filtersVisible = !filtersVisible)}><FilterIcon /></button
		>
	{/if}
</form>
