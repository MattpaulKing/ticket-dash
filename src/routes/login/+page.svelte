<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let { supabase } = data;
	$: ({ supabase } = data);

	if (data.user) {
		goto('/');
	} else {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
				// delete cookies on sign out
				const expires = new Date(0).toUTCString();
				document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
				document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
			} else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years
				document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
				document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
			}
		});
	}

	async function signInWithAzure() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'azure',
			options: {
				scopes: 'email offline_access'
			}
		});

		console.log(data);
		console.log(error);

		if (error) {
			//TODO redirect to error page throw error(500, '');
		}
	}
</script>

<div class="flex">
	<div class="flex flex-col">
		<form method="post" use:enhance>
			<input class="input" name="email" value={form?.email ?? ''} />
			<input class="input" type="password" name="password" />
			<button>Sign up</button>
		</form>
	</div>
</div>

<button on:click={signInWithAzure}>Sign in</button>
