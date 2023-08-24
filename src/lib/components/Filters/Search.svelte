<script lang="ts">
	import DropdownFilterOptions from './DropdownFilterOptions.svelte';
	import { toTitleCase } from '$lib/utilities/utils';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { derived, writable } from 'svelte/store';
	import { filterStore } from '$lib/components/stores/filterStore';
	export let eventTypes: string[];
	export let states: string[];

	let eventTypeSearch = writable('');
	let eventTypeStore = derived(
		eventTypeSearch,
		(value) => {
			return eventTypes.filter((eventType) => eventType.includes(value));
		},
		eventTypes
	);
</script>

<div class="flex h-10 gap-4">
	<DropdownFilterOptions label="Event Title">
		<div slot="input" class="flex flex-col card p-4">
			<p>Event Title</p>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim w-6"><SearchIcon /></div>
				<input type="search" placeholder="Search..." bind:value={$filterStore.title} />
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
				bind:value={$eventTypeSearch}
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
				bind:value={$eventTypeSearch}
			/>
			<select class="select w-48" multiple value={[]}>
				{#each states as state}
					<option value={state}>{state}</option>
				{/each}
			</select>
		</div>
	</DropdownFilterOptions>
</div>