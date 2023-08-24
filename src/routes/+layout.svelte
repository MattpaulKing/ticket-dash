<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { Drawer, drawerStore, Avatar, AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { Chart } from 'chart.js/auto';
	import Search from '$lib/components/Filters/Search.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	Chart.defaults.elements.point.radius = 5;
	Chart.defaults.plugins.title.align = 'start';
	Chart.defaults.plugins.title.color = 'white';
	Chart.defaults.plugins.title.display = true;
	Chart.defaults.plugins.legend.align = 'start';
	Chart.defaults.scales.time.ticks.color = 'white';
	Chart.defaults.scales.linear.ticks.color = 'white';
	const drawerOpen = () => {
		drawerStore.open();
	};

	//TODO add initials component
	let initials = 'MK';
	let menu = false;
</script>

<Drawer width="md:w-48" rounded="rounded-2xl">
	<Navigation />
</Drawer>
<!-- <AppShell>...</AppShell> -->
<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 xl:w-40 bg-surface-500/10" slotHeader="bg-surface-600/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="xl:hidden md:visible">
					<button class="btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
				</div>
				<strong class="text-xl uppercase pl-4"
					>Ticket Dash{$page.url.pathname.replaceAll('/', ' / ')}</strong
				>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Search eventTypes={data.distinctEventTypes} states={data.distinctStates} />
				<LightSwitch />
				<div id="avatar-button">
					<div class="relative inline-block">
						<Avatar
							initials={initials ?? ''}
							background="bg-primary-500"
							id="avatar"
							width="w-12"
							cursor="cursor-pointer"
							on:click={() => {
								menu = !menu;
							}}
							border="border-4 border-secondary-300-600-token hover:!border-primary-500"
						/>
					</div>
					{#if menu}
						<p>found me</p>
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<div class="container justify-center my-8 mx-auto">
		<slot />
	</div>
</AppShell>
