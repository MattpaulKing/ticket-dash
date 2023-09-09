import { error } from "@sveltejs/kit"

async function getWatchlistRecords(locals: App.Locals, eventIds: {eventId: number}[]) {
 return await Promise.all(eventIds.map(async ({eventId}) => {
    const { data: singleWatchlistRecords, error: watchlistErr } = await locals.supabase.rpc("watchlist_records", { "event_id": eventId })
    if (watchlistErr) {
      throw error(500, "Error loading watchlist records, please try again")
    }
    return singleWatchlistRecords
  }))
}

export const load = async ({ locals }: { locals: App.Locals }) => {

  const {data: watchlistEventIds, error: watchlistError} = await locals.supabase.from('Watchlist').select("eventId")
  if (watchlistError) {
    throw error(403, "Watchlist wasn't found, please try again")
  }

  const watchlistRecords = await getWatchlistRecords(locals, watchlistEventIds)
   
  return {
    watchlistRecords
  }
}
