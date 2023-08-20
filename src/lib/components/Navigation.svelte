<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-2 w-42">
	<ul>
		<li><a href="/">Home</a></li>
	</ul>
</nav>

