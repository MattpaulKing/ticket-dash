<script lang='ts'>
	export let isExpanded;
	export let canExpand;
	export let isAllSubRowsExpanded;
	export let depth: number;

    const interactionHandler = () => {
        $isExpanded = !$isExpanded
     }
</script>

{#if $canExpand}
	<span on:click={() => $isExpanded = !$isExpanded}  on:keypress={() => $isExpanded = !$isExpanded}  style:--depth={depth}>
		{#if $isExpanded}
			{#if $isAllSubRowsExpanded}
				expanded
			{:else}
			   expand 	
			{/if}
		{:else}
		canExpand	
		{/if}
	</span>
{/if}

<style>
	span {
		padding-left: "1rem";
	}
</style>

