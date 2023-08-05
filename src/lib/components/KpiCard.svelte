<script lang="ts">
  export let title: string;
  export let kpi: number;
  export let trailingFormatting: string = ''
</script>

<div class='card p-4'>
  <h4 class='text-lg'>{title}</h4>
  <div class='grid grid-cols-3'>
    <h3 class='text-2xl {kpi > 0 ? 'text-success-500' : 'text-error-500'}'>{kpi}{trailingFormatting}</h3>
  </div>
</div>