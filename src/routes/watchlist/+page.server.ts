import { chartDataTransformer } from "$lib/components/charts/utils/chartDataTransformer"
import type { DbResult, DbResultErr, Functions, DbFunctionWithChart } from "$lib/types/db.types"
import { error } from "@sveltejs/kit"


async function watchlistRecords(locals: App.Locals, eventIds: {eventId: number}[]) {
 return await Promise.all(eventIds.map(async ({eventId}) => {

    const { data: eventRecordsById, error: watchlistErr }: 
      { data: Functions<"watchlist_records">, error: DbResultErr }
    = await locals.supabase
      .rpc("watchlist_records", { "event_id": eventId }) as DbResult<Functions<'watchlist_records'>>

    if (watchlistErr) {
      throw error(500, "Error loading watchlist records, please try again")
    }

    return {
        latest: eventRecordsById[eventRecordsById.length-1],
        records: eventRecordsById,
        datasets: [{
          label: eventRecordsById[0].title?? '',
          data: chartDataTransformer(
            eventRecordsById, { x: 'created_at', y: 'averagePrice' }
          ) 
        }]
    }}));
}

export const load = async ({ locals }: { locals: App.Locals }) => {

  const {data: watchlistEventIds, error: watchlistError} = await locals.supabase.from('Watchlist').select("eventId")
  if (watchlistError) {
    throw error(403, "Watchlist wasn't found, please try again")
  }
   
  return {
    watchlistRecords: watchlistRecords(locals, watchlistEventIds)
  }
}
