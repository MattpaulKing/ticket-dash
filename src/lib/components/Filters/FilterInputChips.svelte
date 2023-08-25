<script lang='ts'>
  let inputChip = ''
  let inputChipList: string[] = [];
</script>

<InputChip bind:input={inputChip} bind:value={inputChiplist} name="chips" />

	<Autocomplete
		bind:input={inputChip}
		options={flavorOptions}
		denylist={inputChipList}
		on:selection={onInputChipSelect}
	/>



