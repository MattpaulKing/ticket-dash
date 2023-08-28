<script lang="ts">
	import { fly } from 'svelte/transition';
	export let text = '';
	let isHovered = false;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		console.log('hit');
	}
	function mouseLeave() {
		isHovered = false;
	}
	function focused(event: FocusEvent) {
		console.log('hit');
		isHovered = true;
	}
</script>

<div class="relative">
	<div
		class=" w-6 h-6 z-50 -left-1/2 absolute"
		on:mouseenter={mouseOver}
		on:mouseleave={mouseLeave}
		on:focus={focused}
	/>
	<slot />
</div>

{#if isHovered}
	<div
		class="flex relative justify-center justify-items-center"
		on:mouseenter={mouseOver}
		on:mouseleave={mouseLeave}
		on:focus={focused}
	>
		<p
			transition:fly={{ y: -100, duration: 200 }}
			class="text-sm absolute z-50 card p-2 w-[9rem] left-[100%] bottom-[100%]"
		>
			{text}
		</p>
	</div>
{/if}
