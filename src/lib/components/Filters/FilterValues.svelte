<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let input = void 0;
	export let options = [];
	export let limit = void 0;
	export let allowlist = [];
	export let denylist = [];
	export let emptyState = 'No Results Found.';
	export let regionNav = '';
	export let regionList = 'list-nav';
	export let regionItem = '';
	export let regionButton = 'w-full';
	export let regionEmpty = 'text-center';
	export let whitelist = [];
	export let blacklist = [];
	export let duration = 200;
	const deprecated = [whitelist, blacklist, duration];
	$: listedOptions = options;
	function filterByAllowDeny(allowlist2, denylist2) {
		let _options = [...options];
		if (allowlist2.length) {
			_options = _options.filter((option) => allowlist2.includes(option.value));
		}
		if (denylist2.length) {
			_options = _options.filter((option) => !denylist2.includes(option.value));
		}
		if (!allowlist2.length && !denylist2.length) {
			_options = options;
		}
		listedOptions = _options;
	}
	function filterOptions() {
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
	$: classesNav = `${regionNav}`;
	$: classesList = `${regionList}`;
	$: classesItem = `${regionItem}`;
	$: classesButton = `${regionButton}`;
	$: classesEmpty = `${regionEmpty}`;
</script>

<!-- animate:flip={{ duration }} transition:slide|local={{ duration }} -->
<div class="autocomplete {classesBase}" data-testid="autocomplete">
	{#if optionsFiltered.length > 0}
		<nav class="autocomplete-nav {classesNav}">
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
							{@html option.label}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	{:else}
		<div class="autocomplete-empty {classesEmpty}">{emptyState}</div>
	{/if}
</div>
