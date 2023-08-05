<script lang="ts">
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";
	import type { GroupedEvent } from "$lib/types/GroupedEvent";

  export let groupedEvents: GroupedEvent[];
  let chartRef: HTMLCanvasElement;

  const donutChart = onMount(
    () => {
      new Chart(chartRef, {
        type: "bar",
        data: {
          datasets: [{
                data: groupedEvents
            }],
        },
        options: {
          parsing: {
            xAxisKey: 'eventType',
            yAxisKey: 'meanPrice' 
          },
          maintainAspectRatio: true,
          aspectRatio: 2,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }
  );

</script>

<canvas id='barChart' bind:this={chartRef} />