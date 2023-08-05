<script lang='ts'>
	import { getMonth, getYear, parseISO } from 'date-fns';
  import { tidy,groupBy, summarize, mean, max, sliceMax, sum } from '@tidyjs/tidy';
	import LineChart from '$lib/components/charts/LineChart.svelte';

  type IEventType = {
    eventDate: Date;
    eventType: string;
    eventCount: number;
    avgPrice: number;
    maxPrice: number;
  }

  export let data
  const eventAggs = data.eventAggs

  const groupedEvents = tidy(
	  eventAggs,
	  groupBy('eventType', [
	    summarize({ 
      'eventCount': sum("eventCount"),
			'meanPrice': mean('avgPrice'),
			'maxPrice': max('maxPrice'),
	 	  })
	  ], {
      addGroupKeys: true
    }),
    sliceMax(4, 'eventCounts')
	).sort( (a,  b) => b.eventCount - a.eventCount) as IEventType[];

</script>

<div>
  {#await data.eventTypes}
    <p>Loading . . .</p>
  {:then}
  <h1 class="h1">Event Types</h1>
  <div class="container grid grid-cols-5 mt-8 h-full w-full mx-auto justify-center items-center">
    <div class='col-span-2 grid grid-rows-2 grid-cols-2 gap-6'>
      <!-- Price diff from yesterday -->
      {#each groupedEvents as event}
      <div class='card p-4'>
        <h4 class='text-lg capitalize'>{event.eventType.replaceAll("_", " ")}</h4>
        <div class='grid grid-cols-3'>
          <LineChart 
            groupedEvents={eventAggs.filter( (monthAgg) => monthAgg.eventType === event.eventType)} 
            axisKeys={ {x: 'eventDate', y: 'eventCount'}}
          />
          <h3 class='text-2xl col-start-3 justify-self-end {event.eventCount > 0 ? 'text-success-500' : 'text-error-500'}'>{new Intl.NumberFormat().format(event.eventCount)}</h3>
        </div>
      </div>
      {/each}
    </div>
    <div class='col-span-3'>
      <LineChart
        groupedEvents={eventAggs}
        axisKeys={{x:'eventDate', y: 'avgPrice'}}
      />
    </div>
  </div>
  {:catch}
    <p>Error . . .</p>
  {/await}
</div>