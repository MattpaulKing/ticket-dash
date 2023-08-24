<script lang="ts">
	import EventsCompared from '$lib/components/Cards/EventsCompared.svelte';
	export let data;
</script>

<div class="grid grid-cols-[3fr_7fr]">
	<div class="card p-4 text-token">
		<h1 class="text-xl font-bold">Just Announced</h1>
		<p class="leading-4 text-opacity-50">Last Three Days</p>
		<hr class="my-3" />
		{#await data.streamed.announcedLastThreeDays}
			loading . . .
		{:then announcedLastThreeDays}
			<EventsCompared events={announcedLastThreeDays.data} />
		{:catch error}
			{error}
		{/await}
	</div>
</div>
