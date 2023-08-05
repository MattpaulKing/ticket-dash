<script lang="ts">
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";
	import type { GroupedEvent } from "$lib/types/GroupedEvent";
  import { chartColors } from "../stores/colorStore";

  export let groupedEvents: GroupedEvent[];
  export let axisKeys
  let canvasRef: HTMLCanvasElement;

  const donutChart = onMount(
      () =>
          new Chart(canvasRef, {
          type: "line",
          data: {
            // labels: range of Dates,
            datasets: [{
              // need to split out each genre into its own dataset
                  data: groupedEvents,
                  backgroundColor: $chartColors,
              }],
          },
          options: {
            parsing: {
              xAxisKey: axisKeys.x,
              yAxisKey: axisKeys.y,
            },
            scales: {
              x: {
                display: false
              },
              y: {
                display: false
              }
            },
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
              legend: {
                display: false,
                position: "left",
                labels: {
                  boxWidth: 10,
                  filter: (item, data) => (item.index ? item.index < 3 : true),
                  sort: (a, b) =>
                    a.index ? (b.index ? a.index - b.index : 1) : 1,
                },
              },
            },
          },
        })
    );

</script>

<canvas id='donutChart' bind:this={canvasRef} />