<script lang="ts">
	export let label: string;
	let dropdownVisible = false;

  //on:mouseenter={() => (dropdownVisible = true)}
	//on:mouseleave={() => (dropdownVisible = false)}

</script>

<div
	class="flex flex-col w-fit"
	>
	<button
		class="btn btn-base variant-filled-surface"
		on:click={() => (dropdownVisible = !dropdownVisible)}>{label}</button
	>
	{#if dropdownVisible}
		<div class="relative">
			<div class="absolute z-50 card">
				<slot name="input" />
			</div>
		</div>
	{/if}
</div>
