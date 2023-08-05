
<script lang="ts">
	import { tidy, groupBy, summarize, sum, count, min, max, mean, nDistinct, slice, sliceMax, variance, deviation, mutate, fullSeq, when } from '@tidyjs/tidy'
	import type { Database } from '../../schema.js';
	import GenreDonut from '$lib/components/charts/GenreDonut.svelte';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import type { PriceDiff } from '$lib/types/PriceDiff.js';
	import LineChart from '$lib/components/charts/LineChart.svelte';

	type Event = Database['public']['Tables']['sgEvents']['Row']
	export let data
	let events: Event[] = data.closestEvents
  let priceDiffs: PriceDiff[] = data.priceDiffs
  let priceDiffsLastWeek: PriceDiff[] = data.priceDiffsLastWeek
  let genreMedianPrices = data.genreMedianPrices.filter( (record) => record.genre === 'Rock')

	const groupedEvents = tidy(
	  events,
	  groupBy('eventType', [
	    summarize({ 
			'eventCounts': nDistinct('title'),
			'meanPrice': mean('averagePrice'),
			'maxPrice': max('highestPrice'),
	 	  })
	  ]),
    sliceMax(5, 'eventCounts')
	);

  const getPriceDiffKpi = (priceDiffRecords: PriceDiff[]) => {
    const summaryPriceDiffRecords = tidy(
    priceDiffRecords,
    summarize({
      diffFromYesterday: mean("diffFromYesterday"),
    })
    )[0];
    let proportionPriceDiffFromYesterday = 1 - (summaryPriceDiffRecords.diffFromYesterday?? 0)
    return proportionPriceDiffFromYesterday = parseFloat(proportionPriceDiffFromYesterday.toString().slice(0, 5))
  }
  const proportionPriceDiffFromYesterday = getPriceDiffKpi(priceDiffs)
  const proportionPriceDiffFromLastWeek = getPriceDiffKpi(priceDiffsLastWeek)

</script>
<h1 class="h1">Events Coming Up</h1>
<div class="container grid grid-cols-5 mt-8 h-full w-full mx-auto justify-center items-center">
  <div class='col-span-2 grid grid-rows-2 grid-cols-2 gap-6'>
    <!-- Price diff from yesterday -->
    <KpiCard title="Price vs. Yesterday" kpi={proportionPriceDiffFromYesterday} trailingFormatting="%" />
    <!-- Price diff from last week -->
    <KpiCard title="Price vs. 7 Days Ago" kpi={proportionPriceDiffFromLastWeek} trailingFormatting="%" />
    <!-- Top Event Types by Listings -->
    <div class='card p-4'>
      <h4 class='text-lg'>Top Event Types by Listings</h4>
      <GenreDon ut {groupedEvents} />
    </div>
    <!-- Top Event Types by Med Price -->
    <div class='card p-4'>
      <h4 class='text-lg'>Top Event Types by Price</h4>
      <BarChart {groupedEvents} />
    </div>
  </div>
  <div class='container col-span-3'>
    <div class='bg-surface-200'>
      <LineChart groupedEvents={genreMedianPrices} />
    </div>
  </div>
</div>

<!--
<div class="container h-full mx-auto flex justify-center items-center">
  <div class='inline-block card'>
    <h2 class='text-lg'>
      Top 5 Event Types
    </h2>
    <h3 class='text-base text-surface-200'>By Count of Events</h3>
    
  </div>
  
  <div class='inline-block card'>
    <h2>
      Top 5 Event Types
    </h2>
    <h3 class='text-base text-surface-200'>By Mean Price</h3>
    
  </div>

</div>
-->