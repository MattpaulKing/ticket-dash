<script lang="ts">
	import fuzzysort from 'fuzzysort';
	import { sliceLong } from '$lib/utilities/utils';
	type Option = { label: string; value: string };
	export let input: string;
	export let options: Option[];
	export let store;
	export let search = '';
	$: listedOptions = options;

	function filterOptions() {
		let _options = fuzzysort
			.go(input, listedOptions, { key: 'value', limit: 10, threshold: -200 })
			.map((res) => res.obj);
		return _options;
	}

	$: optionsFiltered = input ? filterOptions() : listedOptions;

	$: console.log(optionsFiltered);
</script>

<!-- animate:flip={{ duration }} transition:slide|local={{ duration }} -->
<div class="min-w-[150px] max-w-[200px] h-40 w-full" data-testid="autocomplete" tabindex="-1">
	{#if optionsFiltered.length > 0 && search.length > 0}
		<select multiple bind:value={$store} class="select w-full mt-2 overflow-y-auto">
			{#each optionsFiltered as option (option)}
				<option class="w-fit h-8" value={option.value}>{sliceLong(option.label)}</option>
			{/each}
		</select>
	{:else if optionsFiltered.length < 100}
		<select multiple bind:value={$store} class="select w-full mt-2 overflow-y-auto">
			{#each [...optionsFiltered] as option (option)}
				<option class="w-fit h-8" value={option.value}>{sliceLong(option.label)}</option>
			{/each}
		</select>
	{:else if search.length !== 0 && optionsFiltered.length > 0}
		<div class="text-center">No results found. . .</div>
	{/if}
</div>
