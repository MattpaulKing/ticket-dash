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
        goto('/upcoming')
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

  //TODO Add socials for sign in
</script>

<div class="flex w-full justify-center h-1/2 ">
	<div class="flex flex-col justify-center ">
		<form class='card p-4 space-y-4' method="post" use:enhance>
    <label class='label'>
      <span>Email</span>
			<input class="input" name="email" value={form?.email ?? ''} />
    </label>
    <label class='label'>
      <span>Password</span>
			<input class="input" type="password" name="password" />
    </label>
    <div class='flex w-full justify-between'>
      <button class='btn btn-base variant-filled-surface w-32'>Sign In</button>
      <a href='/signup'>
			  <button class='btn btn-base variant-filled-secondary w-32'>Sign up</button>
      </a>
		</form>
	</div>
</div>

