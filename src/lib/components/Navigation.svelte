<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="list-nav p-2 w-42">
	<ul>
		<li><a class={$page.route.id === '/' ? 'bg-surface-500' : ''} href="/">Home</a></li>
		<li>
			<a class={$page.route.id === '/upcoming' ? 'bg-surface-500' : ''} href="/upcoming">Upcoming</a
			>
		</li>
	</ul>
</nav>
