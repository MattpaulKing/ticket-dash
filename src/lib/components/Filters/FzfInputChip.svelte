<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import fuzzysort from 'fuzzysort';
	import { sliceLong } from '$lib/utilities/utils';
	const dispatch = createEventDispatcher();
	export let searchCol: string;
	export let input = '';
	export let value: string[] = [];
	export let fzfwhitelist: string[] = [];
	export let duration = 150;
	export let chips = 'variant-filled';
	let chipValues =
		value?.map((val) => {
			return { val, id: Math.random() };
		}) || [];

	function resetFormHandler() {
		value = [];
	}

	let selectElement: HTMLSelectElement;
	onMount(() => {
		if (!selectElement.form) return;
		const externalForm = selectElement.form;
		externalForm.addEventListener('reset', resetFormHandler);
		return () => {
			externalForm.removeEventListener('reset', resetFormHandler);
		};
	});

	function addChip(event) {
		event.preventDefault();
		input = fuzzysort.go(input, fzfwhitelist)[0]?.target;
		if (!input) return;
		value.push(input);
		value = value;
		chipValues.push({ val: input, id: Math.random() });
		chipValues = chipValues;
		dispatch('add', { event, chipIndex: value.length - 1, chipValue: input });
		input = '';
	}
	function removeChip(event, chipIndex, chipValue) {
		value.splice(chipIndex, 1);
		value = value;
		chipValues.splice(chipIndex, 1);
		chipValues = chipValues;
		dispatch('remove', { event, chipIndex, chipValue });
	}
	$: chipValues =
		value?.map((val, i) => {
			if (chipValues[i]?.val === val) return chipValues[i];
			return { id: Math.random(), val };
		}) || [];
</script>

<div class="px-2 textarea cursor-pointer" class:opacity-50={$$restProps.disabled}>
	<div class="h-0 overflow-hidden">
		<select bind:this={selectElement} bind:value name={searchCol} multiple tabindex="-1">
			<!-- NOTE: options are required! -->
			{#each value as option}<option value={option}>{option}</option>{/each}
		</select>
	</div>
	<!-- Interface -->
	<div class="input-chip-interface space-y-4 rounded-container-token p-2">
		<!-- Input Field -->
		<form on:submit={addChip}>
			<input
				type="input"
				autocomplete="off"
				bind:value={input}
				placeholder={$$restProps.placeholder ?? 'Enter values...'}
				class="input-chip-field unstyled bg-transparent border-0 !ring-0 p-0 w-full"
				on:input
				on:keypress
				on:focus
				on:blur
			/>
		</form>
		<!-- Chip List -->
		{#if chipValues.length}
			<div
				class="input-chip-list flex flex-wrap gap-2"
				transition:fly|local={{ duration, opacity: 0, y: -20 }}
			>
				{#each chipValues as { id, val }, i (id)}
					<!-- Wrapping div required for FLIP animation -->
					<div animate:flip={{ duration }}>
						<button
							type="button"
							class="chip {chips}"
							on:click={(e) => {
								removeChip(e, i, val);
							}}
							on:click
							on:keypress
							on:keydown
							on:keyup
							transition:scale|local={{ duration, opacity: 0 }}
						>
							<span>{sliceLong(val)}</span>
							<span>✕</span>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
