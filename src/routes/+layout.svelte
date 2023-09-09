<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import {
		Drawer,
		drawerStore,
		Avatar,
		AppShell,
		AppBar,
		ProgressBar
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { navigating, page } from '$app/stores';
	import { Chart } from 'chart.js/auto';
	import Search from '$lib/components/Filters/Search.svelte';
	import SignOut from '$lib/icons/SignOut.svelte';
	import { afterNavigate } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { watchlistStore } from '$lib/components/Watchlist/watchlistStore';
	import { onMount } from 'svelte';

	Chart.defaults.elements.point.radius = 5;
	Chart.defaults.plugins.title.align = 'start';
	Chart.defaults.plugins.title.color = 'white';
	Chart.defaults.plugins.title.display = true;
	Chart.defaults.plugins.legend.align = 'start';
	Chart.defaults.scales.time.ticks.color = 'white';
	Chart.defaults.scales.linear.ticks.color = 'white';

	export let data;

	const drawerOpen = () => {
		drawerStore.open();
	};

	//TODO add initials component
	let initials = 'MK';
	let menu = false;
	let showNavBar = writable(false);
	let ran = false;

	$: {
		if ($navigating && !ran) {
			setTimeout(() => ($showNavBar = true), 200);
		}
		if (!$navigating) {
			$showNavBar = false;
		}
	}
	afterNavigate(() => ($showNavBar = false));

	onMount(() => {
		$watchlistStore = data.watchlistEventIds.map(({ eventId }: { eventId: number }) => eventId);
	});
</script>

<Drawer width="md:w-48" rounded="rounded-2xl">
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 xl:w-40 bg-surface-500/10" slotHeader="bg-surface-600/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				{#key $showNavBar}
					{#if $showNavBar && $navigating}
						<div class="absolute w-full h-4 top-0 -left-1">
							<ProgressBar value={undefined} />
						</div>
					{/if}
				{/key}
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
			<svelte:fragment slot="default" />
			<svelte:fragment slot="trail">
				{#await Promise.all(Object.values(data.filterOptions))}
					<p>x</p>
				{:then ogFilterOptions}
					<Search {ogFilterOptions} />
				{:catch error}
					{JSON.stringify(error)}
				{/await}
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
				</div>
				{#if menu}
					<div class="absolute z-50 w-64 justify-items-center right-3 top-20 card p-4 my-4">
						<section class="flex place-items-center">
							<Avatar
								initials="mk"
								background="bg-primary-500"
								id="avatar"
								width="w-12"
								cursor="cursor-pointer"
								on:click={() => {
									menu = !menu;
								}}
								border="border-4 border-secondary-300-600-token hover:!border-primary-500"
							/>
							<h1 class="ml-2">
								{data.session.user.email.slice(0, data.session.user.email.indexOf('@'))}
							</h1>
						</section>
						<section
							class="flex place-items-center justify-center mt-2 border-b border-surface-300-600-token p-2 pt-0"
						>
							<hr class="mx-2 border" />
						</section>
						<nav class="list-nav mt-2">
							<ul>
								<li>
									<a href="/">Manage your account</a>
								</li>
								<li>
									<a href="/signout" on:click={() => (menu = false)}>
										<span><SignOut /></span>
										<p>Sign Out</p>
									</a>
								</li>
							</ul>
						</nav>
						<!--
						<section class="flex place-items-center mt-2 mr-4 justify-left">
							<SignOut />
							<p class="ml-2">Sign Out</p>
						</section>
            -->
					</div>
				{/if}
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
