<script lang="ts">
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";
	import type { GroupedEvent } from "$lib/types/GroupedEvent";
  import { chartColors } from "../stores/colorStore";

  export let groupedEvents: GroupedEvent[];
  let canvasRef: HTMLCanvasElement;

  const donutChart = onMount(
      () =>
          new Chart(canvasRef, {
          type: "doughnut",
          data: {
            labels: groupedEvents.map((datapoint) => datapoint.eventType),
            datasets: [{
                  data: groupedEvents,
                  backgroundColor: $chartColors,
              }],
          },
          options: {
            parsing: {
              key: 'eventCounts'
            },
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
              legend: {
                display: true,
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