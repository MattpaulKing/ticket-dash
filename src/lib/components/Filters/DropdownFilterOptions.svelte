<script lang="ts">
	export let label: string;
	let dropdown = false;
</script>

<div class="flex flex-col w-fit">
	<button
		type="button"
		class="btn btn-base variant-filled-surface"
		on:click|self={() => (dropdown = !dropdown)}>{label}</button
	>
	{#if dropdown}
		<div class="relative mt-5">
			<div class="absolute z-50 card">
				<slot name="input" />
			</div>
		</div>
	{/if}
</div>
<slot name="value list" />
