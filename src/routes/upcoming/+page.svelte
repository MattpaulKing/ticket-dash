<script lang="ts">
	import EventCompared from '$lib/components/Cards/EventCompared.svelte';
	export let data;
</script>

{#await data.streamed.announcedLastThreeDays}
	loading...
{:then announcedLastThreeDays}
	<div class="grid grid-cols-3 gap-2">
		{#each announcedLastThreeDays.data as event}
			<EventCompared {event} typeOfComparison={'eventType'} />
		{/each}
	</div>
{/await}

<!-- Do a list like this instead with agg views 
<dl class="list-dl">
	<div>
		<span class="badge bg-primary-500">💀</span>
		<span class="flex-auto">
			<dt>Title</dt>
			<dd>Description</dd>
		</span>
	</div>
    insert content here
</dl>
-->
