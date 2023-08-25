<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

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
      <button class='btn btn-base variant-filled-surface w-32'>Sign Up</button>
      <button class='btn btn-base variant-filled-error w-32'>Cancel</button>
		</form>
	</div>
</div>

