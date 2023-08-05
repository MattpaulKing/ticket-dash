<script lang="ts">
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";
  import { getRelativePosition } from 'chart.js/helpers';
	import { toTitleCase } from "$lib/utilities/utils";
	import type { GroupedEvent } from "$lib/types/GroupedEvent";

  export let groupedEvents;

  let ctx: HTMLCanvasElement;
  let chart: Chart;

  const donutChart = onMount(
    () => {
      ctx = document.getElementById("priceDiffChart") as HTMLCanvasElement
      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: x_vals,
          datasets: [{
                data: groupedEvents.map((datapoint) => datapoint.std)
            }],
        },
        options: {
          maintainAspectRatio: true,
          aspectRatio: 1,
          scales: {
            x: {
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                display: false
              }
            }
          },
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

<canvas id='priceDiffChart' />