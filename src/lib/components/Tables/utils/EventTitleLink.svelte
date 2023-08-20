<script lang="ts">
	export let eventId: number;
</script>

{#if eventId === undefined}
	<span>No Event Id </span>
{:else}
	<a class="on:hover underline" href="/event-details/{eventId}">Link</a>
{/if}
