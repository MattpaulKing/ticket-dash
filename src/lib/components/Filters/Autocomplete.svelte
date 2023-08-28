<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let input = void 0;
	export let options = [];
	export let limit = void 0;
	export let allowlist = [];
	export let emptyState = 'No Results Found.';
	export let regionNav = '';
	export let regionList = 'list-nav';
	export let regionItem = '';
	export let regionButton = 'w-full';
	export let regionEmpty = 'text-center';
	$: listedOptions = options;

	function filterOptions() {
    
		_options = fuzzysort.go(input, fzfwhitelist)[0].target;

		let _options = [...listedOptions];
		_options = _options.filter((option) => {
			const inputFormatted = String(input).toLowerCase().trim();
			let optionFormatted = JSON.stringify([
				option.label,
				option.value,
				option.keywords
			]).toLowerCase();
			if (optionFormatted.includes(inputFormatted)) return option;
		});
		return _options;
	}
	function onSelection(option) {
		dispatch('selection', option);
	}
	$: filterByAllowDeny(allowlist, denylist);
	$: optionsFiltered = input ? filterOptions() : listedOptions;
	$: sliceLimit = limit !== void 0 ? limit : optionsFiltered.length;
	$: classesBase = `${$$props.class ?? ''}`;
	$: classesList = `${regionList}`;
	$: classesItem = `${regionItem}`;
	$: classesButton = `${regionButton}`;
	$: classesEmpty = `${regionEmpty}`;
</script>

<!-- animate:flip={{ duration }} transition:slide|local={{ duration }} -->
<div class="autocomplete {classesBase}" data-testid="autocomplete">
	{#if optionsFiltered.length > 0}
		<nav class="autocomplete-nav list-nav">
			<ul class="autocomplete-list {classesList}">
				{#each optionsFiltered.slice(0, sliceLimit) as option (option)}
					<li class="autocomplete-item {classesItem}">
						<button
							class="autocomplete-button {classesButton}"
							type="button"
							on:click={() => onSelection(option)}
							on:click
							on:keypress
						>
							{option.label.length < 11 ? option.label : option.label.slice(0, 9).concat('...')}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	{:else}
		<div class="autocomplete-empty {classesEmpty}">{emptyState}</div>
	{/if}
</div>
