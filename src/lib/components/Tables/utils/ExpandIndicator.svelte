<script lang="ts">
	import CaretCircleDown from './CaretCircleDown.svelte';
	import CaretCircleRight from './CaretCircleRight.svelte';

	export let isExpanded;
	export let canExpand;
	export let isAllSubRowsExpanded;
	export let depth: number;
</script>

{#if $canExpand}
	<span
		on:click={() => ($isExpanded = !$isExpanded)}
		on:keypress={() => ($isExpanded = !$isExpanded)}
		style:--depth={depth}
	>
		{#if $isExpanded}
			{#if $isAllSubRowsExpanded}
				<svelte:component this={CaretCircleRight} />
			{:else}
				expand
			{/if}
		{:else}
			<svelte:component this={CaretCircleDown} />
		{/if}
	</span>
{/if}

<style>
	span {
		padding-left: '1rem';
	}
</style>
