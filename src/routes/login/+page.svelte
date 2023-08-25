<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data;
	export let form;

	if (data.session?.user) {
		goto('/');
	}

	/*
		async function signInWithAzure() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'azure',
			options: {
				scopes: 'email offline_access'
			}
		});
		if (error) {
			//TODO redirect to error page throw error(500, '');
		}
	}
  */

	//TODO Add socials for sign in
</script>

<div class="flex w-full justify-center h-1/2">
	<div class="flex flex-col justify-center">
		<form class="card p-4 space-y-4" method="post" use:enhance>
			<label class="label">
				<span>Email</span>
				<input class="input" name="email" value={form?.email ?? ''} />
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" name="password" />
			</label>
			<div class="flex w-full justify-between">
				<button class="btn btn-base variant-filled-surface w-32">Sign In</button>
				<a href="/signup">
					<button class="btn btn-base variant-filled-secondary w-32">Sign up</button>
				</a>
			</div>
		</form>
	</div>
</div>
